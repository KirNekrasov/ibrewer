<template>
    <h4>Cider Parameters (FG, ABV etc.)</h4>

    <h5>Raw Materials</h5>

    <form>
        <div>Juice, kg</div>
        <input type="number" v-model.number="juiceMassKg" />

        <div>Juice sugars, %</div>
        <input type="number" v-model.number="juiceSugarsMassPercents" />

        <div>Juice acids, %</div>
        <input type="number" v-model.number="juiceAcidsMassPercents" />

        <div>Water, L</div>
        <input type="number" v-model.number="additionalWaterVolume" />

        <div>Yeast max ABV, %</div>
        <input type="number" v-model.number="yeastMaxAbv" />

        <div>Fructose, kg</div>
        <input type="number" v-model.number="fructoseMassKg" />
    </form>

    <h5>Initial</h5>

    <p>Acids, {{ acidsGrammsPerLitreBeforeFermentation.toFixed(1) }} g/L</p>
    <p>Acids, {{ acidsPercentsBeforeFermentation.toFixed(2) }}%</p>
    <p>Acids, {{ acidsMolesBeforeFermentation.toFixed(2) }} mol</p>
    <p>pH, {{ pHBeforeFermentation.toFixed(1) }} (???)</p>
    <p>OG, {{ og.toFixed(1) }} °P</p>
    <p>Mass, {{ massBeforeFermentationKg.toFixed(1) }} kg</p>
    <p>Volume, {{ volumeBeforeFermentation.toFixed(1) }} L</p>

    <h5>Before Carbonization</h5>

    <p>FG, {{ fgBeforeCarbon.toFixed(1) }} °P</p>
    <p>ABV, {{ abvBeforeCarbon.toFixed(1) }}%</p>
    <p>Mass, {{ massFinal.toFixed(1) }} kg</p>

    <h5>After Carbonization</h5>

    <p>FG, {{ fgFinal.toFixed(1) }} °P</p>
    <p>ABV, {{ abvFinal.toFixed(1) }}%</p>
    <p>Mass, {{ massFinal.toFixed(1) }} kg</p>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

import {
    platoToSg,
    abv,
    DRY_FG,
    fgFromOgAbv,
    FRUCTOSE_DENSITY,
    FRUIT_ACID_DENSITY,
    sgToPlato,
    FRUIT_ACID_G_MOL,
    pHFruits,
    CO2_GRAMMS_PER_LITER_OPTIMAL,
    ETHANOL_DENSITY,
    ETHANOL_G_MOL,
    CO2_G_MOL,
} from '@/utils';

export default {
    setup() {
        const juiceMassKg = ref(10);
        const juiceSugarsMassPercents = ref(70);
        const juiceAcidsMassPercents = ref(2.8);
        const additionalWaterVolume = ref(40);
        const yeastMaxAbv = ref(11);
        const fructoseMassKg = ref(4);

        const juiceSugarsMassKg = computed(
            () => (juiceMassKg.value * juiceSugarsMassPercents.value) / 100
        );

        const juiceSugarsVolume = computed(
            () => juiceSugarsMassKg.value / FRUCTOSE_DENSITY
        );

        const juiceAcidsMassKg = computed(
            () => (juiceMassKg.value * juiceAcidsMassPercents.value) / 100
        );

        const juiceAcidsVolume = computed(
            () => juiceAcidsMassKg.value / FRUIT_ACID_DENSITY
        );

        const juiceWaterMassKg = computed(
            () =>
                juiceMassKg.value -
                juiceSugarsMassKg.value -
                juiceAcidsMassKg.value
        );

        const juiceVolume = computed(
            () =>
                juiceSugarsVolume.value +
                juiceAcidsVolume.value +
                juiceWaterMassKg.value
        );

        const massBeforeFermentationKg = computed(
            () =>
                juiceMassKg.value +
                fructoseMassKg.value +
                additionalWaterVolume.value
        );

        const volumeBeforeFermentation = computed(
            () =>
                juiceVolume.value +
                fructoseMassKg.value / FRUCTOSE_DENSITY +
                additionalWaterVolume.value
        );

        const acidsGrammsPerLitreBeforeFermentation = computed(
            () =>
                (juiceAcidsMassKg.value * 1000) / volumeBeforeFermentation.value
        );

        const acidsMolesBeforeFermentation = computed(
            () => acidsGrammsPerLitreBeforeFermentation.value / FRUIT_ACID_G_MOL
        );

        const acidsPercentsBeforeFermentation = computed(
            () =>
                (juiceAcidsMassKg.value / massBeforeFermentationKg.value) * 100
        );

        const pHBeforeFermentation = computed(() =>
            pHFruits(acidsMolesBeforeFermentation.value)
        );

        const og = computed(
            () =>
                ((juiceSugarsMassKg.value + fructoseMassKg.value) /
                    massBeforeFermentationKg.value) *
                100
        );

        const abvFinal = computed(() =>
            Math.min(abv(platoToSg(og.value), DRY_FG), yeastMaxAbv.value)
        );

        const co2CarbonMassGramms = computed(
            () => CO2_GRAMMS_PER_LITER_OPTIMAL * volumeBeforeFermentation.value
        );

        const alcoholTotalVolume = computed(
            () => (abvFinal.value * volumeBeforeFermentation.value) / 100
        );

        const abvBeforeCarbon = computed(() => {
            const co2CarbonMoles = co2CarbonMassGramms.value / CO2_G_MOL;

            const alcoholCarbonMoles = co2CarbonMoles;
            const alcoholCarbonMassKg =
                (alcoholCarbonMoles * ETHANOL_G_MOL) / 1000;
            const alcoholCarbonVolume = alcoholCarbonMassKg / ETHANOL_DENSITY;

            const alcoholBeforeCarbonVolume =
                alcoholTotalVolume.value - alcoholCarbonVolume;

            return (
                (alcoholBeforeCarbonVolume / volumeBeforeFermentation.value) *
                100
            );
        });

        const fgBeforeCarbon = computed(() =>
            sgToPlato(fgFromOgAbv(platoToSg(og.value), abvBeforeCarbon.value))
        );

        const massFinal = computed(() => {
            const alcoholTotalMoles =
                (alcoholTotalVolume.value * ETHANOL_DENSITY * 1000) /
                ETHANOL_G_MOL;
            const co2TotalMoles = alcoholTotalMoles;
            const co2TotalMassKg = (co2TotalMoles * CO2_G_MOL) / 1000;

            return (
                massBeforeFermentationKg.value -
                co2TotalMassKg +
                co2CarbonMassGramms.value / 1000
            );
        });

        const fgFinal = computed(() =>
            sgToPlato(fgFromOgAbv(platoToSg(og.value), abvFinal.value))
        );

        return {
            juiceMassKg,
            juiceSugarsMassPercents,
            juiceAcidsMassPercents,
            additionalWaterVolume,
            yeastMaxAbv,
            fructoseMassKg,

            acidsGrammsPerLitreBeforeFermentation,
            acidsMolesBeforeFermentation,
            acidsPercentsBeforeFermentation,
            pHBeforeFermentation,
            og,
            massBeforeFermentationKg,
            volumeBeforeFermentation,

            fgBeforeCarbon,
            abvBeforeCarbon,
            massFinal,

            fgFinal,
            abvFinal,
        };
    },
};
</script>
