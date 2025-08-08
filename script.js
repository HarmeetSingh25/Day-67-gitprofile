let username_input = document.getElementById("username-input");
let submit = document.getElementById("submit");
let profile_img = document.getElementById("profile_img");
let profile_name = document.getElementById("profile-name");
let followers_h4 = document.getElementById("followers");
let following = document.getElementById("following");
let location_span = document.getElementById("location");
// let View_repo = document.getElementById("View-repo");
// let star = document.getElementById("star");
// let repoName = document.getElementById("repoName");
// let repodescription = document.getElementById("repodescription");
let repo_list = document.getElementById("repo-list");
function fetchUserProfile(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("user not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      profile_img.src = data.avatar_url;
      profile_img.setAttribute("src", data.avatar_url);
      profile_name.innerHTML = data.name;
      followers_h4.innerHTML = `${data.followers}`;
      following.innerHTML = data.following;
      location_span.innerHTML = data.location;
    })
    .catch((error) => {
      document.getElementById("error-msg").classList.remove("hidden");
      document.getElementById("profile-card").classList.add("hidden");
      console.log("Error fetching GitHub data:", error);
    });
}
function fetchUserRepo(userrepo) {
  fetch(`https://api.github.com/users/${userrepo}/repos?sort=updated`)
    .then((RawRepo) => RawRepo.json())
    .then((repoData) => {
      console.log(repoData);
      let repoCreater;
      let cout = 0;
      for (const data of repoData) {
        if (cout == 5) {
          break;
        }
        repoCreater = `<div class="bg-white shadow-md rounded-lg p-5 border">
              <h3 id="repoName" class="text-xl font-semibold text-blue-600">
               ${data.name}
              </h3>
              <p id="repodescription" class="text-gray-600 mt-2">
               ${data.description}
              </p>
              <div
                class="mt-3 flex items-center justify-between text-sm text-gray-500"
              >
                <span>⭐${data.stargazers_count}</span>
                <!-- <a id="View-repo" href="" target="_blank" class="text-blue-500 hover:underline">View Repo</a> -->
              </div>
            </div>`;

        repo_list.innerHTML += repoCreater;
        cout++;
      }
    });
}
submit.addEventListener("click", () => {
  document.getElementById("error-msg").classList.add("hidden");
  document.getElementById("profile-card").classList.remove("hidden");
  let username = username_input.value;
  fetchUserProfile(username);
  fetchUserRepo(username);
  repo_list.innerHTML=` `
});
