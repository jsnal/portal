<template>
  <table>
    <tr>
      <th>Artist</th>
      <th>Album</th>
      <th>Label</th>
      <th>Genre</th>
      <th>Release Date</th>
    </tr>
    <tr v-for="record in recordData" :key=record.album>
      <td>{{  record.artist }}</td>
      <td>{{  record.album }}</td>
      <td>{{  record.label }}</td>
      <td>{{  record.genre.toString() }}</td>
      <td>{{  record.release }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    recordData: [Array],
  },
  created() {
    console.log(this.recordData);
  },
};
</script>
