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

const gHInformation = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  //console.log(data);
  displayUserInfo(data);

};

gHInformation();
// ^ Call

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
  // ^ Inside the 5 placeholders, use the JSON data to grab the relevant properties to display on the page. = add DATA
  myProfile.append(div);
  // ^ Append the div to the overview element.
  getRepos();
  // ^ At the bottom of your second function which displays your GitHub user data, call the async function that fetches your repos.
};

const getRepos = async function () {
  const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const getRepoData = await repos.json();
  //console.log(getRepoData);
  displayRepos(getRepoData);
  // ^ At the bottom of the async function fetching your repos, call the function you just created to display info about each repository. As an argument, pass the JSON response data for the repos.
};

const displayRepos = function (repos) {
  //  Inside the function, loop and create a list item for each repo and give each item - Since you are looping through multiple objects, use the for(...of) loop - Create a loop FOR EACH REPO OF the REPOS array
  for (const repo of repos) {
    const eachRepo = document.createElement("li");
    eachRepo.classList.add("repo");
    eachRepo.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(eachRepo);
// ^ Append the list item to the global variable that selects the unordered repos list.
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
// Append the new div element to the section with a class of “repo-data”. Unhide (show) the “repo-data” element. Hide the element with the class of “repos”.