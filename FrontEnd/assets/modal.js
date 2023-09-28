const modal = document.querySelector(".modal");
const activate = document.querySelectorAll(".activate");
const firstModal = document.querySelector(".firstModal");
const secondModal = document.querySelector(".sndModal");

activate.forEach((activate) =>
  activate.addEventListener("click", openAndCloseModal)
);
function openAndCloseModal() {
  modal.classList.toggle("active");
  firstModal.style.display = "flex";
  secondModal.style.display = "none";
}

function resetForm() {
  secondModalForm.reset();

  const secondModalImg = document.querySelector(".sndModal__img");
  const image = document.querySelector(".previewImage");
  if (image) {
    secondModalImg.removeChild(image);
  }

  const label = document.querySelector(".sndModal__photo");
  label.style.opacity = "1";
  secondModalError.innerHTML = "";
}

const addImgButton = document.querySelector(".firstModal__button");
addImgButton.addEventListener("click", openNextModal);
function openNextModal() {
  firstModal.style.display = "none";
  secondModal.style.display = "flex";
  resetForm();
}

const secondModalArrow = document.querySelector(".sndModal__arrow");
secondModalArrow.addEventListener("click", backFirstModal);
function backFirstModal() {
  firstModal.style.display = "flex";
  secondModal.style.display = "none";
}

async function getWorksModal() {
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

        const iconMoveWork = document.createElement("span");
        iconMoveWork.classList.add("move");
        iconMoveWork.innerHTML =
          '<i class="fa-solid fa-up-down-left-right"></i>';

        const deleteWorkButton = document.createElement("button");
        deleteWorkButton.type = "submit";
        deleteWorkButton.id = "delete";
        deleteWorkButton.classList.add("delete");
        deleteWorkButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        galleryCard.appendChild(galleryImg);
        galleryCard.appendChild(galleryTxt);
        galleryCard.appendChild(deleteWorkButton);
        galleryCard.appendChild(iconMoveWork);

        gallery.appendChild(galleryCard);

        deleteWorkButton.addEventListener("click", async (event) => {
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
                getWorks();
                getWorksModal();
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

const deleteAll = document.querySelector(".firstModal__supp");
deleteAll.addEventListener("click", deleteAllWorks);

async function deleteAllWorks(event) {
  event.preventDefault();
  if (confirm("Voulez-vous supprimer tous les projets ?")) {
    let allImg = document.querySelectorAll(".firstModal__gallery figure");

    for (let i = 0; i < allImg.length; i++) {
      const idWork = allImg[i].id;
      const token = localStorage.getItem("token");

      let response = await fetch(`${host}/works/${idWork}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        getWorks();
        getWorksModal();
      } else {
        alert("Echec de la suppresion de la galerie...");
      }
    }
  } else {
    alert("La galerie n'a pas été supprimée...");
  }
}

const secondModalForm = document.querySelector(".sndModal__form");
const secondModalFile = document.getElementById("photo");
const secondModalTitle = document.getElementById("title");
const secondModalCategories = document.getElementById("categories");
const secondModalValidationButton = document.querySelector(".validate");
const secondModalError = document.querySelector(".sndModal__error");

secondModalFile.addEventListener("change", selectFile);

function selectFile(event) {
  event.preventDefault();

  const reader = new FileReader();
  reader.readAsDataURL(secondModalFile.files[0]);

  reader.addEventListener("load", () => {
    image.src = reader.result;
  });

  const secondModalImg = document.querySelector(".sndModal__img");
  const image = document.createElement("img");

  image.setAttribute("class", "previewImage");
  image.style.width = "140px";
  image.style.height = "183px";

  secondModalImg.appendChild(image);

  const label = document.querySelector(".sndModal__photo");
  label.style.opacity = "0";
}

fetch(`${host}/categories`)
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

secondModalFile.addEventListener("input", addNewWork);
secondModalTitle.addEventListener("input", addNewWork);
secondModalCategories.addEventListener("input", addNewWork);

function addNewWork() {
  if (
    secondModalTitle.value !== "" &&
    secondModalCategories.value !== "" &&
    secondModalFile.value !== ""
  ) {
    secondModalValidationButton.classList.toggle("active");
    secondModalError.style.display = "none";
  } else {
    secondModalError.innerText = "Veuillez renseigner tous les champs";
  }
}

async function validationNewWork() {
  const gallery = document.querySelector(".firstModal__gallery");
  const formData = new FormData();
  formData.append("image", document.getElementById("photo").files[0]);
  formData.append("title", document.getElementById("title").value);
  formData.append("category", document.getElementById("categories").value);

  const token = localStorage.getItem("token");
  const response = await fetch(`${host}/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (response.ok) {
    gallery.innerHTML = "";
    getWorks();
    getWorksModal();
    secondModalValidationButton.classList.remove("active");
    modal.classList.remove("active");
  } else {
    alert("Erreur lors du transfert");
  }
}

secondModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    secondModalTitle.value == "" ||
    secondModalCategories.value == "" ||
    secondModalFile.value == ""
  ) {
    secondModalError.innerText = "Veuillez renseigner tous les champs";
    return;
  }
  validationNewWork();
  resetForm();
});
