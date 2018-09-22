<template>
  <Plate brandTitle="DigitalOcean" brandIcon="digital-ocean" brandColor="#0080FF">
    <div class="details">
      <aside class="wrap">
        <Label title="Email" :value="email" noCapitalize/>
        <Label title="Ostatnio utworzony droplet" :value="compLastCreatedDroplet" noCapitalize last
               class="digital_ocean--color"/>
      </aside>
      <aside class="wrap">
        <Label title="Limit dropletow" :value="dropletLimit" noCapitalize class="digital_ocean--color"/>
        <Label title="Dropletów" :value="total" noCapitalize last class="digital_ocean--color"/>
      </aside>
    </div>
    <div class="other">
      <Chart/>
    </div>
  </Plate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Label from "@/components/utils/VLabel.vue";
import Chart from "@/components/utils/VChart.vue";
import Plate from "@/components/VPlate.vue";

@Component({
  components: {
    Label,
    Chart,
    Plate
  }
})
export default class Spotify extends Vue {
  private email: string = this.$store.getters.digitalocean.email;
  private dropletLimit: string = this.$store.getters.digitalocean.dropletLimit;
  private total: string = this.$store.getters.digitalocean.total;
  private last: string = this.$store.getters.digitalocean.lastCreatedDroplet;

  get compLastCreatedDroplet() {
    if (this.last.length === 0) {
      return "";
    } else {
      return this.last + " dni temu";
    }
  }
}
</script>

<style lang="scss">
@import "../styles/mixin";
@import "../styles/colors";

.details {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .wrap {
    align-content: space-between;
  }

  @include queries("mobileMax") {
    .wrap:nth-child(2) {
      margin-left: 20px;
    }
  }
}

.other {
  .chart {
    border: 1px solid rgba($digital_ocean, 0.7);
    border-radius: 5px;
    margin-top: 10px;
  }
}

.digital_ocean--color {
  color: $digital_ocean;
}
</style>
