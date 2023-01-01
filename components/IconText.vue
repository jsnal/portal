<template>
    <div class="portal-icon-container">
        <span class="portal-icon material-icons-outlined">{{ icon }}</span>
        <div class="portal-icon-text">
            <slot></slot>
            <!-- {{ text }} -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'IconText',
    props: {
        'icon': String,
        'text': String
    }
}
</script>