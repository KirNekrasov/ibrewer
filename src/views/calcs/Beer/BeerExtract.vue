<template>
    <h4>Beer From Extract</h4>

    <h5>Raw Materials</h5>

    <form>
        <div>Extract hopped, kg</div>
        <label>
            <input type="radio" value="apa" v-model.number="type" /> IPA
        </label>
        <label>
            <input type="radio" value="ipa" v-model.number="type" /> APA
        </label>
        <label>
            <input type="radio" value="other" v-model.number="type" /> Other
        </label>

        <div>Extract hopped, kg</div>
        <input type="number" v-model.number="extractHoppedMassKg" />

        <div>Extract unhopped, kg</div>
        <input type="number" v-model.number="extractUnhoppedMassKg" />

        <div>Water, L</div>
        <input type="number" v-model.number="additionalWaterVolumeL" />
    </form>

    <h5>Result</h5>

    <p>OG, {{ ogPlato.toFixed(1) }} °P</p>
    <p>FG, {{ fgPlato.toFixed(1) }} °P</p>
    <p>ABV, {{ abv.toFixed(1) }} °P</p>
    <p>Volume, {{ volumeL.toFixed(1) }} L</p>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

import { sgToPlato, densityFromOgSgKgL, sugarsKgFromOgPlato } from '@/utils';

export default {
    setup() {
        const type = ref('apa');

        const extractHoppedMassKg = ref(2.1);
        const extractUnhoppedMassKg = ref(1);
        const additionalWaterVolumeL = ref(18);

        // --- IPA ---

        const ipaExtractHoppedMassKg = 2.1;
        const ipaExtractUnhoppedMassKg = 1;

        const ipaOgSgMin = 1.048;
        const ipaOgSgMax = 1.057;

        const ipaFgSgMin = 1.012;
        const ipaFgSgMax = 1.02;

        const ipaAbvMin = 5;
        const ipaAbvMax = 5.5;

        const ipaVolumeL = 23;

        const ipaDensityKgLMin = densityFromOgSgKgL(ipaOgSgMin);
        const ipaDensityKgLMax = densityFromOgSgKgL(ipaOgSgMax);

        const ipaOgPlatoMin = sgToPlato(ipaOgSgMin);
        const ipaOgPlatoMax = sgToPlato(ipaOgSgMax);

        const ipaMassKgMin = ipaDensityKgLMin * ipaVolumeL;
        const ipaMassKgMax = ipaDensityKgLMax * ipaVolumeL;

        const ipaSugarsMassKgMin = sugarsKgFromOgPlato(
            ipaOgPlatoMin,
            ipaMassKgMin
        );
        const ipaSugarsMassKgMax = sugarsKgFromOgPlato(
            ipaOgPlatoMax,
            ipaMassKgMax
        );

        console.log(ipaSugarsMassKgMin, ipaSugarsMassKgMax);

        // ---

        const ogPlato = computed(() => 0);
        const fgPlato = computed(() => 0);
        const abv = computed(() => 0);
        const volumeL = computed(() => 0);

        return {
            type,
            extractHoppedMassKg,
            extractUnhoppedMassKg,
            additionalWaterVolumeL,
            ogPlato,
            fgPlato,
            abv,
            volumeL,
        };
    },
};
</script>
