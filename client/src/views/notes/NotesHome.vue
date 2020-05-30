<template>
  <div class="container">
    <div class="markdown-body">
      <h1>Notes</h1>
    </div>
    <notes-list/>
  </div>
</template>

<script>
import NotesList from '../../components/notes/NotesList.vue';

export default {
  name: 'NotesHome',
  components: {
    NotesList,
  },
};
</script>
<style scoped></style>
