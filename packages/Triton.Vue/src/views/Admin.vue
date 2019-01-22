<template>
  <div class="home">
    <Actions>
      <aside class="details">
        <aside class="details">
          <VButton
            v-for="key in user.avServices"
            :key="key"
            :value="$t(`${key}_auth`)"
            @emitClick="redirectAuth(key)"
          />
        </aside>
        <!-- <VInput
        type="text"
        title="Api Token"
        id="DigitalOceanApiToken"
        :placeholder="$t('Actions.DigitalOceanApiToken')"
      />

        <VButton id="AddToken" :value="$t('Actions.AddToken')" addClass="color"/>-->
      </aside>

      <router-link to="/admin/addToken">
        <VButton id="AddToken" :value="$t('Actions.AdminAddToken')" addClass="color"/>
      </router-link>
    </Actions>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VPlate from "@/components/VPlate.vue";
import Actions from "@/components/Actions.vue";
import VLabel from "@/components/Utils/VLabel.vue";
import VButton from "@/components/Utils/VButton.vue";
import VInput from "@/components/Utils/VInput.vue";
import { query } from "@/lib/Api";
import gql from "graphql-tag";
import { flattenObj } from "@/utils/obj";

@Component({
  components: { VLabel, VInput, VButton, Actions }
})
export default class extends Vue {
  protected user = this.$store.state.data;

  protected async redirectAuth(name: string) {
    window.open(
      `http://localhost:4000/services/${name}?token=${this.user.session_id}`
    );
  }
}
</script>