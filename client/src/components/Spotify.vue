<template>
  <article class="plate">
    <header class="plate__brand">
      <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
      <h3 class="plate__title">Spotify</h3>
    </header>
    <div class="plate__container spotify-plate">
      <aside class="container__details">
        <Label title="Nazwa użytkownika" :value=username />
        <Label title="Email" :value=email />
        <Label title="Typ konta" :value=type noCapitalize last class="spotify__title--color" />
      </aside>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Label from "@/components/utils/VLabel.vue";

@Component({
  components: {
    Label
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

.spotify-plate {
  display: flex;

  .container__details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .container__other {
    flex: 2;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    @include item__btn($spotify, $spotify-button-pressed);
  }

  .spotify__title--color {
    color: $spotify;
  }
}
</style>
