<template>
  <div id="login">
    <v-input v-model="login"/>
    <v-input type="password" v-model="password"/>
    <v-button @click="authenticate">Zaloguj</v-button>
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
export default class Login extends Vue {
  private login: string = "";
  private password: string = "";

  private async authenticate(e: any) {
    const data = await QueryUser.authenticate(this.login, this.password);
    if(data) {
      console.log('AUTHENTICATED')
    }else{
      console.log('WRONG CREDENTIALS')
    }
  }
}
</script>

<style lang="scss">
#login {
  background: rgba(0, 0, 0, 1);
  border-radius: 10px;
  height: 50vh;
  margin: auto auto;
  width: 50vw;
}
</style>
