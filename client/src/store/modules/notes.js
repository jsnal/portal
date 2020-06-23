import { NotesService } from '@/common/api';

const state = {
  notes: [],
  masterTags: [],
  filteredTags: [],
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
      const subNotes = await NotesService.getByGroup(state.group, perGroup);
      state.notes.push(...subNotes.data);
      state.group += 1;
    }
  },
  async getTags({ commit }) {
    await NotesService.getTags()
      .then(({ data }) => {
        commit('setMasterTags', data);
        commit('setFilteredTags', data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getByTags({ commit }, tag) {
    await NotesService.getByTags(tag)
      .then(({ data }) => {
        commit('setMasterTags', data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  filterTags({ commit }, keyword) {
    const filterTags = [];
    state.masterTags.forEach((tag) => {
      if (tag._id.indexOf(keyword) > -1) {
        filterTags.push(tag);
      }
    });

    commit('setFilteredTags', filterTags);
  },
};

const mutations = {
  setNotesCount(_state, count) {
    _state.notesCount = count;
  },
  setNotes(_state, notes) {
    _state.notes = notes;
  },
  setMasterTags(_state, masterTags) {
    _state.masterTags = masterTags;
  },
  setFilteredTags(_state, filteredTags) {
    _state.filteredTags = filteredTags;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
