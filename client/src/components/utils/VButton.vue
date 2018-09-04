<template>
  <button class="btn">{{value}}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop({ type: [String, Number], default: "Value" })
  private value!: string | number;
}
</script>

<style lang="scss">
@import "../../styles/colors";

.btn {
  background: transparent;
  text-transform: uppercase;
  border: 1px solid $spotify;
  border-radius: 5px;
  color: $primary-text;
  padding: 10px 20px;
  font-size: 1.1rem;
  outline: none;
  will-change: transition;
  transition: background-color 300ms, color 300ms;

  &:hover {
    background: $spotify;
    color: $primary-text;
  }

  &:active {
    background: $spotify-button-pressed;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.3) inset;
    color: $primary-text;
  }
}
</style>


