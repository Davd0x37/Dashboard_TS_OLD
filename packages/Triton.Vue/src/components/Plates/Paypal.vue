<template>
  <VPlate
    brandIcon="paypal"
    brandTitle="Paypal"
    brandClass="paypal-plate"
    brandColor="#0D96D9"
  >
    <aside class="wrap">
      <VLabel
        v-bind:title="$t('Username')"
        v-bind:value="Service.Username"
      />
      <VLabel
        v-bind:title="$t('Email')"
        v-bind:value="Service.Email"
        noCapitalize="true"
        addClass="paypal--color-blue"
      />
      <VLabel
        v-bind:title="$t('Phone')"
        v-bind:value="Service.Phone"
        isLast="true"
        addClass="paypal--color-blue"
      />
    </aside>
    <aside class="wrap">
      <VLabel
        v-bind:title="$t('Country')"
        v-bind:value="Service.Country"
        addClass="paypal--color-blue"
      />
      <VLabel
        v-bind:title="$t('Zoneinfo')"
        v-bind:value="Service.Zoneinfo"
        addClass="paypal--color-card"
      />
      <VLabel
        v-bind:title="$t('Verified')"
        v-bind:value="Service.Verified ? $t('Verified') : $t('Unverified')"
        isLast="true"
        addClass="paypal--color-blue"
      />
    </aside>
  </VPlate>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPlate from "@/components/Utils/VPlate.vue";
import VLabel from "@/components/Utils/VLabel.vue";

@Component({
  components: {
    VPlate,
    VLabel
  }
})
export default class Paypal extends Vue {
  protected get Service() {
    return this.$store.state.data.Paypal;
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";

.paypal-plate {
  display: flex;
  .details {
    flex: 2;
    display: flex;
    /*flex-direction: column;*/
    justify-content: space-between;
  }

  .paypal--color-blue {
    color: $paypal;
  }
  .paypal--color-card {
    color: $primary-green;
  }
}
</style>

<i18n>
  {
  "en": {
  "Username": "Username",
  "Email": "Email",
  "Phone" :"Phone number",
  "Country" :"Country",
  "Zoneinfo" :"Zone info",
  "Verified" :"Verified",
  "Unverified" :"Unverified"
  },
  "pl": {
  "Username": "Użytkownik",
  "Email": "Email",
  "Phone" :"Numer telefonu",
  "Country" :"Kraj",
  "Zoneinfo" :"Województwo",
  "Verified" :"Zweryfikowane",
  "Unverified" :"Niezweryfikowane"
  }
  }
</i18n>
