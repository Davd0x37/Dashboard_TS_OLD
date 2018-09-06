<template>
  <div id="app">
    <router-link to="/">HOME</router-link>
    <router-link to="/login">LOGIN</router-link>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header/Header.vue"; // @ is an alias to /src

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>


<style lang="scss">
@import "./styles/lib/normalize";
@import "./styles/colors";
@import "./styles/mixin";

body {
  font-family: "Roboto", "Roboto Medium", "Roboto Black", sans-serif;
  background: $background, $background_fallback;
  background-attachment: fixed;
  background-size: cover;
  font-size: 100%;
  color: $primary-text;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);

  @include queries("mobileMax") {
    background: $background_mobile, $background_mobile_fallback;
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
}

a:visited,
a:link,
a:active {
  text-decoration: none;
  color: $primary-text;
}
</style>
