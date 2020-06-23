<template>
  <div>
    <notes-table :notes=notes />
    <div id="load-more">
      <button
        v-if="group <= Math.ceil(notesCount / perGroup)"
        id="load-more-button"
        @click="loadMore">
        Load More...
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NotesTable from './NotesTable.vue';

export default {
  name: 'NotesList',
  components: {
    NotesTable,
  },
  data() {
    return {
      perGroup: 5,
    };
  },
  methods: {
    async loadMore() {
      await this.$store.dispatch('getNextGroup', this.perGroup);
    },
  },
  computed: mapState({
    notes: state => state.notes.notes,
    notesCount: state => state.notes.notesCount,
    group: state => state.notes.group,
  }),
  async created() {
    // Update the amount of notes in the database
    await this.$store.dispatch('updateCount');

    // Get the inital first group of notes
    if (!this.notes.length) {
      await this.$store.dispatch('getNextGroup', this.perGroup);
    }
  },
};
</script>

<style>
#load-more {
  width: 100%;
  text-align: center;
}

#load-more-button {
  border: 1px solid #bbb;
  border-radius: 5px;
  color: #555;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: .1rem;
  height: 38px;
  padding: 0 30px;
  background-color: transparent;
  cursor: pointer;
  outline: 0;
}

#load-more-button:hover {
  border: 1px solid #000;
  border-radius: 5px;
}

#load-more-button:focus {
  outline: none;
}
</style>
