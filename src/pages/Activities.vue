<script setup>
import ByActivities from '../components/ByActivities.vue';
import MainStructure from '../components/MainStructure.vue';
</script>

<template>
  <MainStructure>
    <template #main="slotProps">
      <ByActivities :activities="slotProps.activities" class="!w-full !max-w-5xl">
      </ByActivities>
    </template>
  </MainStructure>
</template>