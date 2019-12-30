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
        navmenu.style.display = 'table-cell';
        this.hideButtonIcon = '«';
      }
    },
  },
};
</script>

<style>
#navmenu-hide-container {
  display: table-cell;
  height: 100%;
  width: 10px;
  background: #ccc;
}

#navmenu-hide-button {
  font-size: 24px;
}

#navmenu-hide-button:hover {
  cursor: pointer;
}
</style>
