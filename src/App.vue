<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { PanelLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="topbar m-2 p-2 h-15 w-100% bg-primary-200 rounded-sm">
    <Button variant="text"><PanelLeft></PanelLeft></Button>
    <!-- <Select></Select> -->
    <!-- <Button>Test</Button> -->
    <!-- <Checkbox binary/> -->
     <!-- <Drawer :visible="true"></Drawer> -->
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
