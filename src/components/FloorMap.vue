<script setup>
import { defineProps, ref, defineAsyncComponent } from 'vue';
import Marker from "../components/Marker.svg"
const props = defineProps({
  date: String,
  building: String,
  floor: String,
  activities: Array
})

const maps = import.meta.glob('../assets/mapfiles/*.svg', {
  query: '?component',
  import: 'default',
})

import { locationlist } from "../data/locationmap";
var floordata = locationlist[props.building][props.floor]
floordata.mapfilepath = `../assets/mapfiles/${floordata.mapfile}`
// floordata.mapfilepath = new URL(`../assets/mapfiles/${floordata.mapfile}`, import.meta.url).href
floordata.component = defineAsyncComponent(maps[floordata.mapfilepath])
// floordata.component = shallowRef( defineAsyncComponent(async () => { 
//   const mod = import(/* @vite-ignore */`${floordata.mapfilepath}?component`)
//   return mod.default
// }) )
console.log(floordata)

const maphierarchy = ref([
  { label: props.building },
  { label: props.floor },
])

</script>
<template>
  <Breadcrumb :model="maphierarchy" :pt="{ 
    'itemLabel': {'class': '!cursor-default' }
  }"/>
  {{ props.activities }}
  <Card pt:root:class="self-center flex flex-center justify-center w-full max-w-5xl" v-if="props.activities">
    <!-- <div class="!w-full !max-w-5xl"> -->
      <template #content>
        <div class="relative w-full text-primary" v-if="floordata.component">
          <component :is="floordata.component" class="!w-full !h-full"/>
          <template v-for="{ venue } in props.activities">
            <div ref="dots" class="!absolute -translate-x-1/2 -translate-y-1/2 dot" 
              v-if="floordata.rooms[venue[2]]"
              :style="{ 'left': `${floordata.rooms[venue[2]].x}%`, 'top': `${floordata.rooms[venue[2]].y}%` }" 
            >
              <Marker></Marker>
            </div>
          </template>
        </div>

        <!-- <component v-if="floordata.component" :is="floordata.component" class="!w-full !h-full"/> -->
      </template>
    <!-- </div> -->
  </Card>
</template>