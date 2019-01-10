<template>
  <main class="authenticate">
    <VButton id="LoginLink" :value="$t('LoginLink')" v-on:emitClick="openTab(true)"/>
    <VButton id="RegisterLink" :value="$t('RegisterLink')" v-on:emitClick="openTab(false)"/>

    <section class="container">
      <div class="tab LoginLink" v-if="activeTab">
        <form onsubmit="return false;">
          <VInput
            :title="$t('Login')"
            id="Login"
            type="text"
            minlength="5"
            maxlength="40"
            :value.sync="login"
          />
          <VInput
            :title="$t('Password')"
            id="Password"
            type="password"
            minlength="5"
            maxlength="40"
            :value.sync="password"
          />
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
          <VInput
            :title="$t('Login')"
            id="LoginNew"
            type="text"
            minlength="5"
            maxlength="40"
            :value.sync="login"
          />
          <VInput
            :title="$t('Password')"
            id="PasswordNew"
            type="password"
            minlength="5"
            maxlength="40"
            :value.sync="password"
          />

          <VInput
            :title="$t('Email')"
            id="Email"
            type="email"
            minlength="5"
            maxlength="80"
            :value.sync="email"
          />
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

  protected authenticate(e: any) {}
  protected register(e: any) {}
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
