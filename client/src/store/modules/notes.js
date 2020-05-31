import { NotesService } from '@/common/api';

const state = {
  notes: [],
  notesCount: 0,
  group: 1,
};

const getters = {
  notes(_state) {
    return _state.notes;
  },
};

const actions = {
  async updateCount({ commit }) {
    await NotesService.getCount()
      .then(({ data }) => {
        commit('setNotesCount', data.notes);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getNextGroup(_state, perGroup) {
    if (state.group <= Math.ceil(state.notesCount / perGroup)) {
      console.log('getting next group');
      const subNotes = await NotesService.getByGroup(state.group, perGroup);
      state.notes.push(...subNotes.data.notes);
      state.group += 1;
    }
  },
};

const mutations = {
  setNotesCount(_state, count) {
    _state.notesCount = count;
  },
  setNotes(_state, notes) {
    _state.notes = notes;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
