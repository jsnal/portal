<template>
    <div class="container">
        <div class="portal-body">
            <h1>Records</h1>
            <p>{{ records.length }} records in the collection</p>
            <div id="records-list">
                <Card v-for="record in records" :key="record.slug">
                    <img id="record-cover" slot="image" :src="record.cover" />
                    <div slot="body">
                        <IconText class="" icon="library_music">
                            {{ record.title }}
                        </IconText>
                        <IconText class="" icon="person">
                            {{ record.artist }}
                        </IconText>
                        <IconText class="" icon="calendar_month">
                            {{ record.year }}
                        </IconText>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import IconText from '../../components/IconText.vue';

export default {
    name: 'Tags',
    async asyncData({ $content, params }) {
        const records = await $content('records').fetch();

        return { records }
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

<style>
#record-cover {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

#records-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
}

.portal-card {
    margin-bottom: 1rem;
    width: 18rem;
}
</style>