<template>
  <footer id="footer">
    <div class="row center-xs">
      <div class="col-xs-2">
        <div class="box">
          <p>Site</p>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
            <li><router-link to="/notes">Notes</router-link></li>
          </ul>
        </div>
      </div>
      <div class="col-xs-2">
        <div class="box">
          <p>External</p>
          <ul>
            <li><a href="https://github.com/jsnal" target="_blank">Github</a></li>
            <li><a href="mailto:jasonlongball@gmail.com">Email</a></li>
            <li><a href="https://www.linkedin.com/in/jason-long-aab1ba181/" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="col-xs-2">
        <div id="colophon" class="box">
          <p>Made by Jason Long using VueJS, ExpressJs, and MongoDB</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
p {
  font-size: .8em;
  color: #000000;
  margin-bottom: 0;
}

ul {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
}

li {
  padding-top: .5em;
}

a {
  font-size: .8em;
  text-decoration: none;
  color: #1480a2;
}

a:hover {
  text-decoration: underline;
  color: #1480a2;
}

.row {
  width: 100%;
}

#colophon {
  text-align: left;
}

#footer {
  background: #ccc;
}
</style>
