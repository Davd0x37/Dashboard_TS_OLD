<template>
  <VPlate
    brandIcon="spotify"
    brandTitle="Spotify"
    brandClass="spotify-plate"
    brandColor="#B5EB00"
  >
    <VLabel
      v-bind:title="$t('Username')"
      v-bind:value="Service.Username"
    />
    <VLabel
      v-bind:title="$t('Email')"
      v-bind:value="Service.Email"
      noCapitalize="true"
    />
    <VLabel
      v-bind:title="$t('Type')"
      v-bind:value="Service.Type"
      isLast="true"
      addClass="color"
    />
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
export default class Spotify extends Vue {
  protected get Service() {
    return this.$store.state.data.Spotify;
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";

.spotify-plate {
  display: flex;
  justify-content: space-between;

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .color {
    color: $spotify;
  }
}
</style>

<i18n>
  {
  "en": {
  "Username": "User name",
  "Email": "Email",
  "Type" :"Account type"
  },
  "pl": {
  "Username": "Użytkownik",
  "Email": "Email",
  "Type" :"Typ konta"
  }
  }
</i18n>
