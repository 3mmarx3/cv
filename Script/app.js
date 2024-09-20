let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbarr");

menu.onclick = () => {
  menu.classList.toggle("bi-x");
  navbar.classList.toggle("open");
};

//

let Quit = document.getElementById("Quit");

Quit.addEventListener("click", function () {
  window.close();
});
