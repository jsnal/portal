<template>
  <div class="container">
    <div class="portal-body">
      <h1 id="note-title">Notes</h1>
      <p id="note-count"><span>{{ notesCount }}</span> notes have been published</p>
    </div>
    <notes-list/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NotesList from '../../components/notes/NotesList.vue';

export default {
  name: 'NotesHome',
  components: {
    NotesList,
  },
  computed: mapState({
    notesCount: state => state.notes.notesCount,
  }),
};
</script>
<style scoped>
#note-title {
  margin-bottom: .2em;
}

#note-count {
  margin: 0;
}

#note-count span {
  font-weight: bold;
}
</style>
