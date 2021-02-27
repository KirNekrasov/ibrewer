<template>
    <form class="ibrewer-cider--initial">
        <div>Juice, kg</div>
        <input type="number" v-model.number="juice" />

        <div>Juice sugars</div>
        <input type="number" v-model.number="juiceSugars" />

        <div>Juice acids</div>
        <input type="number" v-model.number="juiceAcids" />

        <div>Water, ls</div>
        <input type="number" v-model.number="water" />

        <div>Yeast max ABV, °P</div>
        <input type="number" v-model.number="yeastMaxAbv" />
    </form>

    <p>Acids, {{ acids.toFixed(1) }}%</p>

    <p></p>

    <p>OG, {{ og.toFixed(1) }}°P</p>
    <p>FG, {{ fg.toFixed(1) }}°P</p>
    <p>ABV, {{ abvMax.toFixed(1) }}%</p>

    <form class="ibrewer-cider--final">
        <div>Fructose, kg</div>
        <input type="number" v-model.number="fructose" />
    </form>

    <p>OG, {{ ogFructose.toFixed(1) }}°P</p>
    <p>FG, {{ fgFructose.toFixed(1) }}°P</p>
    <p>ABV, {{ abvFructoseMax.toFixed(1) }}%</p>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

import { platoToSg, abv, NULL_FG, fgFromAbv } from '@/utils';

export default {
    setup() {
        const juice = ref(5);
        const juiceSugars = ref(0.7);
        const juiceAcids = ref(0.028);
        const water = ref(15);
        const yeastMaxAbv = ref(11);

        const acids = computed(
            () =>
                ((juice.value * juiceAcids.value) /
                    (juice.value + water.value)) *
                100
        );

        const og = computed(
            () =>
                ((juice.value * juiceSugars.value) /
                    (juice.value + water.value)) *
                100
        );

        const abvFull = computed(() => abv(platoToSg(og.value), NULL_FG));
        const abvMax = computed(() =>
            Math.min(abvFull.value, yeastMaxAbv.value)
        );

        const fg = computed(() => fgFromAbv(platoToSg(og.value), abvMax.value));

        const fructose = ref(0.5);

        const ogFructose = computed(
            () =>
                ((juice.value * juiceSugars.value + fructose.value) /
                    (juice.value + water.value)) *
                100
        );

        const abvFructoseFull = computed(() =>
            abv(platoToSg(ogFructose.value), NULL_FG)
        );
        const abvFructoseMax = computed(() =>
            Math.min(abvFructoseFull.value, yeastMaxAbv.value)
        );

        const fgFructose = computed(() =>
            fgFromAbv(platoToSg(ogFructose.value), abvFructoseMax.value)
        );

        return {
            juice,
            juiceSugars,
            juiceAcids,
            water,
            yeastMaxAbv,

            acids,
            og,
            fg,
            abvMax,

            fructose,

            ogFructose,
            fgFructose,
            abvFructoseMax,
        };
    },
};
</script>
