<template>
  <div class="container portal-body">
    <div class="markdown-body">
      <h1>Jason Long</h1>
      <ul>
        <li>Rising Computer Science student at North Carolina State University.</li>
        <li>Open source software lover and user.</li>
        <li>See more <a href="/resume.pdf">here</a>.</li>
      </ul>
      <h2>Contact</h2>
      <ul>
        <li><a class="info-link" href="https://github.com/jsnal" target="_blank">Github</a></li>
        <li><a class="info-link" href="mailto:jasonlongball@gmail.com">Email</a></li>
      </ul>
      <h1>Recent Notes</h1>
      <notes-list/>
    </div>
  </div>
</template>

<script>
import NotesList from '../components/notes/NotesList.vue';

export default {
  name: 'jasonlong',
  components: {
    NotesList,
  },
};
</script>

<style scoped></style>
