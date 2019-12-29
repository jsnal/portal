<template>
  <div id="projects-container">
    <p v-html="projectHTML"></p>
  </div>
</template>

<script>
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

export default {
  data() {
    return {
      projectHTML: '',
      projectNameUrl: {
        i3wm: 'https://raw.githubusercontent.com/jsnal/i3wm/master/README.md',
        'paste-light': 'https://raw.githubusercontent.com/jsnal/paste-light/master/README.md',
      },
    };
  },
  methods: {
    getProjectUrl(targetProject) {
      Object.keys(this.projectNameUrl).forEach((project) => {
        if (project === targetProject) {
          console.log(this.projectNameUrl[project]);
          this.getProjectMarkdown(this.projectNameUrl[project]);
        }
      });
    },
    getProjectMarkdown(url) {
      // const projectContainer = document.getElementById('projects-container');

      fetch(url)
        .then(data => data.text())
        .then((text) => {
          // projectContainer.innerHTML = md.render(text);
          this.projectHTML = md.render(text);
        });
    },
  },
  created() {
    this.getProjectUrl(this.$route.params.project);
  },
  watch: {
    $route() {
      this.getProjectUrl(this.$route.params.project);
    },
  },
};
</script>

<style>
#projects-container {
  display: table-cell;
  vertical-align: top;
  padding-left: 2em;
}
</style>
