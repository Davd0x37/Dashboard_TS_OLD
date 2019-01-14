<template>
  <div class="home">admin lelellele
    <Actions/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VPlate from "@/components/VPlate.vue";
import Actions from "@/components/Actions.vue";
import VLabel from "@/components/Utils/VLabel.vue";
import { query } from "@/lib/Api";
import gql from "graphql-tag";
import { flattenObj } from "@/utils/obj";

@Component({
  components: { /* VPlate, VLabel, */ Actions }
})
export default class Home extends Vue {}
</script>