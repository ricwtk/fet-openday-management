<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  building: String,
  floor: String
})
</script>
<template>
  Floor map {{ building }} {{ floor }}
</template>