<template>
  <div class="chart">
    <canvas id="digital_ocean_chart" class="chart__canvas" width="550px" height="90px"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VChart extends Vue {}
</script>

<style scoped lang="scss">
@import "../../styles/mixin";
@import "../../styles/colors";
</style>
