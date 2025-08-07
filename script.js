let username_input = document.getElementById("username-input");
let submit = document.getElementById("submit");
let profile_img = document.getElementById("profile_img");
let profile_name = document.getElementById("profile-name");
let followers_h4 = document.getElementById("followers");
let following = document.getElementById("following");
let location_span = document.getElementById("location");
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

      //   profile_img.src = data.avatar_url;
      profile_img.setAttribute("src", data.avatar_url);
      console.log((profile_img.src = data.avatar_url));

      profile_name.innerHTML = data.name;
      followers_h4.innerHTML = `${data.followers}`;
      following.innerHTML = data.following;
      location_span.innerHTML = data.location;
      console.log(data.followers);
      console.log(data.name);
    })
    .catch((error) => {
      document.getElementById("error-msg").classList.remove("hidden");
      document.getElementById("profile-card").classList.add("hidden");
      console.log("Error fetching GitHub data:", error);
    });
}
function fetchUserRepo(userrepo) {
  fetch(`https://api.github.com/users/${userrepo}/repos`)
    .then((RawRepo) => RawRepo.json())
    .then((repoData) => {
      console.log(repoData);
    });
}
submit.addEventListener("click", () => {
  document.getElementById("error-msg").classList.add("hidden");
  document.getElementById("profile-card").classList.remove("hidden");
  let username = username_input.value;
  fetchUserProfile(username);
  fetchUserRepo(username);
});
