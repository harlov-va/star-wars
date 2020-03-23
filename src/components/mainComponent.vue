<template>
  <main>
    <preloader v-show="loading"></preloader>
    <search-form v-show="!loading"></search-form>
    <div class="cards-container" v-show="!loading">
      <card
        v-for="item in characters"
        :key="item.url"
        :name="item.name"
        :species="item.species"
        :avatarText="item.name.charAt(0)"
        :url="item.url"
      ></card>
    </div>
  </main>
</template>
<script>
import { mapGetters } from "vuex";
import searchForm from "./mainElements/searchForm";
import preloader from "./mainElements/preloader";
import card from "./mainElements/card/card";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([`loading`, `characters`])
  },
  components: {
    searchForm,
    preloader,
    card
  }
};
</script>

<style scoped lang="scss">
main {
  height: max-content;
  @media (min-width: 768px) {
    padding: 80px calc(50vw - (#{$layout-width} + 17px) / 2);
  }
}
.cards-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  margin-top: 40px;
  padding-left: 5%;
  padding-right: 5%;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
  }
  .character-card:hover {
    box-shadow: 0px 10px 40px rgba(37, 136, 167, 0.38);
  }
}
</style>