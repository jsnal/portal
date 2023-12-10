<template>
    <div class="container">
        <div class="portal-body">
            <h1>Tags</h1>
            <p>{{ tags.length }} unique tags have been found</p>
            <input type="text" id="tags-search" placeholder="Search Tags..."
                v-on:keyup="filterTags($event.target.value)" />
            <List :rows="filteredTags" :columns="columns">
                <tr v-for="tag in filteredTags" :key="tag.slug">
                    <td data-column="Name">
                        <NuxtLink :to="{ path: 'tags/' + tag.name }">
                            {{ tag.name }}
                        </NuxtLink>
                    </td>
                    <td data-column="Count">
                        {{ tag.count }}
                    </td>
                </tr>
            </List>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

useHead({
    title: 'Portal - Tags'
});

const tags = await queryContent('tags')
    .only(['name', 'description', '_path'])
    .find();

for (let tag in tags) {
    const articles = await queryContent('wiki')
        .only(['title'])
        .where({ tags: { $contains: tags[tag].name } })
        .find();

    tags[tag].count = articles.length;
}

const filteredTags = ref(tags);

const columns = [
    { name: 'Name', hide: false },
    { name: 'Count', hide: false },
];

function filterTags(keyword) {
    this.filteredTags = [];
    this.tags.forEach(tag => {
        if (tag.name.indexOf(keyword) > -1) {
            this.filteredTags.push(tag);
        }
    });
}
</script>
