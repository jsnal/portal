import Vue from 'vue';
import Vuex from 'vuex';

import projects from './modules/projects';
import notes from './modules/notes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    notes,
  },
});
