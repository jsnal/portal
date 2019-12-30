<template>
  <div id="app">
    <title>{{ getTitle() }}</title>

    <div id="header">
      <router-link to="/">Jason Long</router-link>
    </div>
    <div id="container">
      <NavMenu :navmenuTemplate=navmenu />
      <NavMenuHide />
      <router-view/>
    </div>
    <div id="footer"></div>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';
import NavMenuHide from '@/components/NavMenuHide.vue';

export default {
  components: {
    NavMenu,
    NavMenuHide,
  },
  data() {
    return {
      navmenu: [
        {
          name: 'projects',
          header: true,
          href: '#',
          sublinks: {
            items: [
              {
                name: 'i3wm',
                href: '/projects/i3wm',
              },
              {
                name: 'paste-light',
                href: '/projects/paste-light',
              },
              {
                name: 'vim-serape',
                href: '/projects/vim-serape',
              },
              {
                name: 'abbs',
                href: '/projects/abbs',
              },
            ],
          },
        },
        {
          name: 'records',
          header: false,
          href: '/records',
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
#header {
  background: #ccc;
  min-height: 1em;
}

#header > a {
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
  color: #000;
  margin: 0 6px;
}

#header > a:hover {
  color: #666;
}

#container {
  display: table;
  width: 100%;
}

#footer {
  background: #ccc;
  height: 1em;
}
</style>
