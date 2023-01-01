<template>
    <table id="wiki-table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Updated</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="article in articles" :key="article.slug">
                <td data-column="Title">
                    <NuxtLink :to="{ name: 'wiki-slug', params: { slug: article.slug } }">
                        {{ article.title }}
                    </NuxtLink>
                </td>
                <td data-column="Tags">
                    <IconText class="tags-icon-container" icon="sell">
                        <NuxtLink v-for="tag in article.tags" :key="tag"
                            :to="{ name: 'tags-slug', params: { slug: tag } }">
                            <span>{{ tag }}</span>
                        </NuxtLink>
                    </IconText>
                </td>
                <td data-column="Updated">
                    <IconText class="updated-icon-container" icon="calendar_month">
                        <span>{{ formatDate(article.updatedAt) }}</span>
                    </IconText>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import IconText from './IconText.vue';
export default {
    name: 'WikiList',
    components: { IconText },
    props: {
        'articles': Array
    },
    methods: {
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        }
    }
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