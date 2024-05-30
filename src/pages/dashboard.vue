<script setup>
import { useEmployeeStore } from '@/store/employee';
import TeamTable from '@/views/dashboard/TeamTable.vue';
import UserProfileCard from '@/views/dashboard/UserProfileCard.vue';
import { storeToRefs } from 'pinia';
import { useBranchStore } from '@/store/branch';
import { onMounted, ref } from 'vue';

const branchStore = useBranchStore()
const { allBranches, } = storeToRefs(branchStore)
const { getBranches, } = useBranchStore()

const useEmployee = useEmployeeStore();

const { employeeList, period } = storeToRefs(useEmployee);
const { getEmployeeList, getPeriodList } = useEmployeeStore()


const headers = ref([
  { title: 'ID', key: 'emp_id' },
  { title: 'F.I.SH', key: 'full_name' },
  { title: 'KPI', key: 'kpi' },
  { title: 'average_kpi', key: 'average_kpi' },
]);

const filters = ref({
  page: 1,
  size: 10,
  branch: [],
  param: null,
  period: [],
});

onMounted(() => {
  getEmployeeList(filters.value.page, filters.value.size, filters.value.branch, filters.value.param, filters.value.period);
  getPeriodList()
  getBranches()
})







const itemsPerPage = ref(filters.value.size);
// const totalItems = ref(items.value.length);

const updateItemsPerPage = (newItemsPerPage) => {
  getEmployeeList(filters.value.page, newItemsPerPage, filters.value.branch, filters.value.param, filters.value.period);


  filters.value.size = newItemsPerPage;
  itemsPerPage.value = newItemsPerPage;
};

const applyFilters = () => {
  console.log('Filters:', filters.value);
  // Implement the filter logic here
  // For example, make an API call with the filters
};


</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <v-card class="border pa-4">
        <v-container>
          <v-row v-if="period.length">

            <v-col cols="12" md="6">
              <v-autocomplete v-model="filters.branch" :items="allBranches" label="Branch" item-title="branch_name" item-value="id" ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="filters.param" label="Param"></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-autocomplete v-model="filters.period" :items="period" item-title="period" item-value="id"
                label="Period" />
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
        <VDataTable :headers="headers" :items="employeeList.items" :items-per-page="itemsPerPage"
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
