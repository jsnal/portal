<template>
  <div id="notes-container" class="container">
    <p v-html="noteHTML" class="markdown-body"></p>
  </div>
</template>

<script>
import { NOTESURL, MDCOMPILE } from '../data/constants';

export default {
  data() {
    return {
      noteHTML: '',
      noteUrl: '',
    };
  },
  methods: {},
  async created() {
    this.noteUrl = `${NOTESURL}${this.$route.params.category}/${this.$route.params.pathMatch}`;
    this.noteHTML = await MDCOMPILE(this.noteUrl);
  },
};
</script>

<style>
</style>
