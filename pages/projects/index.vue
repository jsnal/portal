<template>
  <div id="projects-home-container" class="container">
    <div class="portal-body">
      <h1>Projects</h1>
      <table id="projects-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Git</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project of projects" :key="project.slug">
            <td data-column="Title">
              <NuxtLink :to="{ name: 'projects-slug', params: { slug: project.slug } }">
                {{ project.title }}
              </NuxtLink>
            </td>
            <td data-column="Description">{{ project.description }}</td>
            <td data-column="Git">
              <a :href="'https://github.com/jsnal/' + project.title" target="_blank">
                <span class="material-icons-outlined">source</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  async asyncData({ $content, params }) {
    const projects = await $content('projects')
      .only(['title', 'slug', 'description', 'tags'])
      .sortBy('gitUpdatedAt', 'desc')
      .fetch();

    return { projects }
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
