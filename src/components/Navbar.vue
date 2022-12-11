<template>
  <nav class="navbar">
    <ul class="navbar-links">
      <li :class="{ active: currentPage === 'Home' }">
        <router-link class="navbar-logo" to="/">Jason Long</router-link>
        <div class="navbar-toggle">
          <span class="material-icons-outlined"
            style="color: #ffffff"
            v-on:click="isToggled = !isToggled">menu</span>
        </div>
      </li>
      <li :class="{
        'navbar-child-link': true,
        toggle: isToggled,
        active: currentPage === 'Projects'
        }"
      >
        <router-link class="navbar-link" to="/projects">Projects</router-link>
      </li>
    </ul>
</nav>
</template>

<script>

export default {
  name: 'navbar',
  components: {
  },
  data() {
    return {
      isToggled: false,
      currentPage: this.$route.name,
    };
  },
  methods: {
    setActive() {
    },
  },
  created() {
  },
  watch: {
    $route(to) {
      this.currentPage = to.name;
      this.isToggled = false;
      document.title = this.currentPage;
    },
  },
};
</script>

<style scoped>
.navbar {
  font-size: 14px;
  background: #000000;
  padding: 0;
}

.navbar-links {
  list-style-type: none;
  margin: 0;
  width: 100%;
  padding: 0;
}

.navbar-links li {
  padding: .5em;
}

.navbar-child-link {
  display: none;
}

.navbar-link, .navbar-logo {
  text-decoration: none;
  outline: none;
  color: #ffffff;
  padding: .5em .5em;
}

.navbar-link {
  display: block;
}

.navbar-logo {
  display: inline-block;
  font-weight: 800;
}

.navbar-toggle {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 20px;
  height: 3.5em;
  cursor: pointer;
}

.active {
  background: #333333;
}

.toggle {
  display: block;
}

@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-links {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0;
  }

  .navbar-links li {
    padding: 0;
  }

  .navbar-links li:hover {
    background: #000000;
  }

  .navbar-link {
    color: #cccccc;
    margin-left: .1em;
    display: inline-block;
  }

  .navbar-link:hover {
    color: #ffffff;
  }

  .navbar-logo {
    margin: 0;
  }

  .navbar-toggle {
    display: none;
  }

  .navbar-child-link {
    display: inline-block;
  }
}
</style>
