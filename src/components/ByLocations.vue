<script setup>
import { Building2, Layers2 } from 'lucide-vue-next';
import { ref, computed, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  date: String,
  activities: Array,
  building: String,
  floor: String
})

const router = useRouter()

const locationlist = props.activities.reduce((loclist,activity) => {
  if (!Object.keys(loclist).includes(activity.venue[0])) {
    loclist[activity.venue[0]] = {}
  }
  if (!Object.keys(loclist[activity.venue[0]]).includes(activity.venue[1])) {
    loclist[activity.venue[0]][activity.venue[1]] = []
  }
  if (!loclist[activity.venue[0]][activity.venue[1]].includes(activity.venue[2])) {
    loclist[activity.venue[0]][activity.venue[1]].push(activity.venue[2])
  }
  return loclist
}, {})

const locationoptions = Object.keys(locationlist).sort()

const floorwidth = ref(Array(locationoptions.length).fill('0px'))
const floorrefs = useTemplateRef("floors")
const popoverloc = (ev,locidx) => {
  let buttonwidth = ev.target.offsetWidth
  floorwidth.value[locidx] = buttonwidth + 'px'
  let menu = floorrefs.value[locidx]
  menu.toggle(ev)
}
const flooroptions = computed(() => {
  return locationoptions.reduce((a,c) => {
    a[c] = Object.keys(locationlist[c]).map((floor) => ({ 
      label: floor,
      command: () => openmap(c, floor)
    }))
    return a
  }, {})
})

const openmap = (building, floor) => { console.log(building, floor)
  router.push({ name: "Floor Map", params: { building: building, floor: floor } })
}

const activitiesatthisloc = computed(() => {
  if (props.building && props.floor) {
    return props.activities.filter(act => {
      return act.venue[0] == props.building && act.venue[1] == props.floor
    })
  } else return []
})
</script>

<template>
  <Panel pt:content:class="flex flex-col justify-center">
    <!-- <div>{{ props.activities }}</div> -->
    <div class="flex flex-row justify-center">
      <template v-for="(locopt, locindex) in locationoptions">
        <Button class="mx-1" variant="outlined" @click="popoverloc($event,locindex)" aria-haspopup="true">
          <Building2></Building2>
          {{ locopt }}
        </Button>
        <Menu ref="floors" :model="flooroptions[locopt]" :popup="true" :pt="{
          'root': { 
            'style': { 
              'min-width': floorwidth[locindex] 
            } 
          },
          'itemlabel': {
            'class': ['text-primary']
          }
        }">
          <template #itemicon><span class="text-primary"><Layers2></Layers2></span></template>
        </Menu>
      </template>
    </div>
    <router-view v-slot="{ Component }">
      <component :is="Component" :activities="activitiesatthisloc"></component>
    </router-view>
  </Panel>
</template>