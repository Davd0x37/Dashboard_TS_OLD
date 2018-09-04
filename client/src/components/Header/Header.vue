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
import { Component, Prop, Vue } from "vue-property-decorator";
import Searchbox from "@/components/Header/Searchbox.vue";

@Component({
  components: {
    Searchbox
  }
})
export default class Header extends Vue {
  private username: string = "Vernon";
}
</script>

<style scoped lang="scss">
@import "../../styles/mixin";
@import "../../styles/colors";

.header {
  font-family: "Roboto Black", sans-serif;
  height: 80px;
  display: flex;
  justify-content: space-between;

  @include above_size("480px") {
    align-items: center;
  }

  @include below_size("479px") {
    flex-direction: column;
  }

  .logo {
    color: $primary-text;
    margin-left: 20px;
    min-width: 120px;

    @include below_size("780px") {
      display: none;
    }
  }

  .user {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    @include below_size("480px") {
      justify-content: center;
    }

    .actions {
      color: #ebeff3;
      text-align: right;
      margin-right: 20px;
      @include between_size("780px", "960px") {
        margin-left: 10px;
      }
      @include below_size("780px") {
        margin-left: 20px;
      }

      .action {
        &:hover {
          color: $primary-border;
        }
      }
    }

    .profile {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      @include above_size("480px") {
        margin-right: 20px;
      }
      @include below_size("479px") {
        flex-direction: column-reverse;
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
