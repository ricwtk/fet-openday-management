<script setup>
import { defineProps, ref, defineAsyncComponent, computed, nextTick } from 'vue';
import Marker from "../components/Marker.svg"
import { formatTimingForDisplay } from '../utils/timeformat'
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
import { SquareArrowOutUpRight } from 'lucide-vue-next';
const floordata = computed(() => {
  let x = locationlist[props.building][props.floor]
  x.mapfilepath = `../assets/mapfiles/${x.mapfile}`
  x.component = defineAsyncComponent(maps[x.mapfilepath])
  return x
})
console.log(floordata)

const roomswithactivity = computed(() => {
  let rooms = Object.keys(locationlist[props.building][props.floor].rooms)
  rooms = rooms.filter(r => props.activities.map(act => act.venue[2]).includes(r))
  rooms = rooms.map(r => ({ room: r, activities: props.activities.filter(act => act.venue[2] == r) }))
  return rooms
})

const maphierarchy = computed(() => [
  { label: props.building },
  { label: props.floor },
])

const dotpopover = ref()
const selectedDot = ref({})
const toggleDot = (event, roomact) => {
  dotpopover.value.hide()
  if (selectedDot.value?.room == roomact.room) {
    selectedDot.value = null
  } else {
    selectedDot.value = roomact

    nextTick(() => dotpopover.value.show(event))
  }
}

// const zpad = (v,n=2) => ("0".repeat(n-1) + v).slice(-n)
// const getDateString = (tprl) => { return `${tprl.year}-${zpad(tprl.month)}-${zpad(tprl.day)}` }
// const getTimeString = (tprl) => { return `${zpad(tprl.hour)}:${zpad(tprl.minute)}` }
// const getDateTimeString = (tprl) => { return `${getDateString(tprl)} ${getTimeString(tprl)}` }
// const formatTimingForDisplay = (timestr) => {
//   let timing = timestr.map(t => Temporal.PlainDateTime.from(t))
//   if (timing.length == 1) { return getDateString(timing[0])}
//   else {
//     let startstring = getDateTimeString(timing[0])
//     let endstring = getDateTimeString(timing[1])
//     let start = timing[0].toPlainDate()
//     let end = timing[1].toPlainDate()
//     if (start.equals(end)) { endstring = getTimeString(timing[1]) }
//     return `${startstring} - ${endstring}`
//   }
// }

</script>
<template>
  <Breadcrumb :model="maphierarchy" :pt="{ 
    'itemLabel': {'class': '!cursor-default' }
  }"/>
  {{ props.activities }}
  <br>
  {{ roomswithactivity }}
  <Card pt:root:class="self-center flex flex-center justify-center w-full max-w-5xl" v-if="props.activities">
    <!-- <div class="!w-full !max-w-5xl"> -->
      <template #content>
        <div class="relative w-full text-primary" v-if="floordata.component">
          <component :is="floordata.component" class="!w-full !h-full"/>
          <div ref="dots" class="!absolute -translate-x-1/2 -translate-y-1/2 dot" v-for="ra in roomswithactivity"
            :style="{ 'left': `${floordata.rooms[ra.room].x}%`, 'top': `${floordata.rooms[ra.room].y}%` }" 
            @click="toggleDot($event, ra)"
          >
            <Marker></Marker>
          </div>
        </div>

        <!-- <component v-if="floordata.component" :is="floordata.component" class="!w-full !h-full"/> -->
      </template>
    <!-- </div> -->
  </Card>
  <Popover ref="dotpopover">
    <div>
      <div class="font-bold">{{ selectedDot.room }}</div>
      <div v-for="act in selectedDot.activities" class="flex flex-row items-center gap-1">
        <div class="flex flex-col">
          <div><Chip :label="act.type"/> {{ act.name }}</div>
          <div>{{ formatTimingForDisplay(act.timing) }}</div>
        </div>
        <div><Button link><SquareArrowOutUpRight></SquareArrowOutUpRight></Button></div>
      </div>
    </div>
  </Popover>
</template>