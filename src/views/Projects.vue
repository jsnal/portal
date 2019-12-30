<template>
  <div id="projects-container">
    <div id="projects-github-url-container">
      <a id="projects-github-url" :href=projectUrl target="_blank">
        Open on Github 🔗
      </a>
    </div>
    <p v-html="projectHTML" class="markdown-body"></p>
  </div>
</template>

<script>
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

const projectNameUrls = {
  i3wm: [
    'https://raw.githubusercontent.com/jsnal/i3wm/master/README.md',
    'https://github.com/jsnal/i3wm/',
  ],
  'paste-light': [
    'https://raw.githubusercontent.com/jsnal/paste-light/master/README.md',
    'https://github.com/jsnal/paste-light',
  ],
  'vim-serape': [
    'https://raw.githubusercontent.com/jsnal/vim-serape/master/README.md',
    'https://github.com/jsnal/vim-serape',
  ],
  abbs: [
    'https://raw.githubusercontent.com/jsnal/abbs/master/README.md',
    'https://github.com/jsnal/abbs',
  ],
};

export default {
  data() {
    return {
      projectHTML: '',
      projectUrl: '',
    };
  },
  methods: {
    getProjectUrl(targetProject) {
      Object.keys(projectNameUrls).forEach((project) => {
        if (project === targetProject) {
          // Generate the Markdown from the markdown URL
          this.getProjectMarkdown(projectNameUrls[project][0]);

          // Set the project URL to the github repository
          // eslint-disable-next-line prefer-destructuring
          this.projectUrl = projectNameUrls[project][1];
        }
      });
    },
    getProjectMarkdown(url) {
      fetch(url)
        .then(data => data.text())
        .then((text) => {
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
  padding: 0 10%;
}

#projects-github-url-container {
  text-align: center;
  margin-top: 1em;
}

#projects-github-url {
  color: #0000ff;
  font-size: 14px;
  text-decoration: none;
}

#projects-github-url:hover {
  opacity: 60%;
  transition: 0.15s;
  cursor: pointer;
}
</style>
