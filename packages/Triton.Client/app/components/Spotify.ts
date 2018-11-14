import lang from "#/i18n";
import events from "#/lib/Observer";
import store from "#/store";

export const render = (): string => {
  return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
      <h3 class="plate__title">Spotify</h3>
    </header>
    <div class="plate__container spotify-plate">
      <aside class="details">
        <p class="label__title">${lang.Spotify.username}</p>
        <p class="label__value">${store.getter().Spotify!.Username}</p>
        <p class="label__title">${lang.Spotify.email}</p>
        <p class="label__value label__no-capitalize">${
          store.getter().Spotify!.Email
        }</p>
        <p class="label__title">${lang.Spotify.type}</p>
        <p class="label__value label__last spotify__title--color">
          ${store.getter().Spotify!.Type}
        </p>
      </aside>
    </div>
  </article>`;
};

export const mounted = () => {
  // FILL
};

export const update = () => events.subscribe(`stateChange`, [() => render()]);
