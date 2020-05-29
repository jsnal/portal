<template>
  <footer id="footer">
    <div class="row center-xs">
      <div class="col-xs-2">
        <div class="box">
          <h6>Site</h6>
          <router-link to="/projects">Projects</router-link>
        </div>
      </div>
      <div class="col-xs-2">
        <div class="box">
          <h6>External</h6>
        </div>
      </div>
      <div class="col-xs-2">
        <div class="box">
          <h6>Made by Jason Long</h6>
        </div>
      </div>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
h6 {
  /* text-align: center; */
}

.row {
  width: 100%;
}

#footer {
  background: #ccc;
}
</style>
