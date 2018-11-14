import lang from "#/i18n";
import events from "#/lib/Observer";

export const render = (): string => {
  return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-galactic-senate fa-2x" style="color: #ff922b;"></i>
      <h3 class="plate__title">${lang.Actions.plateName}</h3>
    </header>
    <div class="plate__container actions-plate">
      <aside class="details">
        <button class="btn color" data-router-go="/">${
          lang.Actions.homeLink
        }</button>
        <button class="btn color" data-router-go="/auth">${
          lang.Actions.authLink
        }</button>
        <button class="btn color" id="refresh">${
          lang.Actions.refreshData
        }</button>
      </aside>
      <aside class="details">
        <button class="btn color" id="spotify__authorize" @click="${doS}">${
          lang.Actions.authSpotify
        }</button>
        <button class="btn color" id="paypal__authorize">${
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
        <button class="btn color" id="digitalocean_add_token">${
          lang.Actions.addToken
        }</button>
      </aside>
    </div>
  </article>`;
};

const doS = () => alert("LELEL")

// export const mounted = () => {
//   const spotify = fromEvent(
//     $(".actions-plate #spotify__authorize")!,
//     "click"
//   ).subscribe({
//     next: () => window.open(`${SpotifyAuthenticate}?id=${store.getter().id}`)
//   });

//   const paypal = fromEvent(
//     $(".actions-plate #paypal__authorize")!,
//     "click"
//   ).subscribe({
//     next: () => window.open(`${PaypalAuthenticate}?id=${store.getter().id}`)
//   });

//   const refresh = fromEvent($(".actions-plate #refresh")!, "click").subscribe({
//     next: async () => updateUserData(store.getter().id)
//   });

//   const token = fromEvent(
//     $(".actions-plate #digitalocean_add_token")!,
//     "click"
//   ).subscribe({
//     next: async () => {}})
//   //     if (store.getter().id.length !== 0) {
//   //       const token = ($(
//   //         ".actions-plate #digitalocean_api_token"
//   //       ) as HTMLInputElement)!.value;
//   //       const res = await UpdateDigitalOceanToken({
//   //         id: store.getter().id,
//   //         token
//   //       });
//   //       if (res) {
//   //         success(lang.Messages.addTokenSuccess, () => null);
//   //       } else {
//   //         error(lang.Messages.addTokenError);
//   //       }
//   //     }
//   //   }
//   // });
// };

export const update = () => events.subscribe(`stateChange`, [() => render()]);
