<template>
  <v-card class="border mb-2 px-4 py-4">
    <template #title>Filter</template>
    <v-row>
      <v-col cols="3">
        <v-text-field v-model="filterName" label="Ism" />
      </v-col>
      <v-col cols="3">
        <v-autocomplete v-model="block" :items="departments" label="Blok" />
      </v-col>
      <v-col cols="3">
        <v-autocomplete label="Filial" />
      </v-col>
      <v-col cols="3">
        <v-autocomplete :items="departments" label="Departament" />
      </v-col>
      <v-col cols="3">
        <v-text-field label="Bo'lim" />
      </v-col>
      <v-col cols="3">
        <v-text-field label="Lavozim" />
      </v-col>
      <v-col cols="3">
        <v-text-field label="INPS" />
      </v-col>
      <v-btn class="mt-3">Izlash</v-btn>
    </v-row>
  </v-card>
</template>

<script setup>
import { useDepartmentStore } from '@/store/department';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';


const depStore = useDepartmentStore()

const { departments } = storeToRefs(depStore)
const filterName = ref('')
const block = ref()

onMounted(() => {
  depStore.fetchDepartments()
})

</script>
