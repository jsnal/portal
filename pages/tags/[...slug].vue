<template>
    <article>
        <h1>
            {{ tag.name }}:
            <span id="tag-description">{{ tag.description }}</span>
        </h1>
        Showing <strong>{{ entries.length }}</strong> entries for <i>{{ tag.name }}</i>
        <TagsList :entries="entries" />
    </article>
</template>

<script setup>
const route = useRoute();

const tag = await queryContent(route.path).findOne();
const entries = await queryContent('wiki')
    .only(['title', '_path', 'updated', 'tags'])
    .where({ tags: { $contains: tag.name } })
    .sort({ updated: 1 })
    .find();

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en', options)
}
</script>

<style scoped>
#tag-description {
    font-size: 1.2rem;
}
</style>
