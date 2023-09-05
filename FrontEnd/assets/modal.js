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
