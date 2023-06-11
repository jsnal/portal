<template>
    <table id="tags-table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Tags</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in entries" :key="entry.slug">
                <td data-column="Title">
                    <NuxtLink :to="{ name: 'wiki-slug', params: { slug: entry.slug } }" v-if="entry.dir === '/wiki'">
                        {{ entry.title }}
                    </NuxtLink>
                    <NuxtLink :to="{ name: 'books' }" v-else-if="entry.dir === '/books'">
                        {{ entry.title }}
                    </NuxtLink>
                </td>
                <td data-column="Tags">
                    <IconText class="tags-icon-container" icon="sell">
                        <NuxtLink v-for="tag in entry.tags" :key="tag"
                            :to="{ name: 'tags-slug', params: { slug: tag } }">
                            <span>{{ tag }}</span>
                        </NuxtLink>
                    </IconText>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import IconText from './IconText.vue';
export default {
    name: 'TagsList',
    components: { IconText },
    props: {
        'entries': Array
    },
}
</script>

<style>
.tags-icon-container .portal-icon,
.updated-icon-container .portal-icon {
    color: #777676;
    font-size: 1.3rem;
}

.tags-icon-container .portal-icon-text a {
    font-style: italic;
    margin-right: 0.4rem;
    font-size: 0.9rem;
}

.updated-icon-container .portal-icon-text {
    font-style: italic;
    font-size: 0.9rem;
    color: #777676;
}
</style>
