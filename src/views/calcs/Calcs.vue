<template>
    <div class="ibrewer-calcs">
        <p>You can find different calculators here.</p>

        <h2>Cider calculator</h2>
        <Cider />
    </div>
</template>

<script lang="ts">
import Cider from './Cider';

export default {
    components: { Cider },
};
</script>
