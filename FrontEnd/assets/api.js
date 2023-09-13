const host = "http://localhost:5678/api";

async function works() {
  const response = await fetch(`${host}/works`);
  const dataWorks = await response.json();

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
}

async function categories() {
  const response = await fetch(`${host}/categories`);
  const dataCategories = await response.json();

  const filters = document.querySelector(".filters");
  filters.innerHTML = "";

  const createFilter = (text, id = "", isAllFilter = false) => {
    const filter = document.createElement("p");
    filter.textContent = text;
    id !== "" && (filter.id = id);
    filter.classList.add("filtersN");
    isAllFilter && filter.classList.add("filterA");
    return filter;
  };

  const allFilter = createFilter("Tous", "", true);
  filters.appendChild(allFilter);

  dataCategories.forEach((category) => {
    const categoryFilter = createFilter(category.name, category.id);
    filters.appendChild(categoryFilter);
  });

  const galleryImages = document.querySelectorAll(".gallery img");

  filters.querySelectorAll("p").forEach((filter) => {
    filter.addEventListener("click", function () {
      const id = this.id;
      galleryImages.forEach((image) => {
        image.parentElement.style.display =
          image.getAttribute("category") === id ? "block" : "none";
      });
    });
  });

  allFilter.addEventListener("click", function () {
    galleryImages.forEach((image) => {
      image.parentElement.style.display = "block";
    });
  });

  const filterElements = filters.querySelectorAll("p");
  filterElements.forEach((element) => {
    element.addEventListener("click", () => {
      filterElements.forEach((element) => {
        element.classList.remove("filterA");
      });
      element.classList.add("filterA");
    });
  });
}
