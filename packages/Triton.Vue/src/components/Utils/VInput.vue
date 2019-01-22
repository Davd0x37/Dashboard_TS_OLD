<template>
  <div style="display: flex; flex-direction: column;">
    <label
      :for="id"
      class="title"
    >{{title}}</label>
    <input
      :type="type"
      :id="id"
      :name="[tab ? tab : id]"
      :class="[type !== 'submit' ? 'input' : '', addClass ? addClass : '']"
      :placeholder="placeholder ? placeholder : ''"
      :minlength="[minlength ? minlength : '']"
      :maxlength="[maxlength ? maxlength : '']"
      v-on:click="click"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class VInput extends Vue {
  @Prop() protected title!: string;
  @Prop() protected type!: string;

  @Prop() protected id!: string;
  @Prop() protected tab?: string;
  @Prop() protected value?: any;
  @Prop() protected checked?: string;
  @Prop() protected minlength?: string;
  @Prop() protected maxlength?: string;

  @Prop() protected addClass?: string;
  @Prop() protected placeholder?: string;

  @Emit("emitClick")
  protected click() {}
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

.input {
  border: 1px solid $input_border;
  background: $input_background;
  border-radius: 5px;
  padding: 5px;
}

.input--success {
  border-color: $input_border_success;
}

.input--error {
  border-color: $input_border_error;
}
</style>
