<template>
    <div class="container">
        <div class="portal-body">
            <h1>Tags</h1>
            <p>{{ tags.length }} unique tags have been found</p>
            <input type="text" id="tags-search" placeholder="Search Tags..."
                v-on:keyup="filterTags($event.target.value)" />

            <List :rows="filteredTags" :columns="columns">
                <template>
                    <tr v-for="tag in filteredTags" :key="tag.slug">
                        <td data-column="Name">
                            <NuxtLink :to="{ name: 'tags-slug', params: { slug: tag.slug } }">
                                {{ tag.name }}
                            </NuxtLink>
                        </td>
                        <td data-column="Count">
                            {{ tag.count }}
                        </td>
                    </tr>
                </template>
            </List>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tags',
    async asyncData({ $content, params }) {
        const tags = await $content('tags')
            .only(['name', 'description', 'slug'])
            .fetch();

        for (let tag in tags) {
            const articles = await $content('wiki')
                .only(['title'])
                .where({ tags: { $contains: tags[tag].name } })
                .fetch();

            const books = await $content('books')
                .only(['title'])
                .where({ tags: { $contains: tags[tag].name } })
                .fetch();

            tags[tag].count = articles.length + books.length;
        }

        const filteredTags = tags;

        return { filteredTags, tags }
    },
    data() {
        const columns = [
            { name: 'Name', hide: false },
            { name: 'Count', hide: false },
        ];

        return { columns }
    },
    methods: {
        filterTags(keyword) {
            this.filteredTags = [];
            this.tags.forEach(tag => {
                if (tag.name.indexOf(keyword) > -1) {
                    this.filteredTags.push(tag);
                }
            });
        }
    }
};
</script>
