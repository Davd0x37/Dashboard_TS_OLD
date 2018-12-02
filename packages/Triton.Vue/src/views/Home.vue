<template>
  <div class="home">
    <Spotify />
    <DigitalOcean />
    <Paypal />
    <Actions />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DigitalOcean from "@/components/Plates/DigitalOcean.vue";
import Spotify from "@/components/Plates/Spotify.vue";
import Paypal from "@/components/Plates/Paypal.vue";
import Actions from "@/components/Plates/Actions.vue";

@Component({
  components: { Paypal, Spotify, DigitalOcean, Actions }
})
export default class Home extends Vue {}
</script>
