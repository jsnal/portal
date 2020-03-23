<template>
  <div id="notes-container" class="container">
    <p v-html="noteHTML" class="markdown-body"></p>
  </div>
</template>

<script>
import { NOTESURL } from '../data/constants';

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

export default {
  data() {
    return {
      noteHTML: '',
      noteUrl: '',
    };
  },
  methods: {
    getProjectMarkdown(url) {
      fetch(url)
        .then(data => data.text())
        .then((text) => {
          this.noteHTML = md.render(text);
        });
    },
  },
  created() {
    this.noteUrl = `${NOTESURL}${this.$route.params.category}/${this.$route.params.pathMatch}`;
    this.getProjectMarkdown(this.noteUrl);
  },
};
</script>

<style>
</style>
