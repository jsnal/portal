<template>
  <div class="container">
    <div class="portal-body">
      <div class="portal-list-header">
        <h1>Tags</h1>
        <p><span>{{ tags.length }}</span> unique tags have been found</p>
        <input
          type="text"
          id="tags-search"
          placeholder="Search Tags..."
          v-on:keyup="filterTags($event.target.value)"/>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag._id">
            <td data-column="Tag">
              <router-link :to="'/tags/' + tag._id">
                {{ tag._id }}
              </router-link>
            </td>
            <td data-column="Count">{{ tag.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TagsHome',
  methods: {
    filterTags(keyword) {
      this.$store.dispatch('filterTags', keyword);
    },
  },
  data() {
    return {
      tableTags: this.tags,
      keyword: null,
    };
  },
  computed: mapState({
    tags: state => state.notes.filteredTags,
  }),
  async created() {
    await this.$store.dispatch('getTags');
  },
};
</script>

<style scoped>
#tags-search {
  margin-top: .5em;
}
</style>
