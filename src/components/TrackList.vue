<template>
  <div id="tracklist-container">
    <h1>{{ method }}</h1>
  </div>
</template>

<script>
export default {
  name: 'tracklist',
  props: [
    'method',
  ],
  data() {
    return {
      url: new URL('http://ws.audioscrobbler.com/2.0/'),
      body: {
        method: 'user.getweeklytrackchart', // TODO: make dynamic
        user: 'JasonLong24', // TODO: make dynamic
        api_key: '0f89b65f12984aeec45ded048d478781',
        format: 'json',
      },
    };
  },
  methods: {
  },
  created() {
    this.url.search = new URLSearchParams(this.body).toString();
    console.log(this.url);

    fetch(this.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
</script>

<style>
#tracklist-container {}
</style>
