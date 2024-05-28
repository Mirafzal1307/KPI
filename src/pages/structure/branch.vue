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
              <th class="text-left">Filial nomi</th>
              <th class="text-left">Filial raqami</th>
              <th class="text-left">Hudud</th>

              <th class="text-right">Taxrirlash</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in allBranches" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.region }}</td>
              <td class="d-flex  justify-end ">
                <div class="d-flex justify-end align-center ">

                  <VDialog v-model="editModal" max-width="600" persistent>
                    <template v-slot:activator="{ props: activatorProps }">
                      <VCol cols="auto">
                        <VBtn  @click="openModal()" icon="ri-edit-2-line" class="btn" v-bind="activatorProps"></VBtn>
                      </VCol>

                    </template>

                    <VCard title="Filial nomini o'zgartish">
                      <div class="px-10 py-4 ">
                        <VTextField label="Filial nomi" v-model="item.name" class="mb-10"></VTextField>
                        <VTextField label="Filial raqami" v-model="item.code"></VTextField>
                      </div>

                      <template v-slot:actions>
                        <VSpacer></VSpacer>
                        <VBtn @click="editModal = false"> Yo'q </VBtn>
                        <VBtn @click="editModal = false"> Qo'shish </VBtn>
                      </template>
                    </VCard>
                  </VDialog>
                  <VDialog v-model="deleteModal" max-width="600" persistent>
                    <template v-slot:activator="{ props: activatorProps }">
                      <VCol cols="auto">
                        <VBtn icon="ri-delete-bin-6-line" class="delete" v-bind="activatorProps"></VBtn>
                      </VCol>
                    </template>
                    <VCard title="Filialni o'chirish" text="Filialni o'chirishga ishonchingiz komilmi ?! ">
                      <template v-slot:actions>
                        <VSpacer></VSpacer>
                        <VBtn @click="deleteModal = false"> Yo'q </VBtn>
                        <VBtn @click="deleteModal = false"> Ha </VBtn>
                      </template>
                    </VCard>
                  </VDialog>
                </div>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </div>
  </VCard>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBranchStore } from '@/store/structure/branch'
import { ref } from 'vue'
import { storeToRefs } from 'pinia';

const branchStore = useBranchStore()
const { allBranches } = storeToRefs(branchStore)
const { getBranches } = useBranchStore()
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
const dialog = ref(false);
const editModal = ref(false);
const deleteModal = ref(false);

onMounted(() => {
  getBranches()
})


const openModal = () => {
  editModal.value = true;
}

</script>

<style scoped>
.justify {
  justify-content: space-between;
}

.justify-end {
  justify-content: flex-end !important;

}

.btn {
  background-color: transparent !important;
  color: rgb(255, 204, 0) !important;
  border: solid 1px rgb(255, 204, 0) !important;
}

.delete {
  background-color: transparent !important;
  color: red !important;
  border: solid 1px red !important;
}


</style>
