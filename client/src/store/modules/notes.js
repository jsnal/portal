import { NotesService } from '@/common/api';

const groupSize = 2;

const state = {
  notes: [],
  displayNotes: [],
  notesCount: 0,
  group: 1,
};

const getters = {
  notes(_state) {
    return _state.notes;
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
  setAllNotes({ commit }) {
    NotesService.getAll()
      .then(({ data }) => {
        commit('setNotes', data);

        actions.setDisplayNotes(null, 0);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  setDisplayNotes(_state, group) {
    const start = Number(group) * groupSize;
    state.displayNotes.push(...state.notes.slice(start, start + groupSize));
  },
};

const mutations = {
  setNotesCount(_state, count) {
    _state.notesCount = count;
  },
  setNotes(_state, notes) {
    _state.notes = notes;
  },
  setGroup(_state, group) {
    _state.group = group;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
