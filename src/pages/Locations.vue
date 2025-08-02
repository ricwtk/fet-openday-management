<script setup>
import ByLocations from '../components/ByLocations.vue';
import MainStructure from '../components/MainStructure.vue';
</script>

<template>
  <MainStructure>
    <template #main="slotProps">
      <ByLocations :activities="slotProps.activities">
      </ByLocations>
    </template>
  </MainStructure>
</template>