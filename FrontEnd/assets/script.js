window.addEventListener("DOMContentLoaded", (event) => {
  worksStart();
});
async function worksStart() {
  works();

  worksModal();

  await categories();

  connection();
}
