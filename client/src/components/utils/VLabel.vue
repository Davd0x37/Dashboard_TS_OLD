<template>
  <div>
    <p class="title">{{title}}</p>
    <p class="value" v-bind:class="[{'no-capitalize': noCapitalize}, {'last': last}]">{{value}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VLabel extends Vue {
  @Prop(String) public title!: string;

  @Prop([String, Number, Boolean])
  public value!: string | number | boolean;

  @Prop({ type: Boolean, default: false })
  public noCapitalize!: boolean;

  @Prop({ type: Boolean, default: false })
  public last!: boolean;
}
</script>


<style scoped lang="scss">
@import "../../styles/colors";
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
  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
  font-weight: 500;
  padding-bottom: 20px;
}
.last {
  padding-bottom: 0;
}
.no-capitalize {
  text-transform: none;
}
</style>
