window.addEventListener("DOMContentLoaded", (event) => {
  worksStart();
});
async function worksStart() {
  works();

  worksModal();

  connection();

  await categories();
}
