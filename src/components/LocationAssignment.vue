<script setup>
import { defineAsyncComponent, ref, watch, shallowRef, computed } from "vue";
import { locationlist } from "../data/locationmap";
import { useRoute } from "vue-router";
import { Circle, CircleDot, MapPinMinusInside } from 'lucide-vue-next';

console.log(locationlist)
const buildings = ref(Object.keys(locationlist).map(bname => {
  let b = {}
  b.bname = bname
  b.floors = Object.keys(locationlist[bname]).map(fname => {
    let f = {}
    f.fname = fname
    f.parent = b
    f.mapfile = locationlist[bname][fname].mapfile
    f.mapfilepath = new URL(`../assets/mapfiles/${f.mapfile}`, import.meta.url).href
    f.rooms = "rooms" in Object.keys(locationlist[bname][fname]) ? locationlist[bname][fname].rooms : {}
    f.component = shallowRef( defineAsyncComponent(() => import(/* @vite-ignore */f.mapfilepath)) )
    return f
  })
  return b
}))

const route = useRoute()

const selectedfloor = ref()

const addCoordinate = (event) => {
  if (event.target.classList.toString().includes("lucide") || event.target.tagName != "svg") { return }
  const xcoord = event.offsetX;
  const ycoord = event.offsetY;
  const { width, height } = event.target.getBoundingClientRect()
  let newroomname = findUniqueRoomName(Object.keys(selectedfloor.value.rooms))
  selectedfloor.value.rooms[newroomname] = {
    "x": xcoord/width,
    "y": ycoord/height
  }
}

const findUniqueRoomName = (allroomnames) => {
  let idx = 0, newroomname
  do {
    idx += 1
    newroomname = `Room${idx}`
  } while (allroomnames.includes(newroomname))
  return newroomname
}

const coordinateTableData = computed(() => {
  return Object.keys(selectedfloor.value.rooms).map((room) => ({
    "name": room,
    "x": Math.round(selectedfloor.value.rooms[room].x*10000)/100,
    "y": Math.round(selectedfloor.value.rooms[room].y*10000)/100
  }))
})

const columndefinition = {
  'columnheadercontent': { 'class': '!justify-center'},
  'bodycell': { 'class': '!text-center' },
  'headercell': { 'class': '!bg-primary !text-white' },
  
}
</script>

<template>
  <FieldSet class="text-center" :legend="route.name">
    <CascadeSelect placeholder="Select a floor" :options="buildings" optionLabel="fname" optionGroupLabel="bname" :optionGroupChildren="['floors']" v-model="selectedfloor"/>

    <div class="flex flex-col align-center gap-2" v-if="selectedfloor">
      <div class="relative self-center w-full md:w-8/10 xl:w-6/10 text-primary" @click="addCoordinate">
        <component :is="selectedfloor.component" class="!w-full !h-full"/>
        <div ref="dots" class="!absolute -translate-x-1/2 -translate-y-1/2 dot" v-for="{ x, y } in coordinateTableData" :style="{ 'left': `${x}%`, 'top': `${y}%` }"><CircleDot></CircleDot></div>
      </div>
      <div>
        <DataTable :value="coordinateTableData" tableStyle="min-width: 50rem">
          <Column field="name" header="Name" :pt="columndefinition"></Column>
          <Column field="x" header="% from left" :pt="columndefinition"></Column>
          <Column field="y" header="% from top" :pt="columndefinition"></Column>
          <Column header="Delete" :pt="columndefinition">
            <template #body>
              <Button variant="link"><MapPinMinusInside/></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </FieldSet>
</template>

<style scoped>
@reference "tailwindcss";

::v-deep(.p-datatable .p-datatable-tbody > tr:hover) {
  @apply cursor-pointer bg-gray-100;
}

::v-deep(.dot:hover) {
  @apply text-orange-400
}
</style>