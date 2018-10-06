export const DataBinding = (h: any) => {
  const elem = document.querySelectorAll("[data-v-model]");
  elem.forEach((el: any) => {
    el.addEventListener("keypress", (e: any) => {
      h({ [el.dataset.vModel]: e.currentTarget.value });
    });
  });
};