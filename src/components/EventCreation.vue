<script setup>
import { ref, computed } from 'vue';
import { activitylist } from "../data/activities";

const activities = ref(activitylist.map(activity => {
  activity.timing = activity.timing.map(timing => Temporal.PlainDateTime.from(timing))
  return activity
}))

const initialFormValues = ref({
  type: "Workshop",
  name: "",
  venue: [],
  start: "",
  end: "",
  pic: [],
  remarks: ""
})

const formatDateTime = (dt) => {
  let dtTemporal = new Temporal.PlainDateTime(dt.getFullYear(), dt.getMonth()+1, dt.getDate(), dt.getHours(), dt.getMinutes())
  return dtTemporal.toString()
}

const onSubmit = (event) => {
  console.log(event.values)

  console.log(formatDateTime(event.values.start))
}

const getDateString = (tprl) => { return `${tprl.year}-${tprl.month}-${tprl.day}` }
const formatTimingForDisplay = (timing) => {
  if (timing.length = 1) { return getDateString(timing[0])}
  else {
    
  }
}

const prettyEventsJSON = computed(() => JSON.stringify(activities.value,null,2))
</script>

<template>
  <Fieldset legend="Create event" :pt="{ 'content': { 'class': 'flex flex-col justify-center' } }">
    <Form v-slot="$form"  @submit="onSubmit" class="flex flex-col gap-2">
      <FloatLabel variant="in">
        <InputText id="event-type" name="type" type="text" pt:root:class="w-1/1"></InputText>
        <label for="event-type">Event Type</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <InputText id="event-name" name="name" type="text" pt:root:class="w-1/1"></InputText>
        <label for="event-name">Event Name</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <CascadeSelect id="event-venue" name="venue" pt:root:class="w-1/1"></CascadeSelect>
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
        <label for="event-pic">Person In Charge</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <Textarea id="event-remarks" name="remarks" pt:root:class="w-1/1"></Textarea>
        <label for="event-remarks">Remarks</label>
      </FloatLabel>
      <Button type="submit" severity="primary" label="Submit" />
    </Form>
  </Fieldset>

  <Message severity="warn" class="my-2">The events are not automatically saved. Copy the JSON object (at the bottom of the page) and update the activities.js for persistent data.</Message>

  <DataView :value="activities">
    <template #list="slotProps">
      <Panel v-for="({ type, name, venue, timing, pic, remarks }, index) in slotProps.items" class="mt-2">
        <template #header><span class="font-bold">{{ name }}</span></template>
        <template #icons><span class="font-light">{{ type }}</span></template>
        <div>
          <div>{{ timing[0].year }} - {{ timing[1] }}</div>
          <Breadcrumb :model="venue" pt:root:class="!m-0 !p-0">
            <template #item="{ item }"><span>{{ item }}</span></template>
          </Breadcrumb>
          <div>
            <Chip v-for="p in pic" :label="p" class="m-1"></Chip>
          </div>
          <Fieldset legend="Remarks" v-if="remarks" pt:content:class="whitespace-pre">{{ remarks }}</Fieldset>
        </div>
      </Panel>
      <div>{{ slotProps }}</div>
    </template>
  </DataView>

  <Fieldset :legend="`JSON object for events`">
    <code class="text-start"><pre style="background-color:black" class="text-white p-2 rounded">{{ prettyEventsJSON }}</pre></code>
  </Fieldset>

</template>