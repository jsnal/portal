import { NotesService } from '@/common/api';

const state = {
  notes: {},
  notesCount: 0,
};

const getters = {
  notes(_state) {
    return _state.notes;
  },
  notesCount(_state) {
    return _state.notesCount;
  },
};

const actions = {
  updateCount({ commit }) {
    NotesService.getCount()
      .then(({ data }) => {
        commit('setNotesCount', data.notes);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};

const mutations = {
  setNotesCount(_state, count) {
    _state.notesCount = count;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
