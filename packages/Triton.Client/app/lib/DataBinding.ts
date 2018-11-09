import { fromEvent } from "#SH/Observable/Observable";

// @TODO: Return unsubscriber
export const DataBinding = (h: any) => {
  const elem = document.querySelectorAll("[data-v-model]");
  elem.forEach((el: any) => {
    fromEvent(el, "keyup").subscribe({
      next: (e: any) => {
        h({ [el.dataset.vModel]: e.currentTarget.value });
      }
    });
  });
};
