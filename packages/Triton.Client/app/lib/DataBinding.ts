import { fromEvent } from "./Observable/Observable";

// @TODO: Return unsubscriber
export const DataBinding = (h: any) =>
  document.querySelectorAll("[data-v-model]").forEach((el: any) =>
    fromEvent(el, "keyup").subscribe({
      next: (e: any) => h({ [el.dataset.vModel]: e.currentTarget.value })
    })
  );
