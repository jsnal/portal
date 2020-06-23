<template>
  <div class="container">
    <div class="portal-body">
      <div class="portal-list-header">
        <h1>Notes</h1>
        <p><span>{{ notesCount }}</span> notes have been published</p>
      </div>
      <notes-list/>
    </div>
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
<style scoped></style>
