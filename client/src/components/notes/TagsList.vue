<template>
  <div>
    <notes-table :notes=notes />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NotesTable from './NotesTable.vue';

export default {
  name: 'TagsList',
  components: {
    NotesTable,
  },
  computed: mapState({
    notes: state => state.notes.masterTags,
  }),
  async created() {
    await this.$store.dispatch('getByTags', this.$route.params.tag);
  },
  watch: {
    async $route(to) {
      await this.$store.dispatch('getByTags', to.params.tag);
    },
  },
};
</script>
