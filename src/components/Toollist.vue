<script setup>
// import { useRouter } from 'vue-router';

const toolSubRoutes = [
  { path: "locationassignment", name: "Location Assignment" },
  { path: "eventcreation", name: "Event Creation" },
]

const gotopath = (p) => {
  console.log(p)
}
// const router = useRouter();
// const allRoutes = router.getRoutes();
// const toolSubRoutes = allRoutes.find(r => r.path == "/tools").children
// console.log(toolSubRoutes)
// const filteredRoutes = allRoutes.filter(route => route.path == "/tools")
</script>

<template>
  <Fieldset legend="Tools" class="text-center">
    <Button v-for="r in toolSubRoutes" class="m-2" @click="gotopath(r.path)">
      {{ r.name }}
    </Button>
  </Fieldset>

  <router-view/>
</template>