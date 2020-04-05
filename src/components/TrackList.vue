<template>
  <div id="tracklist-container">
    <h1>Recent Tracks:</h1>
    <async-loading v-if="loading"/>
    <table>
      <tbody>
        <tr v-for="track in tracklist" :key="track.name">
          <td class="tracklist-rank">{{ track['@attr'].rank }}</td>
          <td class="tracklist-track">
            <a :href=track.url target="_blank">
              {{ track.name }}
            </a>
          </td>
          <td class="tracklist-artist">
            <a :href="'https://www.last.fm/music/' + track.artist['#text']" target="_blank">
              {{ track.artist['#text'] }}
            </a>
          </td>
          <td class="tracklist-playcount">{{ track.playcount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AsyncLoading from './AsyncLoading.vue';

export default {
  name: 'tracklist',
  components: {
    AsyncLoading,
  },
  props: [
    'method',
  ],
  data() {
    return {
      loading: true,
      data: '',
      tracklist: '',
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

    fetch(this.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.text())
      .then((text) => {
        this.data = JSON.parse(text);
        this.loading = false;
        console.log(this.data);

        Object.keys(this.data).forEach((obj) => {
          Object.keys(this.data[obj]).forEach((list) => {
            if (list !== '@attr') {
              this.tracklist = this.data[obj][list].slice(0, 10);
            }
          });
        });
      });
  },
};
</script>

<style>
#tracklist-container {}

.tracklist-artist, .tracklist-track {
  display: block;
  clear: both;
}
</style>
