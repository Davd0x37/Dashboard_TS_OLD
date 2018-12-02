<template>
  <VPlate
    brandIcon="galactic-senate"
    brandTitle="Actions"
    brandClass="actions-plate"
    brandColor="#ff922b"
  >
    <aside class="details">
      <router-link to="/">
        <VButton
          id="HomeLink"
          :value="$t('HomeLink')"
          addClass="color"
        />
      </router-link>
      <router-link to="/auth">
        <VButton
          id="AuthLink"
          :value="$t('AuthLink')"
          addClass="color"
        />
      </router-link>
      <VButton
        id="RefreshData"
        :value="$t('RefreshData')"
        addClass="color"
      />
    </aside>
    <aside class="details">

      <VButton
        id="AuthSpotify"
        :value="$t('AuthSpotify')"
        addClass="color"
      />
      <VButton
        id="AuthPaypal"
        :value="$t('AuthPaypal')"
        addClass="color"
      />
    </aside>
    <aside class="details">
      <VInput
        type="text"
        title="Api Token"
        id="DigitalOceanApiToken"
        :placeholder="$t('DigitalOceanApiToken')"
      />

      <VButton
        id="AddToken"
        :value="$t('AddToken')"
        addClass="color"
      />
    </aside>
  </VPlate>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPlate from "@/components/Utils/VPlate.vue";
import VLabel from "@/components/Utils/VLabel.vue";
import VButton from "@/components/Utils/VButton.vue";
import VInput from "@/components/Utils/VInput.vue";

@Component({
  components: {
    VPlate,
    VLabel,
    VButton,
    VInput
  }
})
export default class Actions extends Vue {}
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";

.actions-plate {
  display: flex;
  justify-content: space-between;
  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .color {
    border-color: #ff922b;
  }
  .color:hover {
    background: #ff922b;
    border-color: #ff922b;
  }
}
</style>

<i18n>
  {
  "en": {
  "RefreshData": "Refresh user data",
  "HomeLink": "Home",
  "AuthLink" :"Authorization",
  "AuthSpotify": "Authenticate Spotify",
  "AuthPaypal": "Authenticate Paypal",
  "DigitalOceanApiToken": "DigitalOcean Api Token",
  "AddToken": "Add DigitalOcean Api Token"
  },
  "pl": {
  "RefreshData": "Odśwież dane",
  "HomeLink": "Strona główna",
  "AuthLink" :"Autoryzacja",
  "AuthSpotify": "Autoryzuj Spotify",
  "AuthPaypal": "Autoryzuj Paypal",
  "DigitalOceanApiToken": "DigitalOcean Api Token",
  "AddToken": "Dodaj DigitalOcean Api Token"
  }
  }
</i18n>
