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
      <router-link to="/auth" v-if="user.session_id === ''">
        <VButton id="AuthLink" :value="$t('Actions.AuthLink')" addClass="color"/>
      </router-link>
      <router-link to="/admin" v-if="user.session_id !== ''">
        <VButton id="AdminLink" :value="$t('Actions.AdminLink')" addClass="color"/>
      </router-link>
      <VButton
        v-if="user.session_id !== ''"
        id="RefreshData"
        :value="$t('Actions.RefreshData')"
        addClass="color"
        v-on:emitClick="refresh()"
      />
      <VButton
        v-if="user.session_id !== ''"
        :value="$t('Actions.Logout')"
        addClass="color"
        v-on:emitClick="logout()"
      />
    </aside>
    <slot></slot>
  </VPlate>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPlate from "@/components/VPlate.vue";
import VLabel from "@/components/Utils/VLabel.vue";
import VButton from "@/components/Utils/VButton.vue";
import VInput from "@/components/Utils/VInput.vue";
import { refreshData } from "@/lib/User";

@Component({
  components: {
    VPlate,
    VLabel,
    VButton,
    VInput
  }
})
export default class Actions extends Vue {
  protected user = this.$store.state.data;

  protected async refresh() {
    const req = await refreshData(this.$store.state.data.session_id);
    await this.$store.dispatch("UserManager", {
      action: "UpdateServices",
      data: {
        services: req
      }
    });
  }

  protected async logout() {
    await this.$store.dispatch("UserManager", {
      action: "UpdateServices",
      data: {
        session_id: "",
        avatar: "",
        email: "",
        registerDate: "",
        isOnline: false,
        avServices: undefined,
        services: undefined
      }
    });
  }
}
</script>

<style lang="scss">
@import "../assets/scss/index.scss";

.actions-plate {
  display: flex;
  justify-content: space-between;

  .details {
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

