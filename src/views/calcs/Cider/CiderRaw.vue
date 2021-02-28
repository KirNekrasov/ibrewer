<template>
    <h4>Cider Raw Materials (juice volume, fructose etc.)</h4>

    <form class="ibrewer-cider--initial">
        <div>Volume, l</div>
        <input type="number" v-model.number="volume" />

        <div>ABV, %</div>
        <input type="number" v-model.number="abv" />

        <div>FG, °P</div>
        <input type="number" v-model.number="fg" />

        <div>Acids, g/L</div>
        <input type="number" v-model.number="acidsGrammsPerLitre" />

        <div>Juice sugars, %</div>
        <input type="number" v-model.number="juiceSugarsMassPercents" />

        <div>Juice acids, %</div>
        <input type="number" v-model.number="juiceAcidsMassPercents" />
    </form>

    <p>Juice, {{ juiceMass.toFixed(1) }} kg</p>
    <p>Fructose, {{ fructoseMass.toFixed(1) }}kg</p>
    <p>Water, {{ waterVolume.toFixed(1) }} L</p>
    <p v-if="hasYeastMaxAbv">WARNING! Yeast max ABV should be {{ abv.toFixed(1) }}% for sweet cider.</p>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

import {
    platoToSg,
    ogFromFgAbv,
    sgToPlato,
    fgFromOgAbv,
    FRUCTOSE_DENSITY,
    FRUIT_ACID_DENSITY,
    NULL_FG,
} from '@/utils';

export default {
    setup() {
        const volume = ref(40);
        const abv = ref(11);
        const fg = ref(2);
        const acidsGrammsPerLitre = ref(0.5);
        const juiceSugarsMassPercents = ref(70);
        const juiceAcidsMassPercents = ref(2.8);

        const juiceMass = computed(
            () =>
                ((acidsGrammsPerLitre.value / 1000) * volume.value) /
                (juiceAcidsMassPercents.value / 100)
        );

        const juiceSugarsMass = computed(
            () => juiceMass.value * (juiceSugarsMassPercents.value / 100)
        );

        const juiceSugarsVolume = computed(
            () => juiceSugarsMass.value / FRUCTOSE_DENSITY
        );

        const juiceAcidsMass = computed(
            () => juiceMass.value * (juiceAcidsMassPercents.value / 100)
        );

        const juiceAcidsVolume = computed(
            () => juiceAcidsMass.value / FRUIT_ACID_DENSITY
        );

        const juiceWaterMass = computed(
            () => juiceMass.value - juiceSugarsMass.value - juiceAcidsMass.value
        );

        const juiceWaterVolume = computed(() => juiceWaterMass.value);

        const juiceVolume = computed(
            () =>
                juiceSugarsVolume.value +
                juiceAcidsVolume.value +
                juiceWaterVolume.value
        );

        const og = computed(() =>
            sgToPlato(ogFromFgAbv(platoToSg(fg.value), abv.value))
        );

        const fructoseMass = computed(
            () =>
                (og.value *
                    (volume.value - juiceVolume.value + juiceMass.value) -
                    100 * juiceSugarsMass.value) /
                (100 - og.value + og.value / FRUCTOSE_DENSITY)
        );

        const fructoseVolume = computed(
            () => fructoseMass.value / FRUCTOSE_DENSITY
        );

        const waterVolume = computed(
            () => volume.value - juiceVolume.value - fructoseVolume.value
        );

        const hasYeastMaxAbv = computed(() => NULL_FG < platoToSg(fg.value));

        return {
            volume,
            abv,
            fg,
            acidsGrammsPerLitre,
            juiceSugarsMassPercents,
            juiceAcidsMassPercents,

            juiceMass,
            fructoseMass,
            waterVolume,
            hasYeastMaxAbv,
        };
    },
};
</script>
