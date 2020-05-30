<template>
  <table id="projects-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Linux Command Line</td>
        <td>Created 05/01/20</td>
        <td>linux guide</td>
      </tr>
      <!-- <tr v&#45;for="(project, name) in projects" :key="project.desc"> -->
      <!--   <td data&#45;column="Name"> -->
      <!--     <router&#45;link :to="'projects/' + name"> -->
      <!--       projects<span style="font&#45;weight: bold">/{{ name }}</span> -->
      <!--     </router&#45;link> -->
      <!--   </td> -->
      <!--   <td data&#45;column="Description">{{ project.desc }}</td> -->
      <!--   <td data&#45;column="Git"> -->
      <!--     <a :href=project.hub target="_blank"> -->
      <!--       <span class="icon bx bxl&#45;git"></span> -->
      <!--     </a> -->
      <!--   </td> -->
      <!-- </tr> -->
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'NotesList',
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
</style>
