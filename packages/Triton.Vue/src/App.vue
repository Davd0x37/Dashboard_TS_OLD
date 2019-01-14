<template>
  <div id="app">
    <header class="header">
      <div class="logo">
        <a href="#">{{AppName}}</a>
      </div>
      <div class="user">
        <p class="user__name">{{User.email}}</p>
        <img :src="User.avatar" alt="Avatar" class="user__avatar">
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store from "@/store";

@Component
export default class App extends Vue {
  protected AppName: string = "Dashboard";

  constructor() {
    super();
    // @ts-ignore
    this.$store.subscribeAction(async (mut, state) => {
      if (mut.type === "UserManager") {
        if (mut.payload.action === "Register") {
          // @ts-ignore
          await this.$db.dashboard.insert(mut.payload.data);
          // @ts-ignore
          // const usr = await this.$db.dashboard.findOne().exec();
        }
        if (mut.payload.action === "Login") {
          // @ts-ignore
          const usr = await this.$db.dashboard.findOne().exec();
          if (usr === null) {
            await this.$db.dashboard.insert(mut.payload.data);
          } else {
            usr!.updateUserData(mut.payload.data);
          }
        }
      }
    });
  }

  async created() {
    const usr = await this.$db.dashboard.findOne().exec();
    if (usr !== null) {
      this.$store.dispatch("UserManager", {
        action: "update",
        data: usr!.getData()
      });
    }
  }

  protected get User() {
    return this.$store.state.data;
  }
}
</script>

<style lang="scss">
@import "./assets/scss/index";
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: $primary-text;
  font-family: "Roboto", "Roboto Medium", "Roboto Black", sans-serif;
  font-size: 100%;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}

body {
  background: $background;
  background-attachment: fixed;
  background-size: cover;

  @include queries("mobileMax") {
    background: $background_mobile, $background_mobile_fallback;
  }
}

h3,
p {
  margin: 0;
  padding: 0;
}

input {
  color: $primary-text;
  outline: none;
}

a:visited,
a:link,
a:active {
  text-decoration: none;
  color: $primary-text;
}

.flex {
  display: flex;
}

.header {
  align-items: center;
  display: flex;
  font-family: "Roboto Black", sans-serif;
  height: 80px;
  justify-content: space-between;
  min-width: 360px;

  .logo {
    color: $primary-text;
    margin-left: 20px;
    min-width: 120px;

    @include queries("tabletMax") {
      display: none;
    }
  }

  .user {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    align-items: center;
    @include queries("mobileMax") {
      justify-content: center;
    }
    @include queries("tabletMin") {
      margin-right: 20px;
    }

    .user__name {
      margin-right: 10px;
    }

    .user__avatar {
      width: 67px;
      height: 67px;
    }
  }
}
</style>
