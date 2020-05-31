import { NotesService } from '@/common/api';

const groupSize = 3;

const state = {
  notes: [],
  notesFetched: false,
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
    state.displayNotes = [];

    NotesService.getAll()
      .then(({ data }) => {
        commit('setNotes', data);
        actions.setDisplayNotes(null, 0);
        state.notesFetched = true;
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  setDisplayNotes(_state, group) {
    const start = Number(group) * groupSize;
    const localGroup = state.notes.slice(start, start + groupSize);
    if (localGroup.length) {
      state.displayNotes.push(...localGroup);
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
