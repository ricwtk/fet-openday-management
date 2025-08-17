<script setup>
import { ref, defineAsyncComponent, computed, nextTick } from 'vue';
import Marker from "../components/Marker.svg"
import { formatTimingForDisplay } from '../utils/timeformat'
import Activity from './Activity.vue';
const props = defineProps({
  // date: String,
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

const roomsandactivity = computed(() => {
  let rooms = Object.keys(locationlist[props.building][props.floor].rooms)
  // rooms = rooms.filter(r => props.activities.map(act => act.venue[2]).includes(r))
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
    nextTick(() => {
      if (selectedDot.value.activities.length > 0) {
        dotpopover.value.show(event)
      }
    })
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
  <!-- {{ props.activities }}
  <br>
  {{ roomswithactivity }} -->
  <Card pt:root:class="self-center flex flex-center justify-center w-full max-w-5xl" v-if="props.activities">
    <!-- <div class="!w-full !max-w-5xl"> -->
      <template #content>
        <div class="relative w-full text-primary" v-if="floordata.component">
          <component :is="floordata.component" class="!w-full !h-full"/>
          <div ref="dots" class="!absolute -translate-x-1/2 -translate-y-1/2 dot" v-for="ra in roomsandactivity"
            :class="ra.activities.length > 0 ? 'text-primary' : 'text-gray-300'"
            :style="{ 'left': `${floordata.rooms[ra.room].x}%`, 'top': `${floordata.rooms[ra.room].y}%` }" 
            @click="toggleDot($event, ra)" v-tooltip="ra.room"
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
          <div><Tag :value="act.type"/> {{ act.name }}</div>
          <div>{{ formatTimingForDisplay(act.timing) }}</div>
        </div>
        <!-- <div><Button link><SquareArrowOutUpRight></SquareArrowOutUpRight></Button></div> -->
      </div>
    </div>
  </Popover>

  <DataView :value="props.activities" pt:root:class="my-3">
    <template #list="slotProps">
      <div class="flex flex-col gap-2">
        <Activity v-for="(item, index) in slotProps.items" :key="index" :activity="item"></Activity>
        <!-- <Card v-for="(item, index) in slotProps.items" :key="index">
          <template #title>
            <div class="flex flex-row gap-2">
              <span class="font-bold">{{ item.name }}</span>
              <span class="text-sm"><Tag :value="item.type" severity="primary"></Tag></span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-1">
                <MapPinned class="text-primary-400"></MapPinned>
                <Breadcrumb :model="item.venue" pt:root:class="!p-0">
                  <template #item="{ item }">
                    <span>{{ item }}</span>
                  </template>
                </Breadcrumb>
              </div>
              <div class="flex flex-row gap-1"><CalendarClock class="text-primary-400"/>{{ formatTimingForDisplay(item.timing) }}</div>
              <div class="flex flex-row gap-1"><Users class="text-primary-400"></Users>
                <Tag v-for="pic in item.pic" :value="pic" severity="secondary"></Tag>
              </div>
              <Message>{{ item.remarks ? item.remarks : "No remarks" }}</Message>
            </div>
          </template>
        </Card> -->
      </div>
    </template>
  </DataView>
</template>