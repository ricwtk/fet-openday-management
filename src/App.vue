<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { PanelLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="p-2 w-full bg-primary-100">
    <PanelLeft></PanelLeft>
    <!-- <Button>Test</Button> -->
    <!-- <Checkbox binary/> -->
     <Drawer :visible="true"></Drawer>
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
