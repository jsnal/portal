<template>
    <div class="guitar-chart-container">
        <h2>{{ chartData.name }}</h2>
        <svg class="guitar-chart" ref="guitarChart" width="200" height="210"/>
    </div>
</template>

<script setup>
import { SVG } from '@svgdotjs/svg.js'
import { ref } from 'vue'

defineProps(['chartData']);

const width = 200;
const height = 220;
const nutHeight = 10;

const guitarChart = ref(null);

onMounted(() => {
    var draw = SVG(guitarChart.value);

    draw.rect(width, nutHeight).move(0, 0);

    for (let i = 0; i < 6; i++) {
        draw.line(0, 0, 0, height)
            .move(1 + (i * ((width - 2) / 5)), 0)
            .stroke({ width: 2, color: "#000000" });
    }

    for (let i = 1; i < 6; i++) {
        draw.line(0, 0, width, 0)
            .move(0, i * ((height - nutHeight) / 5))
            .stroke({ width: 2, color: "#000000" });
    }
});
</script>
