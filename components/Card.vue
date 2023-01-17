<template>
    <div class="portal-card">
        <div class="portal-card-image">
            <slot name="image"></slot>
        </div>
        <div class="portal-card-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<style>
.portal-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    transition: 0.3s;
}

.portal-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.portal-card-image {
    border-radius: 0.5rem;
}

.portal-card-body {
    padding: 0.5rem 1rem;
}
</style>