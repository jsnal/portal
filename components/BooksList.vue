<template>
    <table id="book-table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Rating</th>
                <th>Tags</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in books" :key="book.slug">
                <td data-column="Title">
                    {{ book.title }}
                </td>
                <td data-column="Author">
                    {{ book.author }}
                </td>
                <td data-column="Rating">
                    <StarRating :rating="book.rating" />
                </td>
                <td data-column="Tags">
                    <IconText class="tags-icon-container" icon="sell">
                        <NuxtLink v-for="tag in book.tags" :key="tag"
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
    name: 'BooksList',
    components: { IconText },
    props: {
        'books': Array
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
