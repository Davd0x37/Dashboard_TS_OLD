import events from "#/lib/Observer";
import store from "#/store";

const AppName: string = "Dashboard";

export const render = (): string => {
  return /*html*/ `
    <header class="header">
      <div class="logo">
        <a href="#">${AppName}</a>
      </div>
      <div class="user">
        <p class="user__name">${store.getter().User.Login}</p>
        <img src="${
          store.getter().User.Avatar
        }" alt="Avatar" class="user__avatar">
      </div>
    </header>`;
};

export const mounted = () => {
  // FILL
};

export const update = () => events.subscribe(`stateChange`, [() => render()]);
