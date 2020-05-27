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
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
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
