<script setup>
import { ref, computed } from 'vue';
import { activitylist } from "../data/activities";
import { locationlist } from "../data/locationmap";
import { CalendarClock, MapPinned, Users, Copy, SquareX } from 'lucide-vue-next';
import { formatTimingForDisplay } from '../utils/timeformat'

import { Temporal } from "@js-temporal/polyfill";

// Fallback assignment if native Temporal is missing
if (typeof globalThis.Temporal === "undefined") {
  globalThis.Temporal = Temporal;
}

const activities = ref(activitylist.map(activity => {
  activity.timing = activity.timing.map(timing => Temporal.PlainDateTime.from(timing))
  return activity
}))

const venueselectionlist = ref(Object.keys(locationlist).map(b => ({
  name: b,
  floors: Object.keys(locationlist[b]).map(f => ({
    name: f,
    rooms: Object.keys(locationlist[b][f].rooms).map(r => ({ rname: r, floor: f, building: b })),
    building: b
  }))
})))

const neweventform = ref()

const datetoTemporal = (dt) => {
  let dtTemporal = new Temporal.PlainDateTime(dt.getFullYear(), dt.getMonth()+1, dt.getDate(), dt.getHours(), dt.getMinutes())
  return dtTemporal
}

const temporaltoDate = (t) => {
  return new Date(t.toString())
}

const onCreateNewEvent = (ev) => {
  let activity = {
    type: ev.values.type,
    name: ev.values.name,
    venue: [ev.values.venue.building, ev.values.venue.floor, ev.values.venue.rname],
    timing: [datetoTemporal(ev.values.start), datetoTemporal(ev.values.end)],
    pic: ev.values.pic.split(",").map(v => v.trim()),
    remarks: ev.values.remarks
  }
  activities.value.push(activity)
}

const deleteevent = (eventindex) => {
  activities.value.splice(eventindex, 1)
}

const duplicateevent = (eventindex) => {
  let activity = activities.value[eventindex]
  let eventdetails = {
    type: activity.type,
    name: activity.name,
    venue: venueselectionlist.value.find(v => v.name == activity.venue[0]).floors.find(v => v.name == activity.venue[1]).rooms.find(v => v.rname == activity.venue[2]),
    start: temporaltoDate(activity.timing[0]),
    end: temporaltoDate(activity.timing[1]),
    pic: activity.pic.join(", "),
    remarks: activity.remarks
  }
  neweventform.value.setValues(eventdetails)
}

const prettyEventsJSON = computed(() => JSON.stringify(activities.value,null,2))
</script>

<template>
  <Fieldset legend="Create event" :pt="{ 'content': { 'class': 'flex flex-col justify-center' } }">
    <Form v-slot="$form" ref="neweventform" @submit="onCreateNewEvent" class="flex flex-col gap-2">
      <FloatLabel variant="in">
        <InputText id="event-type" name="type" type="text" pt:root:class="w-1/1"></InputText>
        <label for="event-type">Event Type</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <InputText id="event-name" name="name" type="text" pt:root:class="w-1/1"></InputText>
        <label for="event-name">Event Name</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <CascadeSelect id="event-venue" name="venue" pt:root:class="w-1/1" :options="venueselectionlist" optionLabel="rname" :optionGroupChildren="['floors', 'rooms']" optionGroupLabel="name" breakpoint="10000000px"></CascadeSelect>
        <label for="event-venue">Venue</label>
      </FloatLabel>
      <div class="flex gap-2">
        <FloatLabel variant="in" class="flex flex-1">
          <DatePicker id="event-start" name="start" dateFormat="yy-mm-dd" showTime hourFormat="24" fluid pt:root:class="flex flex-1"></DatePicker>
          <label for="event-start">Start</label>
        </FloatLabel>
        <FloatLabel variant="in" class="flex flex-1">
          <DatePicker id="event-end" name="end" dateFormat="yy-mm-dd" showTime hourFormat="24" fluid pt:root:class="flex flex-1"></DatePicker>
          <label for="event-end">End</label>
        </FloatLabel>
      </div>
      <FloatLabel variant="in">
        <InputText id="event-pic" name="pic" pt:root:class="w-1/1"></InputText>
        <label for="event-pic">Person In Charge (separate with comma)</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <Textarea id="event-remarks" name="remarks" pt:root:class="w-1/1"></Textarea>
        <label for="event-remarks">Remarks</label>
      </FloatLabel>
      <Button type="submit" severity="primary" label="Submit" />
    </Form>
  </Fieldset>

  <Message severity="warn" class="my-2">The events are not automatically saved. Copy the JSON object (at the bottom of the page) and update the activities.js for persistent data.</Message>

  <DataView :value="activities" pt:content:class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    <template #list="slotProps">
      <Panel v-for="({ type, name, venue, timing, pic, remarks }, index) in slotProps.items" :pt="{
        root: { class: 'mt-2 !flex flex-col' },
        contentcontainer: { class: '!flex flex-col grow'},
        content: { class: 'grow' }
      }">
        <template #header><span class="font-bold">{{ name }}</span></template>
        <template #icons><span class="font-light">{{ type }}</span></template>
        <template #footer>
          <div class="flex flex-row gap-2">
            <Button @click="deleteevent(index)">Delete<SquareX></SquareX></Button>
            <Button @click="duplicateevent(index)">Duplicate<Copy></Copy></Button>
          </div>
        </template>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2"><CalendarClock class="flex-shrink-0"/>{{ formatTimingForDisplay(timing) }}</div>
          <div class="flex flex-row gap-2">
            <MapPinned class="flex-shrink-0"></MapPinned>
            <Breadcrumb :model="venue" pt:root:class="!m-0 !p-0">
              <template #item="{ item }"><span>{{ item }}</span></template>
            </Breadcrumb>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <Users class="flex-shrink-0"></Users>
            <div>
              <Chip v-for="p in pic" :label="p" class="m-1"></Chip>
            </div>
          </div>
          <Fieldset legend="Remarks" v-if="remarks" pt:content:class="whitespace-pre">{{ remarks }}</Fieldset>
        </div>
      </Panel>
    </template>
  </DataView>

  <Fieldset :legend="`JSON object for events`">
    <code class="text-start"><pre style="background-color:black" class="text-white p-2 rounded">{{ prettyEventsJSON }}</pre></code>
  </Fieldset>

</template>