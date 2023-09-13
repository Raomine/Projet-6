async function connection() {
  const token = localStorage.getItem("token");
  const connection = token != null && token != undefined && token != "";

  const login = document.querySelector(".login");
  const edit = document.getElementById("edit");
  const modify = document.querySelector(".modify");
  const modifytwo = document.querySelector(".modifytwo");
  const filters = document.querySelector(".filters");

  if (connection) {
    login.textContent = "logout";
    login.addEventListener("click", logout);
    edit.style.display = "flex";
    modify.style.display = "block";
    modifytwo.style.display = "block";
    filters.style.display = "none";
  } else {
    login.textContent = "login";
    edit.style.display = "none";
    modify.style.display = "none";
    modifytwo.style.display = "none";
    filters.style.display = "flex";
  }
}

function logout() {
  localStorage.clear();
  window.location.reload();
}
