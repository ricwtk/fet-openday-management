<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { LayoutList, List } from 'lucide-vue-next';
// import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  activities: Array
})

const url = new URL(window.location)
const params = new URLSearchParams(url.search)
console.log(params)

// const route = useRoute();
// const router = useRouter();
const groupbytype = ref(false)
onMounted(() => {
  if (params.get("groupbytype")) { groupbytype.value = params.get("groupbytype") == "true" } 
})
watch(groupbytype, (newV) => {
  params.set("groupbytype", newV)
  url.search = params.toString();
  history.pushState({}, '', url.toString());
  // router.push({path: route.fullPath, query: { groupbytype: newV }})
})

const activitytypes = computed(() => {
  return props.activities.reduce((types, act) => {
    if (!types.includes(act.type)) { types.push(act.type) }
    return types
  }, []).sort()
})

</script>
<template>
  <Panel pt:content:class="flex flex-col justify-center">
    <ToggleButton v-model="groupbytype" onLabel="Grouped by activity type" offLabel="Group by activity type">
      <template #icon="{value}"><LayoutList v-if="value" /><List v-else /></template>
    </ToggleButton>
    <!-- {{ props.activities }}
    <br>
    {{ activitytypes }} -->
    <DataView :value="props.activities" pt:root:class="my-3">
      <template #list="slotProps">
        <div v-if="groupbytype" class="flex flex-col gap-2" >
          <Panel v-for="t in activitytypes" :header="t" toggleable pt:content:class="flex flex-col gap-2">
            <template v-for="(item, index) in slotProps.items" :key="index">
              <Activity :activity="item" v-if="item.type == t"></Activity>
            </template>
          </Panel>
        </div>
        <div v-else class="flex flex-col gap-2">
          <Activity v-for="(item, index) in slotProps.items" :key="index" :activity="item"></Activity>
        </div>
      </template>
    </DataView>
  </Panel>
</template>