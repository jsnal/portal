<template>
  <div class="container">
    <div class="portal-body">
      <h1>Wiki Articles</h1>
      <p>{{ articles.length }} articles have been published</p>
      <WikiList :articles="articles" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  async asyncData({ $content, params }) {
    const articles = await $content('wiki')
      .only(['title', 'slug', 'gitUpdatedAt', 'tags'])
      .sortBy('gitUpdatedAt', 'desc')
      .fetch();

    return { articles }
  },
};
</script>

<style scoped>

</style>
