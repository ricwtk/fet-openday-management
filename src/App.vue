<script setup>
import { ref,computed,useTemplateRef } from "vue"
import { Building2, Layers2, Milestone } from 'lucide-vue-next';
import { TabList } from "primevue";
const dayoptions = ["2025-08-23", "2025-08-24"]
const selectedday = ref("")
selectedday.value = dayoptions[0]

const structureoptions = ["Locations", "Activities"]
const selectedstructure = ref("")
selectedstructure.value = structureoptions[0]

import { locationlist } from "./data/locationmap";
const locationoptions = computed(() => Object.keys(locationlist).sort())
const selectedlocation = ref("")
selectedlocation.value = locationoptions[0]

const floorwidth = ref(Array(locationoptions.length).fill('0px'))
const floorrefs = useTemplateRef("floors")
const popoverloc = (ev,locidx) => {
  let buttonwidth = ev.target.offsetWidth
  floorwidth.value[locidx] = buttonwidth + 'px'
  let menu = floorrefs.value[locidx]
  menu.toggle(ev)
}
const flooroptions = computed(() => {
  return locationoptions.value.reduce((a,c) => {
    a[c] = Object.keys(locationlist[c]).map((floor) => ({ 'label': floor }))
    return a
  }, {})
})

import { activitylist } from "./data/activities";
const acttypeoptions = computed(() => activitylist.reduce((acc,activity) => {
  if (!acc.includes(activity.type)) {
    acc.push(activity.type)
  }
  return acc
}, []))
const activitywidth = ref(Array(acttypeoptions.length).fill('0px'))
const activityrefs = useTemplateRef("activities")
const popoveract = (ev,acttypeidx) => {
  let buttonwidth = ev.target.offsetWidth
  activitywidth.value[acttypeidx] = buttonwidth + 'px'
  let menu = activityrefs.value[acttypeidx]
  menu.toggle(ev)
}
const activityoptions = computed(() => {
  let addedtypes = []
  return activitylist.reduce((a,c) => {
    if (!addedtypes.includes(c.type)) {
      a[c.type] = []
      addedtypes.push(c.type)
    }
    a[c.type].push({ "label": c.name })
    return a
  }, {})
})
</script>

<template>
  <div class="p-2 w-100% rounded bg-primary-100 text-center text-primary">
    <b>FET Open Day Management</b>
  </div>
  <div class="w-100% mt-2 flex justify-center">
    <SelectButton v-model="selectedday" :options="dayoptions" :allowEmpty="false" pt:pctogglebutton:root:class="!text-primary !bg-primary-100 !font-bold"></SelectButton>
  </div>
  <Tabs v-model:value="selectedstructure" class="mt-2" >
    <TabList pt:tabList:class="justify-center">
      <Tab v-for="structopt in structureoptions" :value="structopt">{{ structopt }}</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="Locations" class="flex justify-center">
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
      </TabPanel>
      <TabPanel value="Activities" class="flex justify-center">
        <template v-for="(acttypeopt, acttypeindex) in acttypeoptions">
          <Button class="mx-1" variant="outlined" @click="popoveract($event,acttypeindex)" aria-haspopup="true">
            <Milestone></Milestone>
            {{ acttypeopt }}
          </Button>
          <Menu ref="activities" :model="activityoptions[acttypeopt]" :popup="true" :pt="{
            'root': { 
              'style': { 
                'min-width': activitywidth[acttypeindex] 
              } 
            },
            'itemlabel': {
              'class': ['text-primary']
            }
          }">
            <template #itemicon><span class="text-primary"><Layers2></Layers2></span></template>
          </Menu>
        </template>
      </TabPanel>
    </TabPanels>
  </Tabs>

  <!-- <div class="sidebar bg-primary-200 rounded-sm p-2 m-2"></div> -->
    <!-- <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>

<style lang="css" scoped>
.topbar {
  /* height: 4rem; */
}

.sidebar {
  position: fixed;
  width: 20rem;
  height: calc(100vh - 8rem);
  z-index: 999;
  overflow-y: auto;
  user-select: none;
  /* top: 6rem; */
  /* left: 2rem; */
}
</style>
