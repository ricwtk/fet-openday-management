<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  activities: Array
})
</script>
<template>
  <Panel>
    {{ props.activities }}
  </Panel>
</template>