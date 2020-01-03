<template>
  <div id="records-container" class="container">
    <h2 class="title is-2">Record Collection</h2>
    <RecordTable :recordData=recordData />
  </div>
</template>

<script>
import { recordReleaseIDs } from '../constants';
import RecordTable from '@/components/RecordTable.vue';

const DISCOGS_BASE_API = 'https://api.discogs.com/releases/';

export default {
  name: 'records',
  components: {
    RecordTable,
  },
  data() {
    return {
      recordData: [],
    };
  },
  created() {
    Object.keys(recordReleaseIDs).forEach((id) => {
      const currentRecordData = {};
      fetch(`${DISCOGS_BASE_API}${recordReleaseIDs[id]}`)
        .then(data => data.json())
        .then((json) => {
          currentRecordData.artist = json.artists[0].name;
          currentRecordData.album = json.title;
          currentRecordData.label = json.labels[0].name;
          currentRecordData.genre = json.genres;
          currentRecordData.release = json.year;

          this.recordData.push(currentRecordData);
        });
    });

    console.log(this.recordData);
  },
};
</script>

<style>
#records-container {
}
</style>
