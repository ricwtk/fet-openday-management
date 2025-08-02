<script setup>
import MainStructure from '../components/MainStructure.vue';
</script>

<template>
  <MainStructure>
    <template #main="slotProps">
      123{{ slotProps }}
    </template>
  </MainStructure>
</template>