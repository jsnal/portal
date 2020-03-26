<template>
  <div id="notes-container" class="container">
    <div id="notes-github-url-container">
      <a id="notes-github-url" href="http://github.com/jsnal/notes" target="_blank">
        Open on Github 🔗
      </a>
    </div>
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
    this.getProjectMarkdown(`${NOTESURL}master.md`);
  },
};
</script>

<style>
#notes-github-url-container {
  text-align: center;
  margin-top: 1em;
}

#notes-github-url {
  color: #0000ff;
  font-size: 14px;
  text-decoration: none;
}

#notes-github-url:hover {
  opacity: 60%;
  transition: 0.15s;
  cursor: pointer;
}
</style>
