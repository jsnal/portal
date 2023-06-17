<template>
    <div id="wiki-table">
        <List :rows="articles" :columns="columns">
            <template>
                <tr v-for="article in articles" :key="article.slug">
                    <td data-column="Title">
                        <NuxtLink :to="{ name: 'wiki-slug', params: { slug: article.slug } }">
                            {{ article.title }}
                        </NuxtLink>
                    </td>
                    <td data-column="Tags" class="portal-td-hide">
                        <IconText class="tags-icon-container" icon="sell">
                            <NuxtLink v-for="tag in article.tags" :key="tag"
                                :to="{ name: 'tags-slug', params: { slug: tag } }">
                                <span>{{ tag }}</span>
                            </NuxtLink>
                        </IconText>
                    </td>
                    <td data-column="Updated" class="portal-td-hide">
                        <IconText class="updated-icon-container" icon="calendar_month">
                            <span>{{ formatDate(article.gitUpdatedAt) }}</span>
                        </IconText>
                    </td>
                </tr>
            </template>
        </List>
    </div>
</template>

<script>
import IconText from './IconText.vue';
import List from './List.vue';

export default {
    name: 'WikiList',
    components: { IconText, List },
    props: {
        'articles': Array
    },
    data() {
        const columns = [
            { name: 'Title', hide: false },
            { name: 'Tags', hide: true },
            { name: 'Updated', hide: true }
        ];

        return { columns }
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
