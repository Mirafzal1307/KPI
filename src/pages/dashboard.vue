<script setup>
import TeamTable from '@/views/dashboard/TeamTable.vue'
import UserInfoTable from '@/views/dashboard/UserInfoTable.vue'
import UserProfileCard from '@/views/dashboard/UserProfileCard.vue'

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  // Add more headers as needed
]);

const items = ref([
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Alice Johnson', age: 35 },
  { id: 4, name: 'Bob Brown', age: 40 },
  { id: 5, name: 'Dsdsd', age: 40 },
  { id: 6, name: 'djskdksd', age: 40 },

  // Add more items as needed
]);

const filters = ref({
  page: 1,
  size: 2,
  branch: [],
  param: '',
  period: [],
});

const branches = ref([
  { text: 'Branch 1', value: 'branch1' },
  { text: 'Branch 2', value: 'branch2' },
  // Add more branches as needed
]);

const periods = ref([
  { text: 'Period 1', value: 'period1' },
  { text: 'Period 2', value: 'period2' },
  // Add more periods as needed
]);

const itemsPerPage = ref(filters.value.size);
const totalItems = ref(items.value.length);

const updateItemsPerPage = (newItemsPerPage) => {
  filters.value.size = newItemsPerPage;
  itemsPerPage.value = newItemsPerPage;
};

const applyFilters = () => {
  console.log('Filters:', filters.value);
  // Implement the filter logic here
  // For example, make an API call with the filters
};

watch(
  () => items.value,
  (newItems) => {
    totalItems.value = newItems.length;
  },
  { immediate: true }
);
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="12">

      <v-card class="border pa-4">
        <v-container>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="filters.page" label="Page" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="filters.size" label="Size" type="number" :value="itemsPerPage"
                @change="updateItemsPerPage"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete v-model="filters.branch" :items="branches" label="Branch" multiple></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="filters.param" label="Param"></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-autocomplete v-model="filters.period" :items="periods" label="Period" multiple></v-autocomplete>
            </v-col>
            <v-col cols="12" md="12">
              <v-btn @click="applyFilters">Apply Filters</v-btn>
            </v-col>
           
          </v-row>
        </v-container>
      </v-card>
    </VCol>

    <VCol cols="12" md="9">
      <v-card class="pa-4 border">
        <VDataTable :headers="headers" :items="items" :items-per-page="itemsPerPage"
          @update:items-per-page="updateItemsPerPage" item-value="id" class="text-no-wrap"></VDataTable>
      
        </v-card>
    </VCol>
    <VCol cols="12" md="3">
      <UserProfileCard />
    </VCol>
    <VCol cols="12">
      <TeamTable />
    </VCol>
  </VRow>
</template>
