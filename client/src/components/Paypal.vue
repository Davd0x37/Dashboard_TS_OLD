<template>
  <article class="plate">
    <header class="plate__brand">
      <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
      <h3 class="plate__title">Paypal</h3>
    </header>
    <div class="plate__container paypal-plate">
      <aside class="container__details">
        <Label title="Nazwa użytkownika" :value="username" />
        <Label title="Email" :value="email" style="paypal--color-blue" />
        <Label title="Numer telefonu" :value="phone" noCapitalize last class="paypal--color-blue" />
      </aside>
      <aside class="container__details">
        <Label title="Typ konta" :value="type" />
        <Label title="Kraj" :value="country" style="paypal--color-blue" />
        <Label title="Miejscowość" :value="zoneinfo" noCapitalize last class="paypal--color-blue" />
      </aside>
      <aside class="container__details">
        <Label title="Język" :value="language" noCapitalize last/>
      </aside>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Label from "@/components/utils/VLabel.vue";

@Component({
  components: {
    Label
  }
})
export default class Paypal extends Vue {
  private username: string = "username";
  private email: string = "email";
  private phone: number = 1212;
  private type: string = "type";
  private country: string = "country";
  private zoneinfo: string = "zoneinfo";
  private language: string = "language";
}
</script>

<style scoped lang="scss">
@import "../styles/mixin";
@import "../styles/colors";
// ------------ PAYPAL ------------
.paypal-plate {
  display: flex;

  .container__details {
    flex: 1;
  }

  .container__other {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .container__aside {
      display: flex;
      justify-content: space-between;
      .profile__avatar {
        width: 33px;
        height: 33px;
        padding-right: 10px;
      }
    }

    .container__buttons {
      display: flex;
      justify-content: space-between;

      @include item__btn($paypal-green, $paypal-button-pressed-green, "--green");
      @include item__btn($paypal-red, $paypal-button-pressed-red, "--red");
    }
  }

  .paypal--color-blue {
    color: $paypal;
  }
  .paypal--color-card {
    color: $primary-green;
  }
}
</style>
