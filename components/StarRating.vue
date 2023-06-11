<template>
    <div class="portal-star-rating-container">
        <span class="portal-icon material-icons-outlined" v-for="index in rating" :key="index">star</span><span
         class="portal-icon material-icons-outlined" v-for="index in 5 - rating" :key="index + 5"> star_border </span>
    </div>
</template>

<script>
export default {
    name: 'IconText',
    props: {
        'rating': Number
    }
}
</script>

<style scoped>
.portal-star-rating-container > .portal-icon {
    padding-right: 0px;
}
</style>