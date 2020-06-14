<template>
  <footer id="footer">
    <div class="footer-cell">
      <p>Site</p>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/notes">Notes</router-link></li>
      </ul>
    </div>
    <div class="footer-cell">
      <p>External</p>
      <ul>
        <li><a href="https://github.com/jsnal" target="_blank">Github</a></li>
        <li><a href="mailto:jasonlongball@gmail.com">Email</a></li>
        <li><a href="https://www.linkedin.com/in/jason-long-aab1ba181/" target="_blank">LinkedIn</a></li>
      </ul>
    </div>
    <div class="footer-cell">
      <p>Made by Jason Long using
        <a href="https://vuejs.org" target="_blank">VueJS</a>,
        <a href="https://expressjs.com" target="_blank">Expres.js</a>, and
        <a href="https://mongodb.com" target="_blank">MongoDB</a>.
      </p>
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

li a {
  font-size: .8em;
}

a {
  text-decoration: none;
  color: #1480a2;
}

a:hover {
  text-decoration: underline;
  color: #1480a2;
}

#footer {
  background: #eeeeee;
  text-align: center;
  width: 100%;
  display: table;
  table-layout: fixed;
}

.footer-cell {
  display: table-cell;
}

@media only screen and (max-width: 576px) {
  .footer-cell {
    display: table-row;
  }
}
</style>
