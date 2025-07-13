<script setup>
import { defineAsyncComponent, ref, watch, shallowRef, computed } from "vue";
import { locationlist } from "../data/locationmap";
import { useRoute } from "vue-router";
import { Circle, CircleDot, MapPinMinusInside } from 'lucide-vue-next';
import Marker from "../components/Marker.svg"

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
    f.rooms = Object.keys(locationlist[bname][fname]).includes('rooms') ? locationlist[bname][fname].rooms : {}
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
    "x": Math.round(xcoord/width*10000)/100,
    "y": Math.round(ycoord/height*10000)/100
  }
  console.log(prettyRoomsJSON.value)
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
  return Object.keys(selectedfloor.value.rooms).sort().map((room) => ({
    "name": room,
    "x": selectedfloor.value.rooms[room].x,
    "y": selectedfloor.value.rooms[room].y
  }))
})

const columndefinition = {
  'columnheadercontent': { 'class': '!justify-center'},
  'bodycell': { 'class': '!text-center w-1/4' },
  'headercell': { 'class': '!bg-primary !text-white' },
}

const onNameUpdated = (evdata) => {
  let originalroomname = evdata.value
  let newroomname = evdata.newValue
  if (Object.keys(selectedfloor.value.rooms).includes(newroomname)) {
    console.log(`Room name ${newroomname} duplicated. Room ${originalroomname} remain as is`)
  } else {
    selectedfloor.value.rooms[newroomname] = selectedfloor.value.rooms[originalroomname]
    delete selectedfloor.value.rooms[originalroomname]
  }
}

const deleteRoom = (roomname) => {
  delete selectedfloor.value.rooms[roomname]
}

const markermenu = ref()
const selectedMarkerRoomName = ref()
const onRightClickMarker = (event, roomname) => {
  selectedMarkerRoomName.value = roomname
  markermenu.value.show(event)
}
const markerContextItems = ref([
  {
    label: "Delete",
    icon: "",
    command: () => { deleteRoom(selectedMarkerRoomName.value) }
  }
])

const prettyRoomsJSON = computed(() => JSON.stringify(selectedfloor.value.rooms,null,2))
</script>

<template>
  <!-- <div>{{ buildings }}</div> -->
  <FieldSet class="text-center" :legend="route.name">
    <CascadeSelect placeholder="Select a floor" :options="buildings" optionLabel="fname" optionGroupLabel="bname" :optionGroupChildren="['floors']" v-model="selectedfloor"/>

    <div class="flex flex-col align-center gap-2 mt-2" v-if="selectedfloor">
      <div class="relative self-center w-full md:w-8/10 xl:w-6/10 text-primary" @click="addCoordinate">
        <component :is="selectedfloor.component" class="!w-full !h-full"/>
        <div ref="dots" class="!absolute -translate-x-1/2 -translate-y-1/2 dot" 
        v-for="{ name, x, y } in coordinateTableData" :style="{ 'left': `${x}%`, 'top': `${y}%` }" 
        v-tooltip.right="{ value: name }"
        @contextmenu="onRightClickMarker($event,name)"
        >
          <!-- <CircleDot></CircleDot> -->
          <Marker></Marker>
        </div>
      </div>
      <Message severity="warn">The location assignments are not automatically saved. Copy the JSON object (at the bottom of the page) and update the locationmap.js for persistent data.</Message>
      <DataTable :value="coordinateTableData" tableStyle="min-width: 50rem" editMode="cell" @cell-edit-complete="onNameUpdated">
        <Column field="name" header="Name" :pt="columndefinition">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus fluid />
          </template>
        </Column>
        <Column field="x" header="% from left" :pt="columndefinition"></Column>
        <Column field="y" header="% from top" :pt="columndefinition"></Column>
        <Column header="Delete" :pt="columndefinition">
          <template #body="{ data, field }">
            <Button variant="link" @click="deleteRoom(data.name)"><MapPinMinusInside/></Button>
          </template>
        </Column>
      </DataTable>
      <Panel :header="`JSON object for ${selectedfloor.fname}`">
        <code class="text-start"><pre style="background-color:black" class="text-white p-2 rounded">{{ `"${selectedfloor.fname}": `+prettyRoomsJSON }}</pre></code>
      </Panel>
    </div>
  </FieldSet>
  <ContextMenu ref="markermenu" :model="markerContextItems" @hide="selectedMarkerRoomName = null"></ContextMenu>
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