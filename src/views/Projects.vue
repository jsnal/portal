<template>
  <div id="projects-container" class="container">
    <div id="projects-github-url-container">
      <a id="projects-github-url" :href=projectUrl target="_blank">
        Open on Github 🔗
      </a>
    </div>
    <p v-html="projectHTML" class="markdown-body"></p>
  </div>
</template>

<script>
import { PROJECTURLS, MDCOMPILE } from '../data/constants';

export default {
  data() {
    return {
      projectHTML: '',
      projectUrl: '',
    };
  },
  methods: {
    getProjectUrl(targetProject) {
      Object.keys(PROJECTURLS).forEach(async (project) => {
        if (project === targetProject) {
          // Generate the Markdown from the markdown URL
          // this.getProjectMarkdown(PROJECTURLS[project][0]);
          this.projectHTML = await MDCOMPILE(PROJECTURLS[project][0]);

          // Set the project URL to the github repository
          // eslint-disable-next-line prefer-destructuring
          this.projectUrl = PROJECTURLS[project][1];
        }
      });
    },
  },
  created() {
    this.getProjectUrl(this.$route.params.project);
  },
};
</script>

<style>
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

.markdown-body {
  font-family: BlinkMacSystemFont,
               -apple-system,
               "Segoe UI",Roboto,
               Oxygen,Ubuntu,Cantarell,
               "Fira Sans","Droid Sans",
               "Helvetica Neue",Helvetica,
               Arial,sans-serifans-serif;
}
</style>
