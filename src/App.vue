<template>
    <div class="ibrewer">
        <h1>IBrewer</h1>
        <nav class="ibrewer__navs">
            <router-link class="ibrewer__nav" :to="{ name: 'home' }">Home</router-link>
            <router-link class="ibrewer__nav" :to="{ name: 'calcs' }">
                Calculators
            </router-link>
        </nav>

        <router-view></router-view>
    </div>
</template>

<style lang="scss">
.ibrewer {
    &__navs {
        display: flex;
        flex-direction: row;
    }

    &__nav:not(:last-child) {
        margin-right: 1rem;
    }
}
</style>
