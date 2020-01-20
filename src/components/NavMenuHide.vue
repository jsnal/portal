<template>
  <div id="navmenu-hide-container">
    <a id="navmenu-hide-button" @click="toggleNavMenu">
      {{ hideButtonIcon }}
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideButtonIcon: '«',
    };
  },
  methods: {
    toggleNavMenu() {
      const navmenu = document.getElementById('navmenu-container');

      if (navmenu.style.display !== 'none') {
        navmenu.style.display = 'none';
        this.hideButtonIcon = '»';
      } else {
        navmenu.style.display = '';
        this.hideButtonIcon = '«';
      }
    },
  },
};
</script>

<style>
#navmenu-hide-container {
  width: 12px;
  background: #ccc;
}

#navmenu-hide-button {
  font-size: 24px;
}

#navmenu-hide-button:hover {
  cursor: pointer;
}
</style>
