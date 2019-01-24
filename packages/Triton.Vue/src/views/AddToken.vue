<template>
  <div class="home">
    <VPlate
      brandIcon="galactic-senate"
      brandTitle="Actions"
      brandClass="token-plate"
      brandColor="#ff922b"
    >
      <form onsubmit="return false;">
        <VInput :title="$t('AdminToken.Form.serviceName')" type="text" :value.sync="serviceName"/>
        <VInput :title="$t('AdminToken.Form.apiURL')" type="text" :value.sync="apiURL"/>
        <VInput :title="$t('AdminToken.Form.tokenService')" type="text" :value.sync="tokenService"/>
        <VInput :title="$t('AdminToken.Form.authorizeURL')" type="text" :value.sync="authorizeURL"/>
        <VInput :title="$t('AdminToken.Form.userScopes')" type="text" :value.sync="userScopes"/>
        <VInput :title="$t('AdminToken.Form.clientID')" type="text" :value.sync="clientID"/>
        <VInput :title="$t('AdminToken.Form.clientSecret')" type="text" :value.sync="clientSecret"/>
        <VInput :title="$t('AdminToken.Form.paths')" type="text" :value.sync="paths"/>
        <VInput
          :title="$t('AdminToken.Form.requestedData')"
          type="text"
          :value.sync="requestedData"
        />
        <VInput :title="$t('AdminToken.Form.tokenType')" type="text" :value.sync="tokenType"/>
        <VInput :title="$t('AdminToken.Form.redirectURL')" type="text" :value.sync="redirectURL"/>
        <VInput
          :title="$t('AdminToken.SendToken')"
          :value="$t('AdminToken.SendToken')"
          id="LoginButton"
          type="submit"
          addClass="flex btn"
          v-on:emitClick="addToken()"
        />
      </form>
    </VPlate>
    <Actions/>
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
import { addService } from "@/lib/User";

@Component({
  components: { VLabel, VInput, VButton, Actions, VPlate }
})
export default class extends Vue {
  protected serviceName: string = "";
  protected apiURL: string = "";
  protected tokenService: string = "";
  protected authorizeURL: string = "";
  protected userScopes: string = "";
  protected clientID: string = "";
  protected clientSecret: string = "";
  protected paths: string = "";
  protected requestedData: string = "";
  protected tokenType: string = "";
  protected redirectURL: string = "";

  protected async addToken() {
    // window.open("http://google.com?q=" + name);
    console.log()
    //     const req = await addService({
    //   serviceName: this.serviceName,
    //   apiURL: this.apiURL,
    //   tokenService: this.tokenService,
    //   authorizeURL: this.authorizeURL,
    //   userScopes: this.userScopes.replace(/\"/g, "").split(","),
    //   clientID: this.clientID,
    //   clientSecret: this.clientSecret,
    //   paths: this.paths,
    //   requestedData: this.requestedData.replace(/\"/g, "").split(","),
    //   tokenType: this.tokenType,
    //   redirectURL: this.redirectURL
    // });
    const req = await addService({
      serviceName: this.serviceName,
      apiURL: this.apiURL,
      tokenService: this.tokenService,
      authorizeURL: this.authorizeURL,
      userScopes: this.userScopes,
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      paths: this.paths,
      requestedData: this.requestedData,
      tokenType: this.tokenType,
      redirectURL: this.redirectURL
    });
  }
}
</script>

<style lang="scss">
@import "../assets/scss/index";

.token-plate {
}
</style>
