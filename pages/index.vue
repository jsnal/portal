<template>
  <div class="portal-body">
    <h1>Jason Long</h1>
    <ul>
      <li>Computer Science Student at North Carolina State University.</li>
      <li>Specifically interested in Systems Engineering and Embedded Software.</li>
      <li>Also into all things music.</li>
      <li>See more <a href="/resume">here</a>.</li>
    </ul>
    <h2>Contact</h2>
    <ul>
      <li><a class="info-link" href="https://github.com/jsnal" target="_blank">Github</a></li>
      <li><a class="info-link" href="mailto:jasonlongball@gmail.com">Email</a></li>
    </ul>
    <h2>Recent Wiki Articles</h2>
    <WikiList :articles="articles" />
  </div>
</template>

<script>
export default {
  name: 'index',
  async asyncData({ $content, params }) {
    const articles = await $content('wiki')
      .only(['title', 'slug', 'gitUpdatedAt', 'tags'])
      .sortBy('gitUpdatedAt', 'desc')
      .limit(10)
      .fetch();

    return { articles }
  },
}
</script>

