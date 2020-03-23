<template>
  <b-container id="app" fluid>
    <title>{{ getTitle() }}</title>
    <div id="header">
      <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand id="navbar-brand" to="/">Jason Long</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown text="Projects">
              <b-dropdown-item
                v-for="(project, index) in projects"
                :href="'/projects/' + index"
                :key="project[index]">
                {{ index }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/notes">Notes</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
    <footer id="footer">
    </footer>
  </b-container>
</template>

<script>
import { PROJECTURLS } from './data/constants';

export default {
  components: {
  },
  data() {
    return {
      projects: PROJECTURLS,
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
#app {
  padding: 0px;
}

#navbar {
  height: 1.5em;
  background-color: #ccc !important;
}

#navbar-brand {
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  color: #000;
  margin: 0 6px;
}

.nav-link, .dropdown-item {
  color: #000 !important;
  font-size: 14px;
  font-weight: bold !important;
}

.nav-link:hover, #navbar-brand:hover {
  color: #666 !important;
}

.dropdown-item {
  padding: 0.1rem .5rem !important;
}

@media (max-width: 991px) {
  #navbar {
    height: inherit;
  }

  .navbar-toggler {
    border: 0px !important;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
  }

  #navbar-brand {
    margin: 0px !important;
  }
}

#footer {
  background: #ccc;
  height: 1em;
  width: 100%;
}
</style>
