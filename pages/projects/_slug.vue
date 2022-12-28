<template>
  <article>
    <h1>{{ project.title }}</h1>
    <div id="project-info">
      <h5>Project Information</h5>
      <div class="portal-icon-container">
        <span class="portal-icon material-icons-outlined">calendar_month</span>
        <span class="portal-icon-text" :title="github_data.pushed_at">
          Updated {{ formatDate(github_data.pushed_at) }}
        </span>
      </div>
      <div class="portal-icon-container">
        <span class="portal-icon material-icons-outlined">code</span>
        <span class="portal-icon-text">{{ github_data.language }}</span>
      </div>
      <div class="portal-icon-container">
        <span class="portal-icon material-icons-outlined">storage</span>
        <span class="portal-icon-text">{{ github_data.size }} bytes</span>
      </div>
      <div class="portal-icon-container">
        <span class="portal-icon material-icons-outlined">source</span>
        <a class="portal-icon-text" :href="'https://github.com/jsnal/' + project.title">Source Code</a>
      </div>
    </div>
    <nuxt-content :document="project" />
    <div id="project-metadata">
      <div class="portal-icon-container">
        <span class="portal-icon project-icon material-icons-outlined">calendar_month</span>
        <span class="portal-icon-text project-icon-text" :title="project.updatedAt">
          Updated {{ formatDate(project.updatedAt) }}
        </span>
      </div>
      <div class="portal-icon-container">
        <span class="portal-icon project-icon material-icons-outlined">sell</span>
        <span class="portal-icon-text project-tag project-icon-text" v-for="tag in project.tags" :key="tag">
          {{ tag }}
        </span>
      </div>
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

#project-metadata .portal-icon-text {
  font-size: .8rem;
  font-style: italic;
  color: #777676;
}

#project-metadata .project-icon {
  font-size: 1.2rem;
  padding-right: 0.2rem;
  color: #777676;
}

.project-tag {
  margin-right: 5px;
}

@media only screen and (max-width: 768px) {
  #project-info {
    width: 100%;
    padding: 0;
    margin-bottom: 1.25rem;
  }
}
</style>
