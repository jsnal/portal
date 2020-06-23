<template>
  <div class="container portal-body">
    <div class="portal-list-header">
      <h1>{{ $route.params.tag }}</h1>
      <p><span>{{ notesCount }}</span>
        note<span v-if="notesCount > 1" id="trailing-s">s</span> published under this tag
      </p>
    </div>
    <tags-list/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TagsList from '../../components/notes/TagsList.vue';

export default {
  name: 'Tag',
  components: {
    TagsList,
  },
  computed: mapState({
    notesCount: state => state.notes.masterTags.length,
  }),
};
</script>

<style scoped>
#trailing-s { font-weight: 500 !important; }
</style>
