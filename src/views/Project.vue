<template>
  <div class="container portal-body">
    <div id="projects-github-url-container">
      <a id="projects-github-url" :href="'https://github.com/jsnal/' + name" target="_blank">
        <span>Open on Github</span><i class="material-icons-outlined">public</i>
      </a>
    </div>
    <div v-html="projectHTML"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$route.params.project,
      projectHTML: '',
      projectUrl: '',
    };
  },
  methods: {
    async getProjectUrl(project) {
      // Generate the Markdown from the markdown URL
      // this.projectHTML = await MDCOMPILE(this.$store.getters.getProjectRaw(project));

      // Set the project URL to the github repository
      // eslint-disable-next-line prefer-destructuring
      // this.projectUrl = this.$store.getters.getProjectHub(project);
    },
  },
};
</script>

<style>
#projects-github-url-container {
  margin-top: 1em;
}

#projects-github-url {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0000ff;
  text-decoration: none;
  font-style: italic;
}

#projects-github-url:hover {
  opacity: 60%;
  transition: 0.15s;
  cursor: pointer;
}

#projects-github-url > span {
  text-size: 14px;
  padding-right: 5px;
}
</style>
