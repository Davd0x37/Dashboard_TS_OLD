<template>
  <Plate brandTitle="Paypal" brandIcon="paypal" brandColor="#0D96D9" flex>
    <aside class="details">
      <Label title="Nazwa użytkownika" :value="username" />
      <Label title="Email" :value="email" class="paypal--color-blue" noCapitalize />
      <Label title="Numer telefonu" :value="phone" noCapitalize last class="paypal--color-blue" />
    </aside>
    <aside class="details">
      <Label title="Kraj" :value="country" class="paypal--color-blue" />
      <Label title="Zweryfikowany" :value="verified" class="paypal--color-blue" />
      <Label title="Miejscowość" :value="zoneinfo" noCapitalize last class="paypal--color-blue" />
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
  private username: string = this.$store.getters.paypal.username;
  private email: string = this.$store.getters.paypal.email;
  private phone: number = this.$store.getters.paypal.phone;
  private country: string = this.$store.getters.paypal.country;
  private verified: string = this.$store.getters.paypal.verified;
  private zoneinfo: string = this.$store.getters.paypal.zoneinfo;
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
