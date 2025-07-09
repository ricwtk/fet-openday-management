<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const allRoutes = router.getRoutes();
const toolSubRoutes = allRoutes.find(r => r.path == "/tools").children
console.log(toolSubRoutes)
// const filteredRoutes = allRoutes.filter(route => route.path == "/tools")
</script>

<template>
  <Fieldset legend="Tools" class="text-center">
    <Button v-for="r in toolSubRoutes">
      <router-link :to="{ name: r.name }">
        {{ r.name }}
      </router-link>
    </Button>
  </Fieldset>

  <router-view class="my-2"/>
</template>