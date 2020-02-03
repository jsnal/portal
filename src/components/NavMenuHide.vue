<template>
  <a id="navmenu-hide-button" @click="toggleNavMenu">
    {{ hideButtonIcon }}
  </a>
</template>

<script>
export default {
  data() {
    return {
      hideButtonIcon: 'Close',
    };
  },
  methods: {
    toggleNavMenu() {
      const navmenu = document.getElementById('navmenu-column');

      if (navmenu.style.display !== 'none') {
        navmenu.style.display = 'none';
        this.hideButtonIcon = 'Open';
      } else {
        navmenu.style.display = '';
        this.hideButtonIcon = 'Close';
      }
    },
  },
};
</script>

<style>
#navmenu-hide-button {
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
  color: #000;
  margin: 0 6px;
  float: right;
}

#navmenu-hide-button:hover {
  cursor: pointer;
  color: #666;
}
</style>
