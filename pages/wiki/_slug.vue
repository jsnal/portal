<template>
  <article>
    <h1>{{ article.title }}</h1>
    <nuxt-content :document="article" />
    <div id="article-metadata">
      <IconText class="updated-icon-container" icon="calendar_month">
        <span>{{ formatDate(article.updatedAt) }}</span>
      </IconText>
      <IconText class="tags-icon-container" icon="sell">
        <NuxtLink v-for="tag in article.tags" :key="tag" :to="{ name: 'tags-slug', params: { slug: tag } }">
          <span>{{ tag }}</span>
        </NuxtLink>
      </IconText>
    </div>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('wiki', params.slug).fetch()
    return { article }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<style scoped>
#article-metadata {
  float: right;
  margin-bottom: 2rem;
}
</style>
