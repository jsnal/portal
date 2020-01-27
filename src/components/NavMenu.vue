<template>
  <div id="navmenu-container">
    <ul id="navmenu-links">
      <li v-for="link in navmenuTemplate" :key="link.name">

        <a v-if="link.header" class="navmenu-link" @click="headerClicked">
          › {{ link.name }}
        </a>

        <router-link v-else class="navmenu-link" :to="link.href">
          › {{ link.name }}
        </router-link>

        <ul v-if="link.header" class="navmenu-sublinks">
          <li v-for="sublink in link.sublinks.items" :key="sublink.name">
            <router-link class="navmenu-link" :to="sublink.href">
              » {{ sublink.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    navmenuTemplate: [
      Object,
      Array,
    ],
  },
  methods: {
    headerClicked(e) {
      const siblingE = e.target.nextElementSibling;

      if (siblingE !== null) {
        siblingE.style.display = siblingE.style.display === 'block' ? 'none' : 'block';
      }
    },
  },
};
</script>

<style>
#navmenu-container {
  vertical-align: top;
  width: inherit;
}

#navmenu-links {
  padding: 0;
}

.navmenu-link {
  text-decoration: none;
  outline: 0;
  color: #0000ff;
}

.navmenu-link:hover {
  cursor: pointer;
}

.navmenu-link.router-link-active {
  color: #000;
  font-style: italic;
}

#navmenu-links, .navmenu-sublinks {
  list-style: none;
}

.navmenu-sublinks {
  display: none;
}
</style>
