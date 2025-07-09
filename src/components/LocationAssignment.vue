<script setup>
import { ref, watch } from "vue";
import { locationlist } from "../data/locationmap";
import { useRoute } from "vue-router";

const buildings = ref(Object.keys(locationlist).map(bname => {
  let b = {}
  b.bname = bname
  b.floors = Object.keys(locationlist[bname]).map(fname => {
    let f = {}
    f.fname = fname
    f.parent = b
    f.mapfile = locationlist[bname][fname].mapfile
    f.rooms = locationlist[bname][fname].rooms
    return f
  })
  return b
}))

const route = useRoute()
const selectedfloor = ref()
watch(selectedfloor, console.log)
</script>

<template>
  <FieldSet class="text-center" :legend="route.name">
    <CascadeSelect placeholder="Select a floor" :options="buildings" optionLabel="fname" optionGroupLabel="bname" :optionGroupChildren="['floors']" v-model="selectedfloor"/>

    <div class="flex flex-row">
      <div class="relative flex-grow"></div>
      <div class="border flex-grow"></div>
    </div>
  </FieldSet>
</template>