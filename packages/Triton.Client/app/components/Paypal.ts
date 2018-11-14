import lang from "#/i18n";
import events from "#/lib/Observer";
import store from "#/store";

export const render = (): string => {
  return /*html*/ `<article class="plate">
  <header class="plate__brand">
    <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
    <h3 class="plate__title">Paypal</h3>
  </header>
  <div class="plate__container paypal-plate">
    <aside class="details">
      <p class="label__title">${lang.Paypal.username}</p>
      <p class="label__value">${store.getter().Paypal!.Username}</p>
      <p class="label__title">${lang.Paypal.email}</p>
      <p class="label__value label__no-capitalize paypal--color-blue">${
        store.getter().Paypal!.Email
      }</p>
      <p class="label__title">${lang.Paypal.phoneNumber}</p>
      <p class="label__value paypal--color-blue label__last">${
        store.getter().Paypal!.Phone
      }</p>
    </aside>
    <aside class="details">
      <p class="label__title">${lang.Paypal.country}</p>
      <p class="label__value paypal--color-blue">${
        store.getter().Paypal!.Country
      }</p>
      <p class="label__title">${lang.Paypal.type}</p>
      <p class="label__value paypal--color-card">${
        store.getter().Paypal!.Verified
          ? lang.Paypal.verified
          : lang.Paypal.unverified
      }</p>
      <p class="label__title">${lang.Paypal.location}</p>
      <p class="label__value paypal--color-blue label__last">${
        store.getter().Paypal!.Zoneinfo
      }
      </p>
    </aside>
  </div>
</article>`;
};

export const mounted = () => {
  // FILL
};
export const update = () => events.subscribe(`stateChange`, [() => render()]);
