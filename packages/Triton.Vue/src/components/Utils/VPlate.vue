<template>
  <article class="plate">
    <header class="brand">
      <i :class="'fab fa-'+brandIcon+' fa-2x'" :style="{color: brandColor}"/>
      <h3 class="title">{{brandTitle}}</h3>
    </header>
    <div :class="'container ' + brandClass">
      <div class="details">
        <slot></slot>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class VPlate extends Vue {
  @Prop() protected brandIcon!: string;
  @Prop() protected brandTitle!: string;
  @Prop() protected brandClass!: string;
  @Prop() protected brandColor!: string;
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

.plate {
  min-width: 320px;
  @include queries("desktopFull") {
    width: 650px;
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
    padding: 25px 20px;

    .wrap {
      align-content: space-between;
    }
  }

  .flex {
    display: flex;
  }
}
</style>
