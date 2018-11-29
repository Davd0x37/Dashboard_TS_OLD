<template>
  <div class="home">
    <Spotify/>
    <DigitalOcean/>
    <Paypal/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DigitalOcean from "@/components/Plates/DigitalOcean.vue";
import Spotify from "@/components/Plates/Spotify.vue";
import Paypal from "@/components/Plates/Paypal.vue";

@Component({
  components: { Paypal, Spotify, DigitalOcean }
})
export default class Home extends Vue {}
</script>
