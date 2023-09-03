async function connection() {
  const token = localStorage.getItem("token");
  const connection = token != null && token != undefined && token != "";

  if (connection) {
    const login = document.querySelector(".login");
    login.textContent = "logout";
    login.addEventListener("click", logout);

    const edit = document.getElementById("edit");
    edit.style.display = "flex";
    const modify = document.querySelector(".modify");
    modify.style.display = "block";
    const modifytwo = document.querySelector(".modifytwo");
    modifytwo.style.display = "block";

    const filters = document.querySelector(".filters");
    filters.style.display = "none";
  } else {
    const login = document.querySelector(".login");
    login.textContent = "login";

    const edit = document.getElementById("edit");
    edit.style.display = "none";
    const modify = document.querySelector(".modify");
    modify.style.display = "none";
    const modifytwo = document.querySelector(".modifytwo");
    modifytwo.style.display = "none";

    const filters = document.querySelector(".filters");
    filters.style.display = "flex";
  }
}

function logout() {
  localStorage.clear();
  window.location.reload();
}
