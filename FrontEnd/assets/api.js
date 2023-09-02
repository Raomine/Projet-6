async function works() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((dataWorks) => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      dataWorks.forEach((work) => {
        const card = document.createElement("figure");
        const cardImg = document.createElement("img");
        const cardTitle = document.createElement("h5");

        cardImg.src = work.imageUrl;
        cardImg.alt = work.title;
        cardImg.setAttribute("category", work.categoryId);
        cardTitle.innerText = work.title;

        card.appendChild(cardImg);
        card.appendChild(cardTitle);
        gallery.appendChild(card);
      });
    });
}

async function categories() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((dataCategories) => {
      const filters = document.querySelector(".filters");

      const allF = document.createElement("p");
      allF.textContent = "Tous";
      allF.classList.add("filtersN");
      allF.classList.add("filterA");
      filters.appendChild(allF);

      dataCategories.forEach((category) => {
        const filtersType = document.createElement("p");
        filtersType.innerText = category.name;
        filtersType.id = category.id;
        filtersType.classList.add("filtersN");
        filters.appendChild(filtersType);
      });

      filters.querySelectorAll("p").forEach((filter) => {
        filter.addEventListener("click", function () {
          const id = this.id;
          document.querySelectorAll(".gallery img").forEach((image) => {
            if (image.getAttribute("category") === id) {
              image.parentElement.style.display = "block";
            } else {
              image.parentElement.style.display = "none";
            }
          });
        });
      });

      allF.addEventListener("click", function () {
        document.querySelectorAll(".gallery img").forEach((image) => {
          image.parentElement.style.display = "block";
        });
      });

      const elements = filters.querySelectorAll("p");
      elements.forEach((element) => {
        element.addEventListener("click", () => {
          elements.forEach((element) => {
            element.classList.remove("filterA");
          });
          element.classList.add("filterA");
        });
      });
    });
}
