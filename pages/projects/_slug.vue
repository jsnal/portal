<template>
  <article>
    <h1>{{ project.title }}</h1>
    <div id="project-info">
      <h5>Project Information</h5>
      <IconText icon="calendar_month">
        <span :title="github_data.pushed_at">
          Updated {{ formatDate(github_data.pushed_at) }}
        </span>
      </IconText>
      <IconText icon="code">
        <span>{{ github_data.language }}</span>
      </IconText>
      <IconText icon="storage">
        <span>{{ github_data.size }} bytes</span>
      </IconText>
      <IconText icon="source">
        <a :href="'https://github.com/jsnal/' + project.title">Source Code</a>
      </IconText>
    </div>
    <nuxt-content :document="project" />
    <div id="project-metadata">
      <IconText class="updated-icon-container" icon="calendar_month">
        <span>{{ formatDate(project.gitUpdatedAt) }}</span>
      </IconText>

      <IconText class="tags-icon-container" icon="sell">
        <NuxtLink v-for="tag in project.tags" :key="tag" to="#">
          <span>{{ tag }}</span>
        </NuxtLink>
      </IconText>
    </div>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const project = await $content('projects', params.slug).fetch()
    const github_data = await fetch("https://api.github.com/repos/jsnal/" + project.title)
      .then((response) => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
      });
    return { project, github_data }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<style scoped>
#project-info {
  float: right;
  position: relative;
  z-index: 10;
  width: 30%;
  padding: .2rem .5rem;
  background: #f1f1f1;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
}

#project-info li {
  font-size: 0.8rem;
}

.project-info-dates {
  font-style: italic;
}

#project-info h5 {
  text-align: center;
}

#project-metadata {
  float: right;
  margin-bottom: 2rem;
}

@media only screen and (max-width: 768px) {
  #project-info {
    width: 100%;
    padding: 0;
    margin-bottom: 1.25rem;
  }
}
</style>
