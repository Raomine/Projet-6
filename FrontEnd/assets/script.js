window.addEventListener("DOMContentLoaded", (event) => {
  worksStart();
});
async function worksStart() {
  works();

  await categories();

  connection();
}
