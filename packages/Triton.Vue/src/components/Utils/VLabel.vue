<template>
  <div style="width: 50%;">
    <p class="title">{{title}}</p>
    <p v-bind:class="['value', isLast ? 'last' : '', addClass ? addClass : '']">
      {{value}}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class VLabel extends Vue {
  @Prop() protected title!: string;

  @Prop() protected value!: string;

  // @Prop() protected noCapitalize?: boolean;

  @Prop() protected isLast?: boolean;

  @Prop() protected addClass?: string;
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

.title {
  text-transform: capitalize;
  color: $second-text;
  font-family: "Roboto Medium", "Arial", sans-serif;
  font-style: oblique;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  font-size: 0.75rem;
  padding-bottom: 1px;

  @media screen and (max-width: 480px) {
    font-size: 0.55rem;
  }
}

.value {
  font-weight: 500;
  padding-bottom: 10px;
  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
}

.last {
  padding-bottom: 0;
}

.no-capitalize {
  text-transform: none;
}
</style>
