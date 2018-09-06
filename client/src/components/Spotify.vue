<template>
  <Plate brandTitle="Spotify" brandIcon="spotify" brandColor="#B5EB00" flex>
    <aside class="details">
      <Label title="Nazwa użytkownika" :value="username"/>
      <Label title="Email" :value="email" noCapitalize/>
      <Label title="Typ konta" :value="type" last class="color"/>
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
  private username: string = this.$store.getters.spotify.username;
  private email: string = this.$store.getters.spotify.email;
  private type: string = this.$store.getters.spotify.type;
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
