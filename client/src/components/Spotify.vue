<template>
  <Plate brandTitle="Spotify" brandIcon="spotify" brandColor="#B5EB00" flex>
    <aside class="details">
      <Label title="Nazwa użytkownika" :value=username />
      <Label title="Email" :value=email />
      <Label title="Typ konta" :value=type noCapitalize last class="color" />
    </aside>
  </Plate>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Label from "@/components/utils/VLabel.vue";
import Plate from "@/components/VPlate.vue";

@Component({
  components: {
    Label,
    Plate
  }
})
export default class Spotify extends Vue {
  private username: string = "Default username";
  private email: string = "Default email";
  private type: string = "Default type";
}
</script>

<style scoped lang="scss">
@import "../styles/mixin";
@import "../styles/colors";

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.color {
  color: $spotify;
}
</style>
