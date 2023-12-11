<template>
    <h1>Triads</h1>
    <GuitarChart :chartData="triadsData.body[0]"/>
    <GuitarChart :chartData="triadsData.body[1]"/>
</template>

<script setup>
const triadsData = await queryContent('guitar/triads').findOne();

console.log(triadsData);
</script>
