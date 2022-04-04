import navbar from "../componets/navbar.js";
import { getUser, appendData } from "../scripts/getUser.js";

let nav = document.querySelector("#nav-container");
nav.innerHTML = navbar();

let input = document.querySelector("#search-input");
let main = document.querySelector("#container");
var response;
input.addEventListener("keypress", searchUser);

let user_nav = document.querySelector("#user_navbar");
let DOM_span = document.querySelector(".total_repo");
var home = document.querySelector(".home__con");
async function searchUser(event) {
  if (event.key == "Enter") {
    main.innerHTML = "";
    let query = input.value;
    response = await getUser(query);
    let repo_data = await getUser(`${response.login}/repos`);

    console.log(response.message);
    if (response.message != "Not Found") {
      let { avatar_url } = response;
      appendData(response, main, "Overview");
      document.querySelector("#profile-img").src = avatar_url;
      user_nav.style.display = "block";
      if (repo_data.length === 0) {
        DOM_span.style.display = "none";
      } else {
        DOM_span.style.display = "inline-flex";
        DOM_span.innerText = repo_data.length;
      }
    } else {
      main.innerHTML =
        '<img src="https://i.stack.imgur.com/Esppm.png" class="not_found">';
      user_nav.style.display = "none";
    }

    home.classList.remove("home__con");
  }
}

var items = document.querySelectorAll(".list-item");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    var cur = document.querySelector(".active");
    cur.classList.remove("active");
    this.classList.add("active");
    var text = this.innerText;
    console.log(text);
    appendData(response, main, text);
  });
}

var profit_user = document.querySelector("#profile_user");
profit_user.addEventListener("click", function () {
  document.querySelector(".show_user_details").classList.toggle("show_user");
});

var user_data = JSON.parse(localStorage.getItem("user_data"));
console.log(user_data);

var user = document.querySelector("#username");
user.innerHTML = `<b>${user_data.username}</b>`;

var sign_out = document.querySelector("#sign_out");
sign_out.style.cursor = "pointer";
sign_out.addEventListener("click", function () {
  window.location.href = "index.html";
});
