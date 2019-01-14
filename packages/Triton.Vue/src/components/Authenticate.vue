<template>
  <main class="authenticate">
    <VButton id="LoginLink" :value="$t('LoginLink')" v-on:emitClick="openTab(true)"/>
    <VButton id="RegisterLink" :value="$t('RegisterLink')" v-on:emitClick="openTab(false)"/>

    <section class="container">
      <div class="tab LoginLink" v-if="activeTab">
        <form onsubmit="return false;">
          <VInput :title="$t('Login')" id="Login" type="text" :value.sync="login"/>
          <VInput :title="$t('Password')" id="Password" type="password" :value.sync="password"/>
          <VInput
            :title="$t('LoginLink')"
            id="LoginButton"
            type="submit"
            addClass="flex btn"
            v-on:emitClick="authenticate"
          />
        </form>
      </div>
      <div class="tab RegisterLink" v-else>
        <form onsubmit="return false;">
          <VInput :title="$t('Login')" id="LoginNew" type="text" :value.sync="login"/>
          <VInput :title="$t('Password')" id="PasswordNew" type="password" :value.sync="password"/>

          <VInput :title="$t('Email')" id="Email" type="email" :value.sync="email"/>
          <VInput :title="$t('Avatar')" id="Avatar" type="text" :value.sync="avatar"/>
          <VInput
            :title="$t('RegisterLink')"
            id="RegisterButton"
            type="submit"
            addClass="flex btn"
            v-on:emitClick="register"
          />
        </form>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPlate from "@/components/VPlate.vue";
import VLabel from "@/components/Utils/VLabel.vue";
import VButton from "@/components/Utils/VButton.vue";
import VInput from "@/components/Utils/VInput.vue";
import { signIn, register } from "@/lib/User";

@Component({
  components: {
    VPlate,
    VLabel,
    VButton,
    VInput
  }
})
export default class Authenticate extends Vue {
  public login: string = "";
  public password: string = "";
  public email: string = "";
  public avatar: string = "";

  public activeTab: boolean = true;

  protected openTab(open: boolean) {
    this.activeTab = open;
  }

  protected async authenticate(e: any) {
    const req = await signIn(this.login, this.password);
    console.log(req);
  }
  protected async register(e: any) {
    const req = await register(this.$db, {
      login: this.login,
      password: this.password,
      email: this.email,
      avatar: this.avatar
    });
    console.log(req);
  }
}
</script>

<style lang="scss">
@import "../assets/scss/index.scss";

.authenticate {
  background: $background_fallback;
}
</style>

<i18n>
  {
  "en": {
    "LoginLink": "Login",
    "RegisterLink": "Register",
    "Login": "Login",
    "Password": "Password",
    "Email": "Email",
    "Avatar": "Avatar"
  },
  "pl": {
    "LoginLink": "Login",
    "RegisterLink": "Rejestracja",
    "Login": "Login",
    "Password": "Hasło",
    "Email": "Email",
    "Avatar": "Avatar"
  }
  }
</i18n>
