<template>
    <h3>Cider calculators</h3>

    <nav class="ibrewer__navs">
        <router-link class="ibrewer__nav" :to="{ name: 'ciderRaw' }">
            Raw Materials
        </router-link>

        <router-link class="ibrewer__nav" :to="{ name: 'ciderTarget' }">
            Target Parameters
        </router-link>
    </nav>

    <router-view></router-view>
</template>

<script>
export default {};
</script>
