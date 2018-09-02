<template>
  <article class="plate">
    <header class="plate__brand">
      <i class="fab fa-digital-ocean fa-2x" style="color: #0080FF;"></i>
      <h3 class="plate__title">Digital Ocean</h3>
    </header>
    <div class="plate__container digital-ocean-plate">
      <div class="container__details">
        <aside class="container__wrap">
          <Label title="Email" :value="email" noCapitalize last/>
        </aside>
        <aside class="container__wrap">
          <Label title="Limit dropletow" :value="dropletLimit" noCapitalize class="digital_ocean--color"/>
          <Label title="Dropletów" :value="total" noCapitalize last class="digital_ocean--color"/>
        </aside>
        <aside class="container__wrap">
          <div class="container__item">
          <Label title="Ostatnio utworzony droplet" :value="compLastCreatedDroplet" noCapitalize class="digital_ocean--color"/>
          </div>
        </aside>
      </div>
      <div class="container__other">
        <Chart/>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Label from "@/components/utils/VLabel.vue";
import Chart from "@/components/utils/VChart.vue";

@Component({
  components: {
    Label,
    Chart
  }
})
export default class Spotify extends Vue {
  private email: string = "LOL";
  private dropletLimit: string = "LOL";
  private total: string = "LOL";
  private lastCreatedDroplet: string = "LOL";

  get compLastCreatedDroplet() {
    return this.lastCreatedDroplet + " dni temu";
  }
}
</script>

<style scoped lang="scss">
@import "../styles/mixin";
@import "../styles/colors";

.digital-ocean-plate {
  .container__details {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .container__wrap {
      align-content: space-between;
    }

    @media only screen and (max-width: 480px) {
      .container__wrap:nth-child(2) {
        margin-left: 20px;
      }
    }
    @media only screen and (max-width: 360px) {
      .container__wrap:last-child {
        padding-top: 20px;
        display: flex;
        flex: 1;
        justify-content: space-between;
      }
    }

    @include item__btn($digital_ocean, $digital_ocean-button-pressed);
  }

  .container__other {
    .chart {
      border: 1px solid rgba($digital_ocean, 0.7);
      border-radius: 5px;
      margin-top: 10px;
    }
  }

  .digital_ocean--color {
    color: $digital_ocean;
  }
}
</style>
