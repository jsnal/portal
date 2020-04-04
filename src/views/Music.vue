<template>
  <div id="music-container" class="container">
    <TrackList method="user.getweeklytrackchart"/>
  </div>
</template>

<script>
import TrackList from '../components/TrackList.vue';

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
