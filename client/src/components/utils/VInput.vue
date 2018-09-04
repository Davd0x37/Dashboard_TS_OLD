<template>
  <div>
    <input :type="type" :value="value" :class="['input', {'input--success': success, 'input--error': error}]" spellcheck="false">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VInput extends Vue {
  @Prop({ type: String, default: "text" })
  private type!: string;
  @Prop({ type: String, default: "text" })
  private value!: string;
  @Prop({ type: Boolean, default: false })
  private success!: boolean;
  @Prop({ type: Boolean, default: false })
  private error!: boolean;
}
</script>

<style lang="scss">
@import "../../styles/colors";
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
