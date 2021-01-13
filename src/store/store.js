import Vue from 'vue';
import Vuex from 'vuex';
import Loader from '../data/loader';
import { mockCharacters } from '../data/mock';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    characters: [],
    filter: '',
    nextPage: ``,
    hideModal: true,
    character: { name },
    endLoad: true,
    wait: 2000,
    currentColorAvatar: `#ffffff`
  },
  getters: {
    filter(state) {
      return state.filter;
    },
    loading(state) {
      return state.loading;
    },
    characters(state) {
      return state.characters;
    },
    nextPage(state) {
      return state.nextPage;
    },
    hideModal(state) {
      return state.hideModal;
    },
    character(state) {
      return state.character;
    },
    endLoad(state) {
      return state.onLoad;
    },
    wait(state) {
      return state.wait;
    },
    currentColorAvatar(state) {
      return state.currentColorAvatar;
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;              
    },
    setCharacters(state, payload) {
      state.characters = payload;
    },
    addCharacters(state, payload) {
      state.characters = state.characters.concat(payload);
    },
    setNextPage(state, payload) {
      state.nextPage = payload;
    },
    setfilter(state, payload) {
      state.filter = payload;
    },
    toggleModal(state, payload) {
      state.hideModal = payload;
    },
    setCharacter(state, payload) {
      state.character = {
        "name": payload.name,
        "birth_year": payload.birth_year,
        "species": payload.species,
        "gender": payload.gender,
        "homeworld": payload.homeworld,
        "films": payload.films
      };
    },
    endLoad(state, payload) {
      state.endLoad = payload;      
    },
    setWait(state, payload) {
      state.wait = payload;
    },
    setColor(state, payload) {
      state.currentColorAvatar = payload;
    }
  },

  actions: {
    toggleModal({ commit }, payload) {
      commit(`toggleModal`, payload);
    },
    onLoad({ commit, state, dispatch }) {
      commit('setLoading', true);
      if (state.endLoad) {
        commit('setLoading', false);
        commit(`setWait`, 2000);
        return;
      }
      setTimeout(() => {
        commit(`setWait`, 500);
        dispatch('onLoad');
      }
        , state.wait);
    },
    async getCharacters({ commit, dispatch }, payload) {
      commit(`setfilter`, payload);
      commit(`endLoad`, false);
      dispatch(`onLoad`);
      try {
        const res = await Loader.loadData(payload);
        const species = res.results.map((item) => item.species.length > 0 ? Loader.load(item.species) : Promise.resolve(``));                
        const speciesArray = await Promise.all(species);        
        for(let i = 0; i<speciesArray.length; i++) {
          res.results[i].species = speciesArray[i].name;
        }
        commit('setCharacters', res.results);
        if (!payload) commit(`setNextPage`, res.next);
      } finally {
        commit(`endLoad`, true);
      }
    },
    async getFakeCharacters({commit, dispatch}, payload) {
      commit(`setfilter`, payload);
      commit(`endLoad`, false);
      dispatch(`onLoad`);
      try {
        const res = Object.assign(mockCharacters);
        const species = res.results.map((item) => item.species.length > 0 ? Loader.load(item.species) : Promise.resolve(``));                
        const speciesArray = await Promise.all(species);        
        for(let i = 0; i<speciesArray.length; i++) {
          res.results[i].species = speciesArray[i].name;
        }
        commit('setCharacters', res.results);
        if (!payload) commit(`setNextPage`, res.next);
      } finally {
        commit(`endLoad`, true);
      }
    },
    async addCharacters({ commit, dispatch, getters, state }) {
      if (state.nextPage === null || getters.filter) return;
      commit(`endLoad`, false);
      dispatch(`onLoad`);
      try {
        const res = await Loader.load(state.nextPage);
        const species = res.results.map((item) => item.species.length > 0 ? Loader.load(item.species) : Promise.resolve(``));
        const speciesArray = await Promise.all(species);
        for(let i = 0; i<speciesArray.length; i++) {
          res.results[i].species = speciesArray[i].name;
        }
        commit(`setNextPage`, res.next);
        commit('addCharacters', res.results);
      } finally {
        commit(`endLoad`, true);
      }
    },
    async getCharacter({ commit }, character) {
      commit(`endLoad`, false);
      commit('setLoading', true);
      try {
        const res = await Loader.load(character);
        const details = res.films.map((filmUrl) => Loader.load(filmUrl));
        details.push(res.species.length > 0 ? Loader.load(res.species) : Promise.resolve(``));
        details.push(res.homeworld.length > 0 ? Loader.load(res.homeworld) : Promise.resolve(``));
        let resultDetails = await Promise.all(details);
        res.films = [];
        resultDetails.forEach((elem) => {
          if (elem.title) res.films.push(elem.title);
        });
        res.species = resultDetails[resultDetails.length - 2].name;
        res.homeworld = resultDetails[resultDetails.length - 1].name;
        commit(`setCharacter`, res);
      } catch (e) {
        throw new Error(e.message);
      } finally {
        commit(`endLoad`, true);
        commit('setLoading', false);
      }
    },
    setCurrentColorAvatar({ commit }, payload) {
      commit(`setColor`, payload);
    }
  }
});
