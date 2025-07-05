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
    <!-- <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>
