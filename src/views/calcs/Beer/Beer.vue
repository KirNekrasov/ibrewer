<template>
    <h3>Beer calculators</h3>

    <nav class="ibrewer__navs">
        <router-link class="ibrewer__nav" :to="{ name: 'beerExtract' }">
            Beer from hopped extract
        </router-link>
    </nav>

    <router-view></router-view>
</template>

<script>
export default {};
</script>
