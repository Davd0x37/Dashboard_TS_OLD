<template>
  <div id="login">
    <v-input v-model="login"/>
    <v-input type="password" v-model="password"/>
    <v-input type="password" v-model="passwordRepeat"/>
    <v-input type="email" v-model="email"/>
    <v-button @click="register">Rejestracja</v-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Label from "@/components/utils/VLabel.vue";
import Input from "@/components/utils/VInput.vue";
import Button from "@/components/utils/VButton.vue";
import { QueryUser } from "../controllers/User";

@Component({
  components: {
    "v-label": Label,
    "v-input": Input,
    "v-button": Button
  }
})
export default class Register extends Vue {
  private login: string = "";
  private password: string = "";
  private passwordRepeat: string = "";
  private email: string = "";

  private async register() {

  }
}
</script>

<style lang="scss">
#login {
  background: rgba(0, 0, 0, 1);
  border-radius: 10px;
  height: 90vh;
  margin: auto auto;
  width: 50vw;
  display: flex;
  padding: 20px;
  flex-direction: column;
}
</style>
