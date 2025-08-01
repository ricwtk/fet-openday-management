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
const mappath = `../assets/mapfiles/${locationlist[props.activity.venue[0]][props.activity.venue[1]].mapfile}`
const mapcomponent = defineAsyncComponent(maps[mappath])
</script>
<template>
  <Card>
    <template #title>
      <div class="flex flex-row gap-2">
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
        <div v-if="showMap" class="flex flex-row justify-center">
          <component :is="mapcomponent" class="!w-8/10 !h-full"/>
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