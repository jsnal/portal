<template>
  <div id="navmenu-container">
    <ul id="navmenu-links">
      <li v-for="link in navmenuTemplate" :key="link.name">
        <router-link :to="link.href" @click.native="linkClicked">{{ link.name }}</router-link>
        <ul v-if="link.header" class="navmenu-sublinks">
          <li v-for="sublink in link.sublinks.items" :key="sublink.name">
            <router-link :to="sublink.href">{{ sublink.name }}</router-link>
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
    linkClicked(e) {
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
  display: table-cell;
  vertical-align: top;
  border-right: 10px solid #ccc;
  height: 98%;
}

#navmenu-links {
  padding: 0 2em 0 0;
}

#navmenu-links, .navmenu-sublinks {
  list-style: none;
}

.navmenu-sublinks {
  display: none;
}
</style>
