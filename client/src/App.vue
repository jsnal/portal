<template>
  <div id="app" fluid>
    <title>{{ getTitle() }}</title>
    <div id="header">
      <Navbar/>
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
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
</style>
