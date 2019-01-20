<template>
  <VPlate
    brandIcon="digital-ocean"
    brandTitle="DigitalOcean"
    brandClass="digital-ocean-plate"
    brandColor="#0080FF"
  >
    <aside class="wrap">
      <VLabel
        v-bind:title="$t('Email')"
        v-bind:value="Service.Email"
      />
      <VLabel
        v-bind:title="$t('LastCreatedDroplet')"
        v-bind:value="Service.LastCreatedDroplet + ' ' + $t('LastCreatedDroplet')"
        isLast="true"
        addClass="color"
      />
    </aside>
    <aside class="wrap">
      <VLabel
        v-bind:title="$t('DropletLimit')"
        v-bind:value="Service.DropletLimit"
        addClass="color"
      />
      <VLabel
        v-bind:title="$t('Droplets')"
        v-bind:value="Service.Droplets"
        isLast="true"
        addClass="color"
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
export default class DigitalOcean extends Vue {
  protected get Service() {
    return this.$store.state.data.DigitalOcean;
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";

.digital-ocean-plate {
  .details {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @include queries("mobileMax") {
      .wrap:nth-child(2) {
        margin-left: 20px;
      }
    }
  }

  .color {
    color: $digital_ocean;
  }
}
</style>

<i18n>
  {
  "en": {
  "Email": "Email",
  "LastCreatedDroplet": "Last created droplet",
  "DropletLimit" :"Droplet limit",
  "Droplets" :"Droplets"
  },
  "pl": {
  "Email": "Email",
  "LastCreatedDroplet": "Ostatnio utworzony droplet",
  "DropletLimit" :"Limit dropletów",
  "Droplets" :"Dropletów"
  }
  }
</i18n>
