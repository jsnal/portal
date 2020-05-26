<template>
  <b-container id="app" fluid>
    <title>{{ getTitle() }}</title>
    <div id="header">
      <navbar/>
    </div>
    <router-view/>
    <!-- <footer id="footer"> -->
    <!-- </footer> -->
  </b-container>
</template>

<script>
import { PROJECTURLS } from './data/constants';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      projects: PROJECTURLS,
    };
  },
  methods: {
    getTitle() {
      if (this.$route.name === 'jasonlong') return `${this.$route.name}/`;

      return this.$route.path;
    },
  },
};
</script>

<style>
#app {
  padding: 0px;
}

#footer {
  background: #000000;
  height: 1em;
  width: 100%;
}
</style>
