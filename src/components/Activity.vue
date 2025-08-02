<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { formatTimingForDisplay } from '../utils/timeformat'
import { CalendarClock, Users, MapPinned, Eye, EyeOff } from "lucide-vue-next"
const props = defineProps(["activity"])
const showMap = ref(false)

const maps = import.meta.glob('../assets/mapfiles/*.svg', {
  query: '?component',
  import: 'default',
})
import { locationlist } from "../data/locationmap";
import Marker from "../components/Marker.svg"
const floor = locationlist[props.activity.venue[0]][props.activity.venue[1]]
const mappath = `../assets/mapfiles/${floor.mapfile}`
const mapcomponent = defineAsyncComponent(maps[mappath])
</script>
<template>
  <Card>
    <template #title>
      <div class="flex flex-row gap-2 items-center">
        <span class="font-bold">{{ activity.name }}</span>
        <span class="text-sm"><Tag :value="activity.type" severity="primary"/></span>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-1 items-center">
          <MapPinned class="text-primary-400"></MapPinned>
          <Breadcrumb :model="activity.venue" pt:root:class="!p-0">
            <template #item="{ item }">
              <span>{{ item }}</span>
            </template>
          </Breadcrumb>
          <Button link class="!p-0 !text-gray-400" @click="showMap=!showMap"><EyeOff v-if="showMap"/><Eye v-else/></Button>
        </div>
        <div v-if="showMap" class="flex flex-row justify-center relative w-8/10 self-center">
          <component :is="mapcomponent" class="!w-full !h-full"/>
          <div ref="dots" class="!absolute -translate-x-1/2 -translate-y-1/2 dot text-primary"
            v-if="Object.keys(floor.rooms).includes(props.activity.venue[2])"
            :style="{ 'left': `${floor.rooms[props.activity.venue[2]].x}%`, 'top': `${floor.rooms[props.activity.venue[2]].y}%` }" 
          >
            <Marker></Marker>
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center"><CalendarClock class="text-primary-400"/>{{ formatTimingForDisplay(activity.timing) }}</div>
        <div class="flex flex-row gap-1 items-center"><Users class="text-primary-400"></Users>
          <Tag v-for="pic in activity.pic" :value="pic" severity="secondary"></Tag>
        </div>
        <Message>{{ activity.remarks ? activity.remarks : "No remarks" }}</Message>
      </div>
    </template>
  </Card>
</template>