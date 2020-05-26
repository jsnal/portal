<template>
  <nav class="navbar">
    <ul class="navbar-links">
      <li>
        <router-link class="navbar-logo" to="/">Jason Long</router-link>
        <div class="navbar-toggle">
          <box-icon name="menu" color="#ffffff" v-on:click="isToggled = !isToggled"></box-icon>
        </div>
      </li>
      <li :class="{ 'navbar-child-link': true, toggle: isToggled}">
        <router-link class="navbar-link" to="/projects">Projects</router-link>
      </li>
      <li :class="{ 'navbar-child-link': true, toggle: isToggled}">
        <router-link class="navbar-link" to="/notes">Notes</router-link>
      </li>
    </ul>
</nav>
</template>

<script>
import 'boxicons';

export default {
  name: 'navbar',
  components: {
  },
  data() {
    return {
      isToggled: true,
    };
  },
  methods: {
    setActive() {
    },
  },
  created() {
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
  color: #ffffff;
  padding: .5em .5em;
}

.navbar-logo {
  display: inline-block;
  font-weight: 800;
}

.navbar-toggle {
  position: absolute;
  right: 20px;
  cursor: pointer;
}

.router-link-exact-active {
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
    justify-content: flex-end;
  }

  .navbar-links {
    margin: 0;
  }

  .navbar-links li {
    padding: 0;
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
