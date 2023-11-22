<template>
  <nav class="navbar">
    <ul class="navbar-links">
      <li>
        <NuxtLink class="navbar-logo" to="/">Jason Long</NuxtLink>
        <div class="navbar-toggle">
          <span class="material-icons-outlined" style="color: #ffffff" @click="is_toggled = !is_toggled">
            menu
          </span>
        </div>
      </li>
      <li class="navbar-child-link" :class="{ toggle: is_toggled, }">
        <NuxtLink class="navbar-link" to="/wiki">Wiki</NuxtLink>
      </li>
      <li class="navbar-child-link" :class="{ toggle: is_toggled, }">
        <NuxtLink class="navbar-link" to="/tags">Tags</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const is_toggled = ref(false);
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

.navbar-child-link>a.router-link-active {
  background: #333333;
}

.navbar-link,
.navbar-logo {
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
    color: #dddddd;
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
