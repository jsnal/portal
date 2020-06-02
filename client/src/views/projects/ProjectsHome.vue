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
          <tr v-for="(project, name) in projects" :key="project.desc">
            <td data-column="Name">
              <router-link :to="'projects/' + name">
                {{ name }}
              </router-link>
            </td>
            <td data-column="Description">{{ project.desc }}</td>
            <td data-column="Git">
              <a :href=project.hub target="_blank">
                <span class="icon bx bxl-git"></span>
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
  data() {
    return {
      projects: this.$store.getters.getProjects,
    };
  },
};
</script>

<style scoped></style>
