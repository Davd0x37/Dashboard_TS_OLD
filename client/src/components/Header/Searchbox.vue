<template>
  <div class="search">
    <div class="searchbox">
      <a href="#" class="action" aria-label="search">
        <i class="fas fa-search fa-lg" style="color: #5162FF;"></i>
      </a>
      <div class="input">
        <input type="text" v-model="search" class="input" id="search-input" placeholder="Type action..." aria-label="Search input">
        <transition name="resultBox">
          <div id="result" class="result" v-if="search.length !== 0">
            <a class="item" v-for="action in actions" :key="action.name" :href="action.href">
              <v-icon :name="'brands/'+action.type" scale="1.3" style="color: #59B369;" />
              <p class="name">{{action.name}}</p>
            </a>
          </div>
        </transition>
      </div>
      <a href="#" class="action" aria-label="talk">
        <i class="fas fa-microphone-alt fa-lg" style="color: #F5F7FA;"></i>
      </a>
    </div>
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
  flex: 2;
  display: flex;
  .searchbox {
    flex: 1;
    background: #20262e;
    height: 35px;
    font-size: 0.8rem;
    border: 1px solid #374355;
    border-radius: 7px;
    box-shadow: 0 1px 3px #374355;
    display: flex;
    align-items: center;
    padding: 0 5px 0 5px;
    justify-content: space-around;
    z-index: 10;

    @include between_size("479px", "960px") {
      margin-left: 20px;
    }
    @include below_size("479px") {
      display: none;
    }

    .input {
      width: 100%;
      height: 35px;
      border: none;
      background: transparent;
    }

    .action {
      height: 35px;
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .result {
    background: #1e1e24;
    color: #777677;
    position: relative;
    padding: 20px;
    border-bottom: 2px solid $primary-green;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    top: 10px;
    will-change: opacity;

    .item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      flex: 1;
    }
    .icon {
      width: 20px;
    }
    .name {
      color: #777677;
      padding: 0 20px;
    }
  }
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


