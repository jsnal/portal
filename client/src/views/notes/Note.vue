<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="markdown-body" v-html="html">
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
      html: null,
      title: null,
    };
  },
  created() {
    if (typeof this.$route.params.routeObject === 'object') {
      const { html, title } = this.$route.params.routeObject;
      this.html = html;
      this.title = title;
    } else {
      console.log('request the data!');
      console.log(this.$route.params.note);
    }
  },
};
</script>
<style></style>
