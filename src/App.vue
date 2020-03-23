<template>
  <div id="app">
    <header-component></header-component>
    <main-component></main-component>    
    <footer-component></footer-component>
    <modal :class="{hidden: hideModal}"></modal>
  </div>
</template>

<script>
import headerComponent from '@/components/headerComponent';
import footerComponent from '@/components/footerComponent';
import mainComponent from '@/components/mainComponent';
import modal from '@/components/modalComponent';
import {  mapGetters } from "vuex";

export default {
  name: "app",

  data() {
    return { };
  },
  computed: {
    ...mapGetters([`hideModal`]),
  },
  components:{
        headerComponent,
        footerComponent,
        mainComponent,
        modal
    }
};
</script>

<style lang="scss">

</style>
