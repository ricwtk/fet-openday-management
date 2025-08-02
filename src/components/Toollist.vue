<script setup>
// import { useRouter } from 'vue-router';

const toolSubRoutes = [
  { path: "locationassignment", name: "Location Assignment" },
  { path: "eventcreation", name: "Event Creation" },
]

const url = new URL(window.location)
const params = new URLSearchParams(url.search)
const pathnamearray = url.pathname.split("/").filter(x => x!="")
if (pathnamearray.length < 3) { pathnamearray.push("") }
console.log(params, pathnamearray)

const gotopath = (p) => {
  console.log(p)
  pathnamearray[2] = p
  url.pathname = pathnamearray.join("/")
  window.location.replace(url.href)
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
</template>