import { getUser, appendData } from "../scripts/getUser.js";

let input = document.querySelector("#search-input");
let main = document.querySelector("#container");
var response;
input.addEventListener("keypress", searchUser);

let user_nav = document.querySelector("#user_navbar");
let DOM_span = document.querySelector(".total_repo");
let home_container = document.querySelector(".main_home");
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

      user_nav.style.display = "block";
      home_container.classList.add("home_white");
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
