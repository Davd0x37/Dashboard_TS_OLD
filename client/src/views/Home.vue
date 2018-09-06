<template>
  <section>
    <Header/>
    <main class="main">
      <aside class="feed">
        <Spotify/>
        <DigitalOcean/>
        <Paypal/>
      </aside>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Spotify from "@/components/Spotify.vue";
import DigitalOcean from "@/components/DigitalOcean.vue";
import Paypal from "@/components/Paypal.vue";
import Header from "@/components/Header/Header.vue";

@Component({
  components: {
    Spotify,
    DigitalOcean,
    Paypal,
    Header
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  .feed {
    margin: 20px;
    text-transform: capitalize;
  }
}
</style>
