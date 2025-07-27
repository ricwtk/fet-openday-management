<script setup>
import { ref,computed,useTemplateRef, onMounted, watch, defineProps } from "vue"
import { Building2, Layers2, Milestone } from 'lucide-vue-next';
import { Breadcrumb, TabList } from "primevue";
import { useRoute, useRouter } from "vue-router";

import TopBar from "./components/Topbar.vue";

// import FetlabsB1 from "./assets/mapfiles/fetlabs-B1.svg?component"

import { activitylist } from "./data/activities";

const props = defineProps({
  date: String,
  building: String,
  floor: String
})

const router = useRouter()
// router.afterEach((to, from) => {
//   console.log(to.params)
//   if (to.params.date) selectedday.value = to.params.date
//   if (to.params.mode) selectedstructure.value = to.params.mode
//   currentpagenavigationpath.value = [to.params.date, to.params.mode, to.params.main, to.params.sub].map(x => ({ "label": x }))
// })

onMounted(() => {
  if (props.date == "") {
    selectedday.value = dayoptions[0]
  }
})

const dayoptionobjects = activitylist.map(activity => activity.timing.map(t => Temporal.PlainDate.from(t))).flat().filter((val, idx, self) => {
  return self.findIndex(v => (v.toString() == val.toString()) ) == idx
})
const dayoptions = dayoptionobjects.map(x => x.toString())
const selectedday = ref(props.date)
watch(selectedday, (newV) => {
  if (selectedstructure.value) router.push({ name: selectedstructure.value.name, params: { date: newV } }) 
  else router.push(`/${newV}`)
})

const moderoutes = router.getRoutes().filter(r => {
  let pathparts = r.path.split("/")
  return (pathparts.length == 3 && pathparts[1] == ":date?")
})
const structureoptions = moderoutes
const selectedstructure = ref(moderoutes.find(r => r.name == router.currentRoute.value.name))
watch(selectedstructure, (newV) => {
  router.push({ name: newV.name, params: { date: props.date } })
})

// import { locationlist } from "./data/locationmap";
// const locationlistondate = computed(() => activitylistondate.value.reduce((loclist,activity) => {
//   if (!Object.keys(loclist).includes(activity.venue[0])) {
//     loclist[activity.venue[0]] = {}
//   }
//   if (!Object.keys(loclist[activity.venue[0]]).includes(activity.venue[1])) {
//     loclist[activity.venue[0]][activity.venue[1]] = []
//   }
//   if (!loclist[activity.venue[0]][activity.venue[1]].includes(activity.venue[2])) {
//     loclist[activity.venue[0]][activity.venue[1]].push(activity.venue[2])
//   }
//   return loclist
// }, {}))
// const locationoptions = computed(() => Object.keys(locationlistondate.value).sort())
// const selectedlocation = ref("")
// selectedlocation.value = locationoptions[0]

// const floorwidth = ref(Array(locationoptions.length).fill('0px'))
// const floorrefs = useTemplateRef("floors")
// const popoverloc = (ev,locidx) => {
//   let buttonwidth = ev.target.offsetWidth
//   floorwidth.value[locidx] = buttonwidth + 'px'
//   let menu = floorrefs.value[locidx]
//   menu.toggle(ev)
// }
// const flooroptions = computed(() => {
//   return locationoptions.value.reduce((a,c) => {
//     a[c] = Object.keys(locationlistondate.value[c]).map((floor) => ({ 'label': floor }))
//     return a
//   }, {})
// })

const activitylistondate = computed(() => activitylist.filter(activity => {
  if (selectedday.value) {
    let currentday = dayoptionobjects[dayoptions.indexOf(selectedday.value)]
    let timing = activity.timing.map(t => Temporal.PlainDate.from(t))
    if (timing.length > 1) {
      return (Temporal.PlainDate.compare(timing[0], currentday) == 0) 
      || (Temporal.PlainDate.compare(timing[1], currentday) == 0) 
      || ((Temporal.PlainDate.compare(timing[0], currentday) == -1) && (Temporal.PlainDate.compare(timing[1], currentday) == 1)) 
    } else {
      return (Temporal.PlainDate.compare(timing[0], currentday) == 0)
    }
  } else {
    return true
  }
}))

// const acttypeoptions = computed(() => activitylistondate.value.reduce((acc,activity) => {
//   if (!acc.includes(activity.type)) {
//     acc.push(activity.type)
//   }
//   return acc
// }, []))
// const activitywidth = ref(Array(acttypeoptions.length).fill('0px'))
// const activityrefs = useTemplateRef("activities")
// const popoveract = (ev,acttypeidx) => {
//   let buttonwidth = ev.target.offsetWidth
//   activitywidth.value[acttypeidx] = buttonwidth + 'px'
//   let menu = activityrefs.value[acttypeidx]
//   menu.toggle(ev)
// }
// const activityoptions = computed(() => {
//   let addedtypes = []
//   return activitylistondate.value.reduce((a,c) => {
//     if (!addedtypes.includes(c.type)) {
//       a[c.type] = []
//       addedtypes.push(c.type)
//     }
//     a[c.type].push({ "label": c.name })
//     return a
//   }, {})
// })

// const currentpagenavigationpath = ref([])
</script>

<template>
  <div class="w-100% mt-2 flex justify-center gap-2">
    <SelectButton v-model="selectedday" :options="dayoptions" :allowEmpty="false" pt:pctogglebutton:root:class="!text-primary !bg-primary-100 !border-primary-100 !font-bold"></SelectButton>
    <SelectButton v-if="selectedday" v-model="selectedstructure" :options="structureoptions" optionLabel="name" :allowEmpty="false" pt:pctogglebutton:root:class="!text-primary !bg-primary-100 !border-primary-100 !font-bold"></SelectButton>
  </div>
  <router-view v-slot="{ Component }" class="mt-2">
    <component :is="Component" :activities="activitylistondate"></component>
  </router-view>
  <!-- <Tabs v-model:value="selectedstructure" class="mt-2" >
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
  </Tabs> -->

  <!-- <Breadcrumb pt:root:class="!bg-primary rounded" :model="currentpagenavigationpath" 
  :pt="{ 
    'itemLabel': {'class': 'text-white font-bold' }, 
    'separator': { 'class': '!text-white' } ,
  }">
    <template #separator> / </template>
  </Breadcrumb> -->

  <!-- <Card>
    <template #title>FET Labs / B1</template>
    <template #content>
      <div class="flex justify-center">
        <div class="relative">
          <FetlabsB1></FetlabsB1>
          <Button class="!absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">abc</Button>
        </div>
      </div>
    </template>
  </Card> -->
</template>