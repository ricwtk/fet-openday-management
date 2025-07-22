<script setup>
import { defineProps, shallowRef, defineAsyncComponent } from 'vue';
const props = defineProps({
  date: String,
  building: String,
  floor: String
})

import { locationlist } from "../data/locationmap";
var floordata = locationlist[props.building][props.floor]
floordata.mapfilepath = new URL(`../assets/mapfiles/${floordata.mapfile}`, import.meta.url).href
floordata.component = shallowRef( defineAsyncComponent(async () => { 
  const mod = import(/* @vite-ignore */`${floordata.mapfilepath}?component`)
  return mod.default
}) )
console.log(floordata)

</script>
<template>
  Floor map {{ building }} {{ floor }}
  <component v-if="floordata.component" :is="floordata.component" class="!w-full !h-full"/>
</template>