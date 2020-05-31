<template>
  <table id="projects-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr v&#45;for="note in notes" :key="note.title"> -->
      <!--   <td>{{ note }}</td> -->
      <!-- </tr> -->
    </tbody>
    {{ notes }}
    {{ currentGroup }}
    <button @click="loadMore">Load More</button>
  </table>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NotesList',
  data() {
    return {
      currentGroup: 1,
    };
  },
  methods: {
    loadMore() {
    },
    updateNotesByGroup() {
    },
  },
  computed: mapState({
    notes: state => state.notes.displayNotes,
  }),
  created() {
    this.$store.dispatch('setAllNotes');
    // this.$store.dispatch('setDisplayNotes', 1);
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
</style>
