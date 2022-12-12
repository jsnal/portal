<template>
  <div class="container portal-body">
    <div id="projects-github-url-container">
      <a id="projects-github-url" :href="'https://github.com/jsnal/' + name" target="_blank">
        <span>Open on Github</span><i class="material-icons-outlined">public</i>
      </a>
    </div>
    <MarkdownBlock :rawMarkdown="rawMarkdown" />
  </div>
</template>

<script>
import MarkdownBlock from '../components/MarkdownBlock.vue';

export default {
  name: 'Project',
  components: {
    MarkdownBlock,
  },
  data() {
    return {
      name: this.$route.params.project,
      rawMarkdown: '',
    };
  },
  created() {
    document.title = "Project: " + this.name;
    fetch("https://raw.githubusercontent.com/jsnal/" + this.name + "/master/README.md")
      .then(data => data.text())
      .then((text) => {
        this.rawMarkdown = text;
      });
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

#projects-github-url>span {
  font-size: 14px;
  padding-right: 5px;
}
</style>
