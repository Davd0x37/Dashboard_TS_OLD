<template>
  <div class="search">
    <div class="actions">
      <input type="text" v-model="search" class="input" id="search-input" placeholder="Type action..." aria-label="Search input">
      <v-icon name="microphone-alt" scale="1.1" style="color: #F5F7FA;" />
    </div>
    <transition-group name="resultBox">
      <div key="result" id="result" class="result" v-if="search.length !== 0">
        <a class="item" v-for="action in actions" :key="action.name" :href="action.href">
          <v-icon :name="'brands/'+action.type" scale="1.3" style="color: #59B369;" />
          <p class="name">{{action.name}}</p>
        </a>
      </div>
      <div key="backdrop" class="backdrop" v-if="search.length !== 0" @click="search = ''" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
// import { debounce } from "lodash";
// import { SearchController } from "@/controllers/Search";

@Component
export default class Searchbox extends Vue {
  private search: string = "";

  private resultBox!: HTMLElement | null;

  private actions: any[] = [
    { type: "spotify", name: "Spotify", href: "#" },
    { type: "digital-ocean", name: "Digital Ocean", href: "#" },
    { type: "paypal", name: "Paypals", href: "#" }
  ];

  private mounted() {
    this.resultBox = this.$el.querySelector("#result");
  }

  @Watch("search")
  private onSearchChange(val: string) {
    this.refreshSearchBox();
  }

  private refreshSearchBox() {
    // const actions: any = SearchController.searchAction(this.search);
    // if (actions.length >= 1) {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/mixin";
@import "../../styles/colors";

.search {
  background: #20262e;
  border-radius: 7px;
  border: 1px solid #374355;
  box-shadow: 0 1px 3px #374355;
  flex: 1;
  font-size: 0.8rem;
  height: 40px;
  margin-left: 20px;
  padding: 0 10px;
  z-index: 15;

  .actions {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-around;

    .input {
      background: transparent;
      border: none;
      width: 100%;
    }
  }
}

.result {
  background: #1e1e24;
  border-bottom: 2px solid $primary-green;
  border-radius: 5px;
  color: #777677;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  position: relative;
  top: 5px;
  will-change: opacity;

  .item {
    align-items: center;
    display: flex;
    flex: 1;
    padding: 10px 0;
  }
  .icon {
    width: 20px;
  }
  .name {
    color: #777677;
    padding: 0 20px;
  }
}

.backdrop {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;
}

.resultBox-enter-active,
.resultBox-leave-active {
  transition: opacity 0.5s;
}

.resultBox-enter,
.resultBox-leave-to {
  opacity: 0;
}
</style>


