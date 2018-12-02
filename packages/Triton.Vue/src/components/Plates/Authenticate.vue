<template>
  <main class="authenticate">

    <VButton
      id="LoginLink"
      :value="$t('LoginLink')"
      v-on:emitClick="openTab(true)"
    />
    <VButton
      id="RegisterLink"
      :value="$t('RegisterLink')"
      v-on:emitClick="openTab(false)"
    />

    <section class="container">
      <div
        class="tab LoginLink"
        v-if="activeTab"
      >
        <form onsubmit="return false;">
          <VInput
            :title="$t('Login')"
            id="Login"
            type="text"
            minLength="5"
            maxLength="40"
            :value.sync="Login"
          />
          <VInput
            :title="$t('Password')"
            id="Password"
            type="password"
            minLength="5"
            maxLength="40"
            :value.sync="Password"
          />
          <VInput
            :title="$t('LoginLink')"
            id="LoginButton"
            type="submit"
            addClass="flex btn"
            v-on:emitClick="Authenticate"
          />
        </form>
      </div>
      <div
        class="tab RegisterLink"
        v-else
      >
        <form onsubmit="return false;">
          <VInput
            :title="$t('Login')"
            id="LoginNew"
            type="text"
            minLength="5"
            maxLength="40"
            :value.sync="Login"
          />
          <VInput
            :title="$t('Password')"
            id="PasswordNew"
            type="password"
            minLength="5"
            maxLength="40"
            :value.sync="Password"
          />

          <VInput
            :title="$t('Email')"
            id="Email"
            type="email"
            minLength="5"
            maxLength="80"
            :value.sync="Email"
          />
          <VInput
            :title="$t('Avatar')"
            id="Avatar"
            type="text"
            :value.sync="Avatar"
          />
          <VInput
            :title="$t('RegisterLink')"
            id="RegisterButton"
            type="submit"
            addClass="flex btn"
            v-on:emitClick="Register"
          />
        </form>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPlate from "@/components/Utils/VPlate.vue";
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
  public Login: string = "";
  public Password: string = "";
  public Email: string = "";
  public Avatar: string = "";

  public activeTab: boolean = true;

  protected openTab(open: boolean) {
    this.activeTab = open;
  }

  protected Authenticate(e: any) {}
  protected Register(e: any) {}
}
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";

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
