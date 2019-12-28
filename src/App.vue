<template>
  <div id="app">
    <title>{{ getTitle() }}</title>

    <div id="header">
      <router-link to="/">Jason Long</router-link>
    </div>
    <NavMenu :navmenuTemplate=navmenu />
    <router-view/>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';

export default {
  components: {
    NavMenu,
  },
  data() {
    return {
      navmenu: [
        {
          name: 'projects',
          header: true,
          href: '#',
          sublinks: [
            {
              name: 'i3wm',
              href: '#',
            },
            {
              name: 'paste-light',
              href: '#',
            },
          ],
        },
        {
          name: 'about',
          header: false,
          href: '/about',
        },
      ],
    };
  },
  methods: {
    getTitle() {
      if (this.$route.name === 'home') {
        return 'jasonlong/';
      }

      return `/${this.$route.name}`;
    },
  },
};
</script>

<style>
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

#header {
  background: #ccc;
}

#header > a {
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
  color: #000;
  margin: 0 6px;
}
</style>
