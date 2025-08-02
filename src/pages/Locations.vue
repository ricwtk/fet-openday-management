<script setup>
import ByLocations from '../components/ByLocations.vue';
import MainStructure from '../components/MainStructure.vue';
</script>

<template>
  <MainStructure>
    <template #main="slotProps">
      <ByLocations :activities="slotProps.activities" class="!w-full !max-w-5xl">
      </ByLocations>
    </template>
  </MainStructure>
</template>