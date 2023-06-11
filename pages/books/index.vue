<template>
  <div class="container">
    <div class="portal-body">
      <h1>Books</h1>
      <p>{{ books.length }} books have been read</p>
      <BooksList :books="books" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Books',
  async asyncData({ $content, params }) {
    const books = await $content('books')
      .sortBy('gitUpdatedAt', 'desc')
      .fetch();

    return { books }
  },
};
</script>

<style scoped>

</style>
