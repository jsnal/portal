<template>
  <div class="container">
    <div class="portal-body">
      <h1 id="note-title">
        {{ note.title }}
      </h1>
      <p id="note-date">
        <i class='bx bx-calendar'></i>
        Created {{ formatDate(note.createdAt) }} &#8226;
        Updated {{ formatDate(note.updatedAt) }}
      </p>
      <div class="markdown-body" v-html="note.html">
      </div>
      <p id="note-tags">
        <i class='bx bxs-purchase-tag'></i>
        <span v-for="tag in note.tags" :key="tag">
          <router-link :to="/tags/ + tag" class="tag-link">
            {{ tag }}
          </router-link>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { NotesService } from '@/common/api';

export default {
  name: 'Note',
  props: {
    routeObject: Object,
  },
  data() {
    return {
      note: null,
    };
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
  async created() {
    if (typeof this.$route.params.routeObject === 'object') {
      this.note = this.$route.params.routeObject;
    } else {
      const note = await NotesService.getByTitle(this.$route.params.note);
      this.note = note.data;
    }
  },
};
</script>
<style>
#note-title {
  margin-bottom: .2em;
}

#note-date, #note-tags {
  font-style: italic;
  color: #777676;
}

#note-date {
  margin: 0;
}

#note-tags {
  text-align: right;
}

.tag-link {
  display: inline-block;
  padding-left: .3em;
}

.bxs-purchase-tag {
  color: #1480a2;
}
</style>
