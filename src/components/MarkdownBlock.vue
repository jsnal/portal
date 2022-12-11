<template>
    <div v-html="htmlMarkdown"></div>
</template>

<script>
import { parse } from 'marked'

export default {
    name: 'MarkdownBlock',
    props: {
        rawMarkdown: String
    },
    data() {
        return {
            htmlMarkdown: '',
        }
    },
    watch: {
        rawMarkdown(updatedMarkdown) {
            this.htmlMarkdown = parse(updatedMarkdown);
        }
    },
    created() {
        this.htmlMarkdown = parse(this.rawMarkdown);
    }
};
</script>