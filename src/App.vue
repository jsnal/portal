<template>
  <b-container id="app" fluid>
    <title>{{ getTitle() }}</title>
    <b-row>
      <div id="header">
        <router-link to="/">Jason Long</router-link>
        <NavMenuHide />
      </div>
    </b-row>
    <b-row>
      <b-col sm="3" id="navmenu-column">
        <NavMenu :navmenuTemplate=navmenu />
      </b-col>
      <b-col sm="9">
        <router-view/>
      </b-col>
    </b-row>
    <b-row>
      <div id="footer"></div>
    </b-row>
  </b-container>
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
              {
                name: 'portal',
                href: '/projects/portal',
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
  width: 100%;
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
  display: flex;
  width: 100%;
}

#nav-container {
  height: 100%;
}

#footer {
  background: #ccc;
  height: 1em;
  width: 100%;
}
</style>
