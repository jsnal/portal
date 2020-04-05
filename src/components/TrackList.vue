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
        method: this.method,
        user: process.env.VUE_APP_LASTFM_USER,
        api_key: process.env.VUE_APP_LASTFM_KEY,
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
