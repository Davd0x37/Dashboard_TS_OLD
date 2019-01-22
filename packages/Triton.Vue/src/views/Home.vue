<template>
  <div class="home">
    <VPlate
      v-for="srv in services"
      :key="srv.serviceName"
      :brandIcon="srv.serviceName"
      :brandTitle="srv.serviceName"
      :brandColor="$t(`${srv.serviceName}_color`)"
    >
      <VLabel v-for="(val, key) in srv.data" :key="key" :title="$t(key)" :value="val"/>
    </VPlate>
    <Actions/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VPlate from "@/components/VPlate.vue";
import Actions from "@/components/Actions.vue";
import VLabel from "@/components/Utils/VLabel.vue";
import { query } from "@/lib/Api";
import gql from "graphql-tag";
import { flattenObj } from "@/utils/obj";

@Component({
  components: { VPlate, VLabel, Actions }
})
export default class extends Vue {
  protected get services() {
    const services = this.$store.state.data.services;
    if (services === null || services === undefined) {
      return null;
    }
    return services.map((srv: any) => {
      const newData = JSON.parse(srv.data).reduce(
        (prev: {}, curr: {}) => ({ ...prev, ...curr }),
        {}
      );

      return {
        serviceName: srv.serviceName,
        data: flattenObj(newData)
      };
    });
  }
}
</script>