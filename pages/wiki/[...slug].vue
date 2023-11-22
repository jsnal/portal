<template>
    <ContentDoc v-slot="{ doc }">
        <article>
            <h1>{{ doc.title }}</h1>
            <ContentRenderer :value="doc" />
            <div id="article-metadata">
                <IconText class="updated-icon-container" icon="calendar_month">
                    <span>{{ formatDate(doc.updated) }}</span>
                </IconText>
                <IconText class="tags-icon-container" icon="sell">
                    <NuxtLink v-for="tag in doc.tags" :key="tag" :to="{ path: '/tags/' + tag }">
                        <span>{{ tag }}</span>
                    </NuxtLink>
                </IconText>
                <IconText class="updated-icon-container" icon="edit">
                    <a :href="'https://github.com/jsnal/portal/blob/master/content/' + doc._file" target="_blank">Edit</a>
                </IconText>
            </div>
        </article>
    </ContentDoc>
</template>

<script setup>
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en', options)
}
</script>

<style scoped>
#article-metadata {
  float: right;
  margin-bottom: 2rem;
}
</style>
