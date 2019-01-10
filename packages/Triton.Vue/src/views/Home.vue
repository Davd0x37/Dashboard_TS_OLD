<template>
  <div class="home">
    <VPlate
      v-for="srv in services"
      :key="srv.serviceName"
      brandIcon="paypal"
      :brandTitle="srv.serviceName"
      brandClass="paypal-plate"
      brandColor="#0D96D9"
    >
      <div>{{getData(srv.data)}}</div>
    </VPlate>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VPlate from "@/components/VPlate.vue";
import { query } from "@/lib/Api";
import gql from "graphql-tag";

@Component({
  components: { VPlate }
})
export default class Home extends Vue {
  protected services?: Array<{
    serviceName: string;
    data: string;
  }> = [
    {
      serviceName: "LELs",
      data: '{"name":"asdasdasd","age":"2"}'
    },
    {
      serviceName: "LEL",
      data: '{"name":"omg","age":"asdasdasd2"}'
    }
  ];

  protected getData(service: string): string {
    const req = JSON.parse(service);
    return req;
  }
}
</script>
