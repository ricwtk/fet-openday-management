<script setup>
import { ref,computed, onMounted, watch } from "vue"
// import { useRoute, useRouter } from "vue-router";

import { activitylist } from "../data/activities";
import Topbar from "../components/Topbar.vue";

// const props = defineProps({
//   date: String,
//   building: String,
//   floor: String
// })

// const router = useRouter()
// const route = useRoute()
// const basepath = "/fet-openday-management"
const url = new URL(window.location)
const params = new URLSearchParams(url.search)
const pathnamearray = url.pathname.split("/").filter(x => x!="")
console.log(params, pathnamearray)

onMounted(() => {
  if (!params.get("date")) { selectedday.value = dayoptions[0] } 
  else { selectedday.value = params.get("date") }
})

const dayoptionobjects = activitylist.map(activity => activity.timing.map(t => Temporal.PlainDate.from(t))).flat().filter((val, idx, self) => {
  return self.findIndex(v => (v.toString() == val.toString()) ) == idx
})
const dayoptions = dayoptionobjects.map(x => x.toString())
const selectedday = ref("")
watch(selectedday, (newV) => {
  params.set("date", newV)
  url.search = params.toString();
  history.pushState({}, '', url.toString());
})
// watch(selectedday, (newV) => {
//   if (selectedstructure.value) router.push({ name: selectedstructure.value.name, params: { date: newV } }) 
//   else router.push(`/${newV}`)
// })

// const moderoutes = router.getRoutes().filter(r => {
//   let pathparts = r.path.split("/")
//   return (pathparts.length == 3 && pathparts[1] == ":date?")
// })
const structureoptions = [
  { path: "locations", name: "By Locations" },
  { path: "activities", name: "By Activities" }
]
const selectedstructure = ref()
if (pathnamearray.length > 1) {
  selectedstructure.value = ref(structureoptions.find(s => s.path == pathnamearray[1]))
}
watch(selectedstructure, (newV) => {
  pathnamearray[1] = newV.path
  url.pathname = pathnamearray.join("/")
  window.location.replace(url.href)
})

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
}).sort( (a,b) => Temporal.PlainDateTime.compare(Temporal.PlainDateTime.from(a.timing[0]), Temporal.PlainDateTime.from(b.timing[0])) ))

</script>

<template>
  <Topbar />
  <div class="w-100% mt-2 flex justify-center gap-2">
    <SelectButton v-model="selectedday" :options="dayoptions" :allowEmpty="false" pt:pctogglebutton:root:class="!text-primary !bg-primary-100 !border-primary-100 !font-bold"></SelectButton>
    <SelectButton v-if="selectedday" v-model="selectedstructure" :options="structureoptions" optionLabel="name" :allowEmpty="false" pt:pctogglebutton:root:class="!text-primary !bg-primary-100 !border-primary-100 !font-bold"></SelectButton>
  </div>
  <div class="w-100% mt-2 flex flex-col items-center gap-2">
    <slot name="main" :activities="activitylistondate"></slot>
    <!-- <router-view v-slot="{ Component }" class="max-w-4xl w-full">
      <component :is="Component" :activities="activitylistondate"></component>
    </router-view> -->
  </div>
</template>