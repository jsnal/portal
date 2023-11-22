<template>
  <div class="container">
    <div class="portal-body">
      <h1>Wiki Articles</h1>
      <p>{{ articles.length }} articles have been published</p>
      <WikiList :articles="articles" />
    </div>
  </div>
</template>

<script setup>
const articles = await queryContent('wiki')
    .only(['title', '_path', 'updated', 'tags'])
    .sort({ updated: 1 })
    .find();
</script>
