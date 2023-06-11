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

<script>
export default {
    async asyncData({ $content, params }) {
        const tag = await $content('tags', params.slug).fetch()
        const articles = await $content('wiki')
            .only(['title', 'dir', 'slug', 'gitUpdatedAt', 'tags'])
            .where({ tags: { $contains: tag.name } })
            .sortBy('gitUpdatedAt', 'desc')
            .fetch();

        const books = await $content('books')
            .only(['title', 'dir', 'slug', 'gitUpdatedAt', 'tags'])
            .where({ tags: { $contains: tag.name } })
            .sortBy('gitUpdatedAt', 'desc')
            .fetch();

        const entries = [...articles, ...books]

        return { tag, entries }
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
#tag-description {
    font-size: 1.2rem;
}
</style>
