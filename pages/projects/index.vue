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
          <tr v-for="project in projects" :key="project.title">
            <td data-column="Title">
              <router-link :to="'projects/' + project.title">
                {{ project.title }}
              </router-link>
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
      .only(['title', 'description', 'tags'])
      .sortBy('createdAt', 'asc')
      .fetch();

    return { projects }
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped></style>
