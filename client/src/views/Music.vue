<template>
  <div id="music-container" class="container">
    <track-list method="user.getweeklytrackchart"/>
  </div>
</template>

<script>
import TrackList from '../components/music/TrackList.vue';

export default {
  name: 'music',
  components: {
    TrackList,
  },
};
</script>

<style>
#music-container {
  margin: 1em auto;
}
</style>
