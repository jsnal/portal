<template>
  <div id="notes-container" class="container">
    <div id="notes-github-url-container">
      <a id="notes-github-url" :href="noteUrl" target="_blank">
        Open on Github 🔗
      </a>
    </div>
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
  methods: {
    async displayNote() {
      if (Object.keys(this.$route.params).length === 0
          && this.$route.params.constructor === Object) {
        this.noteUrl = `${NOTESURL}master.md`;
      } else {
        this.noteUrl = `${NOTESURL}${this.$route.params.category}/${this.$route.params.pathMatch}`;
      }

      this.noteHTML = await MDCOMPILE(this.noteUrl);
    },
  },
  async created() {
    await this.displayNote();
  },
  watch: {
    $route() {
      this.displayNote();
    },
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
