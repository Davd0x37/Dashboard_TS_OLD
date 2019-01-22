<template>
  <div class="auth">
    <Authenticate/>
    <Actions/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Authenticate from "@/components/Authenticate.vue";
import Actions from "@/components/Actions.vue";

@Component({
  components: { Authenticate, Actions }
})
export default class extends Vue {}
</script>
