const myProfile = document.querySelector(".overview");
// ^ Where your profile information will appear.
const username = "TremMT";
// ^ GitHub username.
const gHInformation = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  console.log(data);
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
};