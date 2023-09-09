const myProfile = document.querySelector(".overview");
// ^ Where your profile information will appear.
const username = "TremMT";
// ^ GitHub username.
const repoList = document.querySelector(".repo-list");
// ^ Unordered repos list
const repoInfoSection = document.querySelector(".repos");
// ^ Selects the section with a class of “repos” where all your repo information appears. 
const indRepoData = document.querySelector(".repo-data");
// ^ Selects the section with a class of “repo-data” where the individual repo data will appear.
const backButton = document.querySelector(".view-repos")
// select the Back to Repo Gallery button.
const filterInput = document.querySelector(".filter-repos")
// the input with the “Search by name” placeholder.

const gHInformation = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  //console.log(data);
  displayUserInfo(data);

};

gHInformation();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos
    }</p>
    </div> `;
  
  myProfile.append(div);

  getRepos();
};

const getRepos = async function () {
  const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const getRepoData = await repos.json();
  //console.log(getRepoData);
  displayRepos(getRepoData);
};

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const eachRepo = document.createElement("li");
    eachRepo.classList.add("repo");
    eachRepo.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(eachRepo);

  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")); {
  const repoName = e.target.innerText;
  specRepoInfo(repoName);
  }
});

const specRepoInfo = async function(repoName) {
 const specInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
 const repoInfo = await specInfo.json();
console.log(repoInfo);

const fetchLanguages = await fetch(repoInfo.languages_url);
const languageData = await fetchLanguages.json();
//console.log(languageData);
const languages = [];
for (const language in languageData) {
languages.push(language);
//console.log(languages);
}
specRepoDisplay(repoInfo, languages);

};


const specRepoDisplay = function (repoInfo, languages) {
  indRepoData.innerHTML = "";
  indRepoData.classList.remove("hide");
  repoInfoSection.classList.add("hide");
  backButton.classList.remove("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `
  indRepoData.append(div);
};


backButton.addEventListener("click", function() {
  repoInfoSection.classList.remove("hide");
  indRepoData.classList.add("hide");
  backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
const search = e.target.value;
// captures what is typed in the search box
//console.log(search);
const repos = document.querySelectorAll(".repo");
const searchReposLower = search.toLowerCase();

for(const repo of repos) {
  const repoLowercase = repo.innerText.toLowerCase();
  //console.log(repoLowercase);
  if (repoLowercase.includes(searchReposLower)) {
    repo.classList.remove("hide");
  } else {
    repo.classList.add("hide");
  }
}
});