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
  }
};

export default {
  state,
  getters,
};
