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
      <button v-if="full === false" id="load-more-button" @click="loadMore">Load More...</button>
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
      full: false,
    };
  },
  methods: {
    formatDate(date) {
      const localDate = new Date(date);
      return localDate.toDateString();
    },
    loadMore() {
      this.currentGroup += 1;

      // Check if we are at our maximum limit
      if (this.currentGroup < (this.notesCount / 3)) {
        this.$store.dispatch('setDisplayNotes', this.currentGroup);
        this.full = false;
      } else {
        this.full = true;
      }
    },
    updateNotesByGroup() {
    },
  },
  computed: mapState({
    notes: state => state.notes.displayNotes,
    notesCount: state => state.notes.notesCount,
    fetched: state => state.notes.notesFetched,
  }),
  created() {
    if (!this.fetched) {
      this.$store.dispatch('setAllNotes');
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
