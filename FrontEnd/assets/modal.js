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
            const id = cardModal.id;
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

const sndForm = document.querySelector("sndModal__form");
const sndInput = document.getElementById("photo");
const sndTitle = document.getElementById("title");
const sndCategories = document.getElementById("categories");
const sndValidate = document.querySelector("validate");
let error = document.querySelector("sndModal__error");

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

// Reset formulaire
function resetForm() {
  document.getElementById("sndModal__form").reset();

  const sndModalImg = document.querySelector(".sndModal__img");
  const image = document.querySelector("previewImage");
  if (image) {
    sndModalImg.removeChild(image);
  }

  const label = document.querySelector(".sndModal__photo");
  label.style.opacity = "1";
}
