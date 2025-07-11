<script setup>
import { ref } from 'vue';

const initialFormValues = ref({
  type: "Workshop",
  name: "",
  venue: [],
  start: "",
  end: "",
  pic: [],
  remarks: ""
})

const onSubmit = (event) => {
  console.log(event.values)
}
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
          <DatePicker id="event-end" name="end" fluid pt:root:class="flex flex-1"></DatePicker>
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

  <Message severity="warn">The events are not automatically saved. Copy the JSON object (at the bottom of the page) and update the activities.js for persistent data.</Message>

</template>