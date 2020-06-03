<template>
  <div class="container">
    <div class="portal-body">
      <h1>{{ note.title }}</h1>
      <h1>{{ note.formatDate }}</h1>
      <h1>{{ note.updatedAt }}</h1>
      <h1>{{ note.tags }}</h1>
      <div class="markdown-body" v-html="note.html">
      </div>
    </div>
  </div>
</template>

<script>
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
  created() {
    if (typeof this.$route.params.routeObject === 'object') {
      console.log(this.$route.params.routeObject);
      this.note = this.$route.params.routeObject;
    } else {
      console.log('request the data!');
      console.log(this.$route.params.note);
    }
  },
};
</script>
<style></style>
