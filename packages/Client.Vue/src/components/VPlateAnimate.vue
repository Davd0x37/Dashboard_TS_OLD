<template>
  <div class="plate__relative plate__desktop animate">
    <article class="plate plate__desktop animate">
      <header class="plate__brand">
        <v-icon :name="'brands/' + brandIcon" scale="2" :style="'color: ' + brandColor + ';'"/>
        <h3 class="plate__title">{{brandTitle}}</h3>
      </header>
      <div :class="['plate__container', {'flex': flex}]">
        <slot></slot>
      </div>
    </article>
    <article class="plate plate__back plate__desktop animate">
      <header class="plate__brand">
        <v-icon :name="'brands/' + brandIcon" scale="2" :style="'color: ' + brandColor + ';'"/>
        <h3 class="plate__title">{{brandTitle}}</h3>
      </header>
      <div :class="['plate__container', {'flex': flex}]">
        <slot name="back"></slot>
      </div>
    </article>
  </div>
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

<style lang="scss">
@import "../styles/mixin";
@import "../styles/colors";

.animate {
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.5, 0.2, 0.2, 0.5);
  will-change: transform;
  backface-visibility: hidden;
}

.plate__desktop {
  min-width: 320px;
  @include queries("desktopFull") {
    width: 450px;
  }
}

.plate__relative {
  position: relative;
  perspective: 1500px;

  &:hover {
    .plate {
      transform: rotateY(180deg);
    }
    .plate__back {
      transform: rotateY(0deg);
    }
  }
}

.plate {
  transform: rotateY(0deg);

  .plate__brand {
    align-items: center;
    display: flex;
    padding-left: 15px;
    position: relative;
    top: 14px;
    transform: translateZ(60px) scale(0.9);
    backface-visibility: hidden;
  }

  .plate__title {
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 30px;
  }

  .plate__container {
    background: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232c34e7' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E"),
      rgba(0, 0, 0, 1);
    border-radius: 10px;
    flex-wrap: wrap;
    padding: 25px 20px;
    & > * {
      transform: translateZ(60px) scale(0.9);
      backface-visibility: hidden;
    }
  }

  .flex {
    display: flex;
  }
}

.plate__back {
  transform: rotateY(-180deg);
  position: absolute;
  top: 0;
  left: 0;

  .plate__container {
    background: url("../assets/plate_background.jpeg") rgba(0, 0, 0, 0.5);
    background-size: cover;
  }
}
</style>
