<template>
    <h4>Cider By Target Parameters (FG, ABV etc.)</h4>

    <form>
        <div>Juice, kg</div>
        <input type="number" v-model.number="juiceMass" />

        <div>Juice sugars, %</div>
        <input type="number" v-model.number="juiceSugarsMassPercents" />

        <div>Juice acids, %</div>
        <input type="number" v-model.number="juiceAcidsMassPercents" />

        <div>Water, L</div>
        <input type="number" v-model.number="waterVolume" />

        <div>Yeast max ABV, °P</div>
        <input type="number" v-model.number="yeastMaxAbv" />

        <div>Fructose, kg</div>
        <input type="number" v-model.number="fructoseMass" />
    </form>

    <p>Acidity, {{ acidsGrammsPerLitre.toFixed(1) }} g/L</p>
    <p>OG, {{ og.toFixed(1) }} °P</p>
    <p>FG, {{ fg.toFixed(1) }} °P</p>
    <p>ABV, {{ abvMax.toFixed(1) }}%</p>
    <p>Volume, {{ volume.toFixed(1) }} L</p>
    <p>Mass, {{ mass.toFixed(1) }} kg</p>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

import {
    platoToSg,
    abv,
    NULL_FG,
    fgFromOgAbv,
    FRUCTOSE_DENSITY,
    FRUIT_ACID_DENSITY,
    sgToPlato,
} from '@/utils';

export default {
    setup() {
        const juiceMass = ref(5);
        const juiceSugarsMassPercents = ref(70);
        const juiceAcidsMassPercents = ref(2.8);
        const waterVolume = ref(15);
        const yeastMaxAbv = ref(11);
        const fructoseMass = ref(0.5);

        const juiceSugarsMass = computed(
            () => (juiceMass.value * juiceSugarsMassPercents.value) / 100
        );

        const juiceSugarsVolume = computed(
            () => juiceSugarsMass.value / FRUCTOSE_DENSITY
        );

        const juiceAcidsMass = computed(
            () => (juiceMass.value * juiceAcidsMassPercents.value) / 100
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

        const waterMass = computed(() => waterVolume.value);

        const fructoseVolume = computed(
            () => fructoseMass.value / FRUCTOSE_DENSITY
        );

        const sugarsMass = computed(
            () => juiceSugarsMass.value + fructoseMass.value
        );

        const mass = computed(
            () => juiceMass.value + fructoseMass.value + waterMass.value
        );

        const volume = computed(
            () => juiceVolume.value + fructoseVolume.value + waterVolume.value
        );

        const acidsGrammsPerLitre = computed(
            () => (juiceAcidsMass.value * 1000) / volume.value
        );

        const og = computed(() => (sugarsMass.value / mass.value) * 100);

        const abvFull = computed(() => abv(platoToSg(og.value), NULL_FG));

        const abvMax = computed(() =>
            Math.min(abvFull.value, yeastMaxAbv.value)
        );

        const fg = computed(() =>
            sgToPlato(fgFromOgAbv(platoToSg(og.value), abvMax.value))
        );

        return {
            juiceMass,
            juiceSugarsMassPercents,
            juiceAcidsMassPercents,
            waterVolume,
            yeastMaxAbv,
            fructoseMass,

            acidsGrammsPerLitre,
            og,
            fg,
            abvMax,
            volume,
            mass,
        };
    },
};
</script>
