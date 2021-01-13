<template>
  <form class="search-form"
  @submit.prevent="onSearch"
  >
    <input
      class="search-form__input"      
      placeholder="Search by namey"
      v-model="input"
      ref="inputSearch" 
      @keyup="onSearch"     
    />
    <i class="fas fa-search search-form__icon"
      @click="onSearch"
    ></i>
  </form>
</template>
<script>
// import { mapGetters } from "vuex";
import debounce from "@/data/debounce";

export default {
  data() {
    return {
      input: ``
    };
  },
  // computed: {
  //   ...mapGetters([`filterText`]),
  //   filter: {
  //     get() {
  //       return this.filterText;
  //     },
  //     set(value) {
  //       this.$store.dispatch("getCharacters", value);
  //     }
  //   }
  // },
  methods: {
    onSearch(event) {
      if (event.keyCode === 13 || (event.target.tagName === `I`)){
        this.$store.dispatch("getCharacters", event.target.value);
      }
    },
    focus(){
      this.$refs.inputSearch.focus();
    }
  },
  watch: {
    input: debounce(function(newVal) {
      this.$store.dispatch("getCharacters", newVal);
    }, 500)
  },
  updated(){
    setInterval(this.focus, 500);
  }
};
</script>
<style scoped lang="scss">
.search-form {
  width: 100%;
  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  padding-left: 5%;
  padding-right: 5%;

  &__input {
    width: inherit;
    padding: 5px 0;
    border: none;
    outline: none;
    color: #808080;
    border-bottom: 3px solid #808080;
    background: #333333;
    font-size: 16px;
    line-height: 19px;
  }

  &__icon {
    position: absolute;
    right: 6%;
    top: 0;
    bottom: 0;
    height: inherit;
    line-height: 30px;
    margin-left: 10px;
    order: 1;
    color: #808080;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 21px;
  }
}
</style>