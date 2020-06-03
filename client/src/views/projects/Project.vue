<template>
  <div id="projects-container" class="container">
    <div id="projects-github-url-container">
      <a id="projects-github-url" :href=projectUrl target="_blank">
        Open on Github
        <i class="bx bx-link"></i>
      </a>
    </div>
    <p v-html="projectHTML" class="markdown-body"></p>
  </div>
</template>

<script>
import { MDCOMPILE } from '../../constants';

export default {
  data() {
    return {
      projectHTML: '',
      projectUrl: '',
    };
  },
  methods: {
    async getProjectUrl(project) {
      // Generate the Markdown from the markdown URL
      this.projectHTML = await MDCOMPILE(this.$store.getters.getProjectRaw(project));

      // Set the project URL to the github repository
      // eslint-disable-next-line prefer-destructuring
      this.projectUrl = this.$store.getters.getProjectHub(project);
    },
  },
  created() {
    const routeProject = this.$route.params.project;
    const shouldRedirect = !this.$store.getters.getProjectsName.includes(routeProject);

    if (shouldRedirect) {
      this.$router.push('/projects');
    } else {
      this.getProjectUrl(routeProject);
    }
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
