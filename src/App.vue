<script setup>
import { ref,computed,useTemplateRef } from "vue"
import { Building2, Layers2 } from 'lucide-vue-next';
import { TabList } from "primevue";
const dayoptions = ["2025-08-23", "2025-08-24"]
const selectedday = ref("")
selectedday.value = dayoptions[0]

const structureoptions = ["Locations", "Activities"]
const selectedstructure = ref("")
selectedstructure.value = structureoptions[0]

const locationlist = {
  "FET Labs": {
    "L2": "map-filename",
    "L1": "map-filename",
    "G": "map-filename",
    "B1": "map-filename",
    "B2": "map-filename"
  },
  "University Building": {
    "L3": "map-filename"
  },
  "Graduate Centre": {
    "G": "map-filename",
    "LG": "map-filename",
  }
}
const locationoptions = computed(() => Object.keys(locationlist).sort())
const selectedlocation = ref("")
selectedlocation.value = locationoptions[0]

const floorwidth = ref(Array(locationoptions.length).fill('0px'))
const floorrefs = useTemplateRef("floors")
const popoverloc = (ev) => {
  let locidx = Number(ev.target.getAttribute("data-locindex"))
  let buttonwidth = ev.target.offsetWidth
  floorwidth.value[locidx] = buttonwidth + 'px'
  let menu = floorrefs.value[locidx]
  menu.toggle(ev)
}
const formatflooroptions = (buildingname) => {
  return Object.keys(locationlist[buildingname]).map((floor) => {
    return { "label": floor }
  })
}
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
          <Button class="mx-1" @click="popoverloc" aria-haspopup="true" :pt:root:data-locindex="locindex">
            <Building2></Building2>
            {{ locopt }}
          </Button>
          <Menu ref="floors" :model="formatflooroptions(locopt)" :popup="true" :pt="{
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
      <TabPanel value="Activities">

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
