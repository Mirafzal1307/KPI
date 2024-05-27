<template>
  <VCard class="pa-10 border rounded-lg">
    <div class="w-100">
      <VForm @submit.prevent class="d-flex justify">
        <div class="w-50">
          <VTextField v-model="search" :rules="rules" label="Qidirish"></VTextField>
        </div>
        <div class="w-25">
          <div class="text-center h-100">
            <VDialog v-model="dialog" max-width="600" persistent>
              <template v-slot:activator="{ props: activatorProps }">
                <VBtn class="h-100 w-100" v-bind="activatorProps">
                  Ko'rsatkich biriktirish
                </VBtn>
              </template>

              <VCard prepend-icon="mdi-map-marker"
                text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
                title="Use Google's location service?">
                <template v-slot:actions>
                  <VSpacer></VSpacer>

                  <VBtn @click="dialog = false"> Disagree </VBtn>

                  <VBtn @click="dialog = false"> Agree </VBtn>
                </template>
              </VCard>
            </VDialog>
          </div>
        </div>
      </VForm>
      <VCard class="border mt-10">
        <VTable>
          <thead>
            <tr>
              <th class="text-left">Ko'rsatkich kategoriyasi nomi</th>
              <th class="text-left">Taxrirlash</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.name">
              <td>{{ item.name }}</td>
              <td>action</td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </div>
  </VCard>
</template>

<script setup>
import { ref } from 'vue';

const search = ref('')

const data = [
  {
    name: 'Global',
  },
  {
    name: 'National',
  },
  {
    name: 'Regional',
  },
  {
    name: 'District',
  },
  {
    name: 'City',
  },
  {
    name: 'Village',
  },
];
const dialog = ref(false)
</script>

<style>
.justify {
  justify-content: space-between;
}
</style>
