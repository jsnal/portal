<template>
  <div id="projects-home-container" class="container">
    <div class="markdown-body">
      <h1>Projects</h1>
    </div>
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
              projects<span style="font-weight: bold">/{{ name }}</span>
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

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em auto;
}

/* Zebra striping */
tr:nth-of-type(odd) {
  background: #eee;
}

th {
  background: #000000;
  color: #ffffff;
  font-weight: bold;
}

td, th {
  padding: .5em;
  text-align: left;
  font-size: 16px;
}

@media
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {
  table {
    width: 100%;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr { border: 1px solid #ccc;  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-column);
    color: #000;
    font-weight: bold;
  }
}
</style>
