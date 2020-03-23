import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch(`getCharacters`);
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      
      if (bottomOfWindow && this.$store.state.endLoad) {
        this.$store.dispatch(`addCharacters`);
      }
    };

  }
}).$mount('#app');
