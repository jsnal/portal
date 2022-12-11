<template>
  <div id="projects-home-container" class="container">
    <div class="portal-body">
      <h1>Projects</h1>
      <table id="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Git</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.name">
            <td data-column="Name">
              <router-link :to="'projects/' + project.name">
                {{ project.name }}
              </router-link>
            </td>
            <td data-column="Description">{{ project.description }}</td>
            <td data-column="Git">
              <a :href="'https://github.com/jsnal/' + project.name" target="_blank">
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
  data() {
    return {
      projects: [
        { name: 'i3wm', description: 'My linux configuration' },
        { name: 'paste-light', description: 'Lightweight paste system that is managed from the terminal' },
        { name: 'vim-serape', description: 'A bright and vivid vim colorscheme' },
        { name: 'portal', description: 'This website\'s code!' },
      ]
    };
  },
};
</script>

<style scoped></style>
