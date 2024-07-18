<template>
  <div class="portal-body">
    <h1>Jason Long</h1>
    <ul>
      <li>Software Engineer</li>
      <li>Interested low-level software specifically embedded systems and operating systems </li>
      <li>Check out my x86 32-bit operating system <a href="https://github.com/jsnal/os">project</a></li>
      <li>See more <a href="/resume.pdf">here</a></li>
    </ul>
    <h2>Contact</h2>
    <ul>
      <li><a class="info-link" href="https://github.com/jsnal" target="_blank">Github</a></li>
      <li><a class="info-link" href="mailto:jasonlongball@gmail.com">Email</a></li>
    </ul>
    <h2>Recent Wiki Articles</h2>
    <WikiList :articles="articles" />
  </div>
</template>

<script setup>
useHead({
    title: 'Portal'
});

const articles = await queryContent('wiki')
    .only(['title', '_path', 'updated', 'tags'])
    .sort({ updated: 1 })
    .limit(10)
    .find();
</script>

