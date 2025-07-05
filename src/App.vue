<script setup>
import { ref,computed } from "vue"
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
</script>

<template>
  <div class="p-2 w-100% rounded bg-primary-100 text-center text-primary">
    <b>FET Open Day Management</b>
  </div>
  <div class="w-100% mt-2 flex justify-center">
    <SelectButton v-model="selectedday" :options="dayoptions"></SelectButton>
  </div>
  <div class="w-100% mt-2 flex justify-center">
    <Fieldset class="flex-1 text-center flex justify-center gap-2">
      <template #legend>
        <SelectButton v-model="selectedstructure" :options="structureoptions"></SelectButton>
      </template>
      <Button v-for="locopt in locationoptions" class="mx-1" variant="outlined">{{ locopt }}</Button>
      <!-- <SelectButton v-model="selectedlocation" :options="locationoptions"></SelectButton> -->
    </Fieldset>
  </div>

  <div class="sidebar bg-primary-200 rounded-sm p-2 m-2"></div>
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
