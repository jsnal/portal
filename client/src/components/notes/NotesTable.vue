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
      <tr v-for="note in notes" :key="note.title">
        <td data-column="Title">
          <router-link :to="{
          name: 'note',
          params: {
          'note': note.title.replace(/\s+/g, '-').toLowerCase(),
          'routeObject': note
          },
          }">
            {{ note.title }}
          </router-link>
        </td>
        <td class="metadata-cell date-cell" data-column="Date">
          <i class="bx bx-calendar"></i>
          <i> Created {{ formatDate(note.createdAt) }}, </i>
          <i>updated {{ formatDate(note.updatedAt) }}</i>
        </td>
        <td class="metadata-cell" data-column="Tags">
          <i class="bx bxs-purchase-tag"></i>
          <span v-for="tag in note.tags" :key="tag">
            <router-link :to="/tags/ + tag" class="tag-link">
              {{ tag }}
            </router-link>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'NotesList',
  props: {
    notes: Array,
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      return `${mo}/${da}/${yr}`;
    },
  },
};
</script>

<style scoped>
.date-cell {
  font-size: 14px;
}

.metadata-cell {
  color: #4a4a4a;
}

.tag-link {
  display: inline-block;
  padding-left: .3em;
}

.bxs-purchase-tag {
  color: #1480a2;
}
</style>
