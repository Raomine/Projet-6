const form = document.getElementById("login__form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Création des variables concernant le formulaire
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const user = {
    email: email.value,
    password: password.value,
  };

  try {
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    if (reponse.ok) {
      const data = await reponse.json();
      const token = data.token;

      localStorage.setItem("token", token);
      window.location.href = "index.html";
    } else {
      alert("E-mail ou mot de passe incorrectes");
    }
  } catch (error) {}
});
