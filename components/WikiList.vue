<template>
    <div id="wiki-table">
        <List :rows="articles" :columns="columns">
            <tr v-for="article in articles" :key="article.slug">
                <td data-column="Title">
                    <NuxtLink :to="{ path: article._path }">
                    {{ article.title }}
                    </NuxtLink>
                </td>
                <td data-column="Tags" class="portal-td-hide">
                    <IconText class="tags-icon-container" icon="sell">
                        <NuxtLink v-for="tag in article.tags" :key="tag"
                                  :to="{ path: 'tags/' + tag }">
                            <span>{{ tag }}</span>
                        </NuxtLink>
                    </IconText>
                </td>
                <td data-column="Updated" class="portal-td-hide">
                    <IconText class="updated-icon-container" icon="calendar_month">
                        <span>{{ formatDate(article.updated) }}</span>
                    </IconText>
                </td>
            </tr>
        </List>
    </div>
</template>

<script setup>
import IconText from './IconText.vue';
import List from './List.vue';

defineProps(['articles']);

const columns = [
    { name: 'Title', hide: false },
    { name: 'Tags', hide: true },
    { name: 'Updated', hide: true }
];

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en', options);
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
