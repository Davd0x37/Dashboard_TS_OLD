<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" style="height: 60px;">
    </div>
    <Searchbox/>
    <div class="user">
      <div class="profile">
        <p class="name">{{username}}</p>
        <img src="@/assets/avatar.webp" alt="Avatar" class="avatar">
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Searchbox from "@/components/Header/Searchbox.vue";
  // import Storage from "@/controllers/Storage";

  @Component({
    components: {
      Searchbox
    }
  })
  export default class Header extends Vue {
    get username() {
      const username = this.$store.getters.user.username;
      if (username.length >= 6) {
        return username.slice(0, 6) + "...";
      } else {
        return username;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/mixin";
  @import "../../styles/colors";

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
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      @include queries("mobileMax") {
        justify-content: center;
      }

      .profile {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        @include queries("tabletMin") {
          margin-right: 20px;
        }

        .name {
          margin-right: 10px;
        }

        .avatar {
          width: 67px;
          height: 67px;
        }
      }
    }
  }
</style>
