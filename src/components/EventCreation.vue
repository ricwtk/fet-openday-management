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
      <InputText name="type" type="text" placeholder="Event Type"></InputText>
      <InputText name="name" type="text" placeholder="Event Name"></InputText>
      <CascadeSelect name="venue" ></CascadeSelect>
      <div class="flex gap-2">
        <DatePicker name="start" placeholder="Start" dateFormat="yy-mm-dd" showTime hourFormat="24" fluid pt:root:class="flex flex-1"></DatePicker>
        <DatePicker name="end" placeholder="End" fluid pt:root:class="flex flex-1"></DatePicker>
      </div>
      <InputText name="pic" placeholder="Person In Charge"></InputText>
      <Textarea name="remarks" placeholder="Remarks"></Textarea>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </Fieldset>

</template>