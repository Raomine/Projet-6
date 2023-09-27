async function signIn() {
  const token = localStorage.getItem("token");
  const connection = token != null && token != undefined && token != "";

  const login = document.querySelector(".login");
  const edit = document.getElementById("edit");
  const editButton = document.querySelector(".modify");
  const editButtonTwo = document.querySelector(".modifytwo");
  const filters = document.querySelector(".filters");

  if (connection) {
    login.textContent = "logout";
    login.addEventListener("click", logout);
    edit.style.display = "flex";
    editButton.style.display = "block";
    editButtonTwo.style.display = "block";
    filters.style.display = "none";
  } else {
    login.textContent = "login";
    edit.style.display = "none";
    editButton.style.display = "none";
    editButtonTwo.style.display = "none";
    filters.style.display = "flex";
  }
}

function logout() {
  localStorage.clear();
  window.location.reload();
}
