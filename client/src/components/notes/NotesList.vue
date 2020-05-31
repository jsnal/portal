<template>
  <div>
    <table id="projects-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="note in notes" :key="note.title">
          <td>
            <router-link :to="'/notes/' + note.title">{{ note.title }}</router-link>
          </td>
          <td class="date-cell">
            <i>Created {{ formatDate(note.createdAt) }}
              , updated {{ formatDate(note.updatedAt) }}</i>
          </td>
          <td>{{ note.tags.toString() }}</td>
        </tr>
      </tbody>
    </table>
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

export default {
  name: 'NotesList',
  data() {
    return {
      currentGroup: 0,
      perGroup: 5,
      full: false,
    };
  },
  methods: {
    formatDate(date) {
      const localDate = new Date(date);
      return localDate.toDateString();
    },
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

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em auto;
}

/* Zebra striping */
tr:nth-of-type(odd) {
  background: #eee;
}

th {
  background: #000000;
  color: #ffffff;
  font-weight: bold;
}

td, th {
  padding: .5em;
  text-align: left;
  font-size: 16px;
}

.date-cell {
  font-size: 14px;
}

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

/* TODO: move to another file */
button {
  outline:none;
}
button::-moz-focus-inner {
  border: 0;
}
</style>
