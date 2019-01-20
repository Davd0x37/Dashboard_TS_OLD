<template>
  <div>
    <button
      :class="['btn', addClass ? addClass : '']"
      :id="id"
      v-on:click="click"
    >
      {{value}}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class VButton extends Vue {
  @Prop() protected id!: string;

  @Prop() protected value!: string;

  @Prop() protected addClass?: string;

  @Emit('emitClick')
  protected click() {}
}
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";

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
