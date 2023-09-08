const modal = document.querySelector(".modal");
const activate = document.querySelectorAll(".activate");
const firstModal = document.querySelector(".firstModal");
const sndModal = document.querySelector(".sndModal");

activate.forEach((activate) =>
  activate.addEventListener("click", openCloseModal)
);
function openCloseModal() {
  modal.classList.toggle("active");
  firstModal.style.display = "flex";
  sndModal.style.display = "none";
}

const nextModal = document.querySelector(".firstModal__button");
nextModal.addEventListener("click", openNextModal);
function openNextModal() {
  firstModal.style.display = "none";
  sndModal.style.display = "flex";
}

const backModal = document.querySelector(".sndModal__arrow");
backModal.addEventListener("click", backFirstModal);
function backFirstModal() {
  firstModal.style.display = "flex";
  sndModal.style.display = "none";
}

async function worksModal() {
  const host = "http://localhost:5678/api";
  fetch(`${host}/works`)
    .then((response) => response.json())
    .then((dataWorksModal) => {
      const gallery = document.querySelector(".firstModal__gallery");
      gallery.innerHTML = "";

      dataWorksModal.forEach((workModal) => {
        const galleryCard = document.createElement("figure");
        const galleryImg = document.createElement("img");
        const galleryTxt = document.createElement("figcaption");

        galleryCard.setAttribute("id", workModal.id);
        galleryImg.src = workModal.imageUrl;
        galleryImg.alt = workModal.title;
        galleryImg.setAttribute("category", workModal.categoryId);
        galleryTxt.innerText = "éditer";

        const move = document.createElement("span");
        move.classList.add("move");
        move.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';

        const deleteB = document.createElement("button");
        deleteB.type = "submit";
        deleteB.id = "delete";
        deleteB.classList.add("delete");
        deleteB.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        galleryCard.appendChild(galleryImg);
        galleryCard.appendChild(galleryTxt);
        galleryCard.appendChild(deleteB);
        galleryCard.appendChild(move);

        gallery.appendChild(galleryCard);

        deleteB.addEventListener("click", async (event) => {
          event.preventDefault();
          if (confirm("Voulez-vous supprimer le projet ?")) {
            const id = galleryCard.id;
            const token = localStorage.getItem("token");

            try {
              const response = await fetch(`${host}/works/${id}`, {
                method: "DELETE",
                headers: {
                  accept: "*/*",
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.ok) {
                works();
                worksModal();
              } else {
                alert("Echec de la suppresion du projet...");
              }
            } catch (error) {
              console.log("Une erreur est survenue", error);
            }
          } else {
            alert("Le projet n'a pas été supprimé");
          }
        });
      });
    });
}

const supp = document.querySelector(".firstModal__supp");
supp.addEventListener("click", suppImg);

async function suppImg(event) {
  event.preventDefault();
  if (confirm("Voulez-vous supprimer tous les projets ?")) {
    let allImg = document.querySelectorAll(".firstModal__gallery figure");

    for (let i = 0; i < allImg.length; i++) {
      const idProject = allImg[i].id;
      const token = localStorage.getItem("token");

      let response = await fetch(`${host}/works/${idProject}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        works();
        worksModal();
      } else {
        alert("Echec de la suppresion de la galerie...");
      }
    }
  } else {
    alert("La galerie n'a pas été supprimée...");
  }
}

const sndForm = document.querySelector(".sndModal__form");
const sndInput = document.getElementById("photo");
const sndTitle = document.getElementById("title");
const sndCategories = document.getElementById("categories");
const sndValidate = document.querySelector(".validate");
const sndError = document.querySelector(".sndModal__error");

sndInput.addEventListener("change", selectFile);

function selectFile(event) {
  event.preventDefault();

  const reader = new FileReader();
  reader.readAsDataURL(sndInput.files[0]);

  reader.addEventListener("load", () => {
    image.src = reader.result;
  });

  const sndModalImg = document.querySelector(".sndModal__img");
  const image = document.createElement("img");

  image.setAttribute("class", "previewImage");
  image.style.width = "140px";
  image.style.height = "183px";

  sndModalImg.appendChild(image);

  const label = document.querySelector(".sndModal__photo");
  label.style.opacity = "0";
}

function resetForm() {
  sndForm.reset();

  const sndModalImg = document.querySelector(".sndModal__img");
  const image = document.querySelector(".previewImage");
  if (image) {
    sndModalImg.removeChild(image);
  }

  const label = document.querySelector(".sndModal__photo");
  label.style.opacity = "1";
}

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((dataCategories) => {
    const categories = document.getElementById("categories");

    const emptyOption = document.createElement("option");
    categories.appendChild(emptyOption);

    dataCategories.forEach((category) => {
      const option = document.createElement("option");
      option.innerText = category.name;
      option.value = category.id;
      categories.appendChild(option);
    });
  });

sndInput.addEventListener("input", greenButton);
sndTitle.addEventListener("input", greenButton);
sndCategories.addEventListener("input", greenButton);

function greenButton() {
  if (
    sndTitle.value !== "" &&
    sndCategories.value !== "" &&
    sndInput.value !== ""
  ) {
    sndValidate.classList.toggle("active");
    sndError.style.display = "none";
  } else {
    sndError.innerText = "Veuillez renseigner tous les champs";
  }
}

async function validationSndModal() {
  const sndInput = document.getElementById("photo").files[0];
  const sndTitle = document.getElementById("title").value;
  const sndCategories = document.getElementById("categories").value;

  const gallery = document.querySelector(".gallery");
  const firstModalGallery = document.querySelector(".firtModal__gallery");
  const modal = document.querySelector(".modal");

  let formData = new FormData();
  formData.append("image", sndInput);
  formData.append("title", sndTitle);
  formData.append("category", sndCategories);

  const token = localStorage.getItem("token");

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Erreur lors du transfert");
    })
    .then((data) => {
      gallery.innerHTML = "";
      firstModalGallery.innerHTML = "";
      works();
      worksModal();
      sndValidate.classList.remove("active");
      modal.classList.remove("active");
    })
    .catch((error) => {
      console.log(error);
    });
}

sndForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validationSndModal();
  resetForm();
});
