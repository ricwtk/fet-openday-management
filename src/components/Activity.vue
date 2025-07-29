<script setup>
import { formatTimingForDisplay } from '../utils/timeformat'
import { CalendarClock, Users, MapPinned } from "lucide-vue-next"
const props = defineProps(["activity"])
</script>
<template>
  <Card>
    <template #title>
      <div class="flex flex-row gap-2">
        <span class="font-bold">{{ activity.name }}</span>
        <span class="text-sm"><Tag :value="activity.type" severity="primary"></Tag></span>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-1">
          <MapPinned class="text-primary-400"></MapPinned>
          <Breadcrumb :model="activity.venue" pt:root:class="!p-0">
            <template #item="{ item }">
              <span>{{ item }}</span>
            </template>
          </Breadcrumb>
        </div>
        <div class="flex flex-row gap-1"><CalendarClock class="text-primary-400"/>{{ formatTimingForDisplay(activity.timing) }}</div>
        <div class="flex flex-row gap-1"><Users class="text-primary-400"></Users>
          <Tag v-for="pic in activity.pic" :value="pic" severity="secondary"></Tag>
        </div>
        <Message>{{ activity.remarks ? activity.remarks : "No remarks" }}</Message>
      </div>
    </template>
  </Card>
</template>