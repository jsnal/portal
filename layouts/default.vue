<template>
    <div id="app">
        <Navbar />
        <div class="container portal-body">
            <Nuxt />
        </div>
        <Footer />
    </div>
</template>

<script>
export default {
    data() {
        return {
            title_tabs: [
                { slug: 'index', name: 'Portal' },
                { slug: 'wiki', name: 'Portal: Wiki' },
                { slug: 'tags', name: 'Portal: Tags' },
                { slug: 'resume', name: 'Portal: Resume' },
            ]
        }
    },
    head() {
        return {
            title: (this.title_tabs.find(t => t.slug === this.$route.name || t.slug + "-slug" === this.$route.name) || {}).name
        }
    }
}
</script>

<style>
body {
    height: 100%;
    margin: 0px;
}
</style>

