<template>
  <VPlate
    brandIcon="galactic-senate"
    brandTitle="Actions"
    brandClass="actions-plate"
    brandColor="#ff922b"
  >
    <aside class="details">
      <router-link to="/">
        <VButton id="HomeLink" :value="$t('Actions.HomeLink')" addClass="color"/>
      </router-link>
      <router-link to="/auth">
        <VButton id="AuthLink" :value="$t('Actions.AuthLink')" addClass="color"/>
      </router-link>
      <router-link to="/admin">
        <VButton id="AdminLink" :value="$t('Actions.AdminLink')" addClass="color"/>
      </router-link>
      <VButton id="RefreshData" :value="$t('Actions.RefreshData')" addClass="color"/>
    </aside>
    <aside class="details">
      <VButton id="AuthSpotify" :value="$t('Actions.AuthSpotify')" addClass="color"/>
      <VButton id="AuthPaypal" :value="$t('Actions.AuthPaypal')" addClass="color"/>
    </aside>
    <aside class="details">
      <VInput
        type="text"
        title="Api Token"
        id="DigitalOceanApiToken"
        :placeholder="$t('Actions.DigitalOceanApiToken')"
      />

      <VButton id="AddToken" :value="$t('Actions.AddToken')" addClass="color"/>
    </aside>
  </VPlate>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPlate from "@/components/VPlate.vue";
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
export default class Actions extends Vue {
  protected user = this.$store.state.data
}
</script>

<style lang="scss">
@import "../assets/scss/index.scss";

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

