<template>
  <Plate brandTitle="Paypal" brandIcon="paypal" brandColor="#0D96D9" flex>
    <aside class="details">
      <Label title="Nazwa użytkownika" :value="username" />
      <Label title="Email" :value="email" style="paypal--color-blue" />
      <Label title="Numer telefonu" :value="phone" noCapitalize last class="paypal--color-blue" />
    </aside>
    <aside class="details">
      <Label title="Typ konta" :value="type" />
      <Label title="Kraj" :value="country" style="paypal--color-blue" />
      <Label title="Miejscowość" :value="zoneinfo" noCapitalize last class="paypal--color-blue" />
    </aside>
    <aside class="details">
      <Label title="Język" :value="language" noCapitalize last/>
    </aside>
  </Plate>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Label from "@/components/utils/VLabel.vue";
import Plate from "@/components/VPlate.vue";

@Component({
  components: {
    Label,
    Plate
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

.details {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.paypal--color-blue {
  color: $paypal;
}
.paypal--color-card {
  color: $primary-green;
}
</style>
