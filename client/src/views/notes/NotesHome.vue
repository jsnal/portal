<template>
  <div class="container">
    <div class="markdown-body">
      <h1>Notes: {{ notesCount }} notes found</h1>
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
  created() {
    this.$store.dispatch('updateCount');
  },
};
</script>
<style scoped></style>
