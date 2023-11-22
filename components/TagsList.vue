<template>
    <div id="tags-table">
        <List :rows="entries" :columns="columns">
            <tr v-for="entry in entries" :key="entry.slug">
                <td data-column="Title">
                    <NuxtLink :to="{ path: entry._path }" >
                        {{ entry.title }}
                    </NuxtLink>
                </td>
                <td data-column="Tags" class="portal-td-hide">
                    <IconText class="tags-icon-container" icon="sell">
                        <NuxtLink v-for="tag in entry.tags" :key="tag"
                            :to="{ name: 'tags-slug', params: { slug: tag } }">
                            <span>{{ tag }}</span>
                        </NuxtLink>
                    </IconText>
                </td>
            </tr>
        </List>
    </div>
</template>

<script setup>
import IconText from './IconText.vue';

defineProps(['entries']);

const columns = [
    { name: 'Title', hide: false },
    { name: 'Tags', hide: true },
];
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
