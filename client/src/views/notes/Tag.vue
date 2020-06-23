<template>
  <div class="container portal-body">
    <h1>{{ $route.params.tag }}</h1>
    <p id="note-count"><span>{{ notesCount }}</span> notes have been published</p>
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
