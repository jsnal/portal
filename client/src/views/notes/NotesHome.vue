<template>
  <div class="container">
    <h1>Notes Home</h1>
  </div>
</template>

<script>
export default {
  name: 'NotesHome',
  mounted() {
    this.$http.get('http://localhost:3000/ping').then(response => console.log(response));
  },
};
</script>
<style></style>
