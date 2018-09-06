<template>
  <article class="plate">
    <header class="brand">
      <v-icon :name="'brands/' + brandIcon" scale="2" :style="'color: ' + brandColor + ';'" />
      <h3 class="title">{{brandTitle}}</h3>
    </header>
    <div :class="['container', {'flex': flex}]">
      <slot></slot>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VPlate extends Vue {
  @Prop({ type: String, required: true })
  private brandIcon!: string;

  @Prop({ type: String, required: true })
  private brandTitle!: string;

  @Prop({ type: String, required: true })
  private brandColor!: string;

  @Prop({ type: Boolean, default: false })
  private flex!: boolean;
}
</script>

<style scoped lang="scss">
@import "../styles/mixin";
@import "../styles/colors";

.plate {
  min-width: 320px;
  @include queries("desktopFull") {
    width: 600px;
  }

  .brand {
    align-items: center;
    display: flex;
    padding-left: 15px;
    position: relative;
    top: 14px;
  }

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 30px;
  }

  .container {
    background: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232c34e7' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E"),
      rgba(0, 0, 0, 1);
    border-radius: 10px;
    flex-wrap: wrap;
    padding: 25px 15px;
  }

  .flex {
    display: flex;
  }
}
</style>
