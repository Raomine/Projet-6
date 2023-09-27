window.addEventListener("DOMContentLoaded", async () => {
  await getWorks();
  getWorksModal();
  await getCategories();
  signIn();
});
