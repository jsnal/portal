<template>
  <div id="projects-home-container" class="container">
    <div class="portal-body">
      <h1>Wiki Articles</h1>
      <p>{{ articles.length }} found</p>
      <WikiList :articles="articles" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  async asyncData({ $content, params }) {
    const articles = await $content('wiki')
      .only(['title', 'slug', 'updatedAt', 'tags'])
      .sortBy('updatedAt', 'desc')
      .fetch();

    return { articles }
  },
};
</script>

<style scoped>

</style>
