<template>
    <div class="ibrewer-calcs">
        <h2>Calculators</h2>

        <nav class="ibrewer__navs">
            <router-link class="ibrewer__nav" :to="{ name: 'cider' }">
                Cider
            </router-link>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
export default {};
</script>
