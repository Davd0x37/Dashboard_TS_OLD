import { updateUserData } from "#/controller/Actions";
import { updateDigitalOceanToken } from "#/controller/UserManager";
import lang from "#/i18n";
import store from "#/store";
import { error, success } from "#/utils/Alert";
import { $ } from "#/utils/DOM";
import { PaypalAuthenticate, SpotifyAuthenticate } from "#SH/Config";

export const render = (): string => {
  return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-galactic-senate fa-2x" style="color: #ff922b;"></i>
      <h3 class="plate__title">${lang.Actions.plateName}</h3>
    </header>
    <div class="plate__container actions-plate">
      <aside class="details">
        <button class="btn color" v-router="/">${lang.Actions.homeLink}</button>
        <button class="btn color" v-router="/auth">${
          lang.Actions.authLink
        }</button>
        <button class="btn color" id="refresh" v-click="actions.refreshData">${
          lang.Actions.refreshData
        }</button>
      </aside>
      <aside class="details">
        <button class="btn color" id="spotify__authorize" v-click="actions.authSpotify">${
          lang.Actions.authSpotify
        }</button>
        <button class="btn color" id="paypal__authorize" v-click="actions.authPaypal">${
          lang.Actions.authPaypal
        }</button>
      </aside>
      <aside class="details">
        <div>  
          <p class="label__title">${lang.Actions.digitalOceanToken}</p>
          <input type="text" id="digitalocean_api_token" class="input" placeholder="${
            lang.Actions.digitalOceanToken
          }">
        </div>
        <button class="btn color" id="digitalocean_add_token" v-click="actions.digitalOceanToken(#digitalocean_api_token)">${
          lang.Actions.addToken
        }</button>
      </aside>
    </div>
  </article>`;
};

export const actions = {
  refreshData: () => updateUserData(store.getter().id),

  authSpotify: () =>
    window.open(`${SpotifyAuthenticate}?id=${store.getter().id}`),

  authPaypal: () =>
    window.open(`${PaypalAuthenticate}?id=${store.getter().id}`),

  async digitalOceanToken(elem: string): Promise<boolean> {
    const token = $(elem) as HTMLInputElement;
    const id = store.getter().id;
    const res = await updateDigitalOceanToken({
      id,
      token: token!.value
    });
    return res
      ? success(lang.Messages.addTokenSuccess, () => null)
      : error(lang.Messages.addTokenError);
  }
};

// export const update = () => events.subscribe(`stateChange`, [() => render()]);
