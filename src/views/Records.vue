<template>
  <div id="records-container" class="container">
    <h2 class="title is-3" id="title">Records - Total {{ recordCollection.length }}</h2>
    <RecordTable/>
  </div>
</template>

<script>
import { RECORDCOLLECTION } from '../data/recordCollection';
import RecordTable from '@/components/RecordTable.vue';

export default {
  name: 'records',
  components: {
    RecordTable,
  },
  data() {
    return {
      recordCollection: RECORDCOLLECTION,
    };
  },
};
</script>

<style>
#records-container {
}

#title {
  border-bottom: 1px solid #eaecef;
  padding-bottom: .3em;
}
</style>
