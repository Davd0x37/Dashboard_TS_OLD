<template>
  <div class="auth">
    <Authenticate />
    <Actions />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Authenticate from "@/components/Plates/Authenticate.vue";
import Actions from "@/components/Plates/Actions.vue";

@Component({
  components: { Authenticate, Actions }
})
export default class Auth extends Vue {}
</script>
