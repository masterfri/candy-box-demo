<template>
    <div class="page">
        <h2>{{ title }}</h2>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
}
</script>