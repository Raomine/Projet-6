const host = "http://localhost:5678/api";
const loginForm = document.getElementById("login__form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { value: email } = document.querySelector("#email");
  const { value: password } = document.querySelector("#password");

  const user = {
    email,
    password,
  };

  try {
    const response = await fetch(`${host}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      window.location.href = "index.html";
    } else {
      alert("E-mail ou mot de passe incorrect");
    }
  } catch (error) {}
});
