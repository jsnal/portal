<template>
  <div class="container">
    <div class="portal-body">
      <h1>Wiki Articles</h1>
      <p>{{ articles.length }} articles have been published</p>
      <input type="text" id="tags-search" placeholder="Search Articles..."
          v-on:keyup="filterArticles($event.target.value)" />
      <WikiList :articles="filteredArticles" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const articles = await queryContent('wiki')
    .only(['title', '_path', 'updated', 'tags'])
    .sort({ updated: 1 })
    .find();

const filteredArticles = ref(articles);

function filterArticles(keyword) {
    this.filteredArticles = [];
    this.articles.forEach(article => {
        if (article.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
            this.filteredArticles.push(article);
        }
    });
}
</script>
