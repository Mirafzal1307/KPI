<script setup>
import { useBranchStore } from '@/store/branch';
import { useEmployeeStore } from '@/store/employee';
import UserProfileCard from '@/views/dashboard/UserProfileCard.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const branchStore = useBranchStore()
const { allBranches, allRegions } = storeToRefs(branchStore)
const { getBranches, getRegions, getBranchesByRegionId } = useBranchStore(); 

const useEmployee = useEmployeeStore();

const { employeeList, period, employee_KPI, } = storeToRefs(useEmployee);
const { getEmployeeList, getPeriodList, getEmployeeKpiById } = useEmployeeStore()


const headers = ref([
  { title: 'ID', key: 'emp_id' },
  { title: 'F.I.SH', key: 'full_name' },
  { title: 'Tarkibiy bo\'linma nomi', key: 'structural_name' },
  { title: 'Lavozimi', key: 'position' },

]);

const filters = ref({
  page: 1,
  size: 50,
  branch: null,
  param: null,
  period: null,
  region: null,
});

onMounted(() => {
  getEmployeeList(filters.value.page, filters.value.size, filters.value.branch, filters.value.param, filters.value.period);
  getPeriodList()
  getBranches()
  getRegions()
})


const itemsPerPage = ref(filters.value.size);
// const totalItems = ref(items.value.length);

const updateItemsPerPage = (newItemsPerPage) => {
  getEmployeeList(filters.value.page, newItemsPerPage, filters.value.branch, filters.value.param, filters.value.period);


  filters.value.size = newItemsPerPage;
  itemsPerPage.value = newItemsPerPage;
};

const applyFilters = () => {
  getEmployeeList(filters.value.page, filters.value.size, filters.value.branch, filters.value.param, filters.value.period);
};

const getEmployeeKPI_ByID = async (item) => {
  employeeList.value.items.forEach(element => {
    element.isActive = false;
  });
  item.isActive = true;
  await getEmployeeKpiById(item.emp_id, '2024-03-30');
}

function formatNumberRoundDown(num) {
  return Math.floor(num * 100) / 100;
};

function getTableClass(item) {
  if (item.isActive)
    return 'active-item'
};

watch(filters.value, (newValue, oldValue) => {
  getBranchesByRegionId(filters.value.region)
});

</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <v-card class="border pa-4">
        <v-container>
          <v-row v-if="period.length">
            <v-col cols="12" md="6">
              <v-text-field v-model="filters.param" label="Qidirish"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete v-model="filters.region" :items="allRegions" item-title="region_name_uz" item-value="id"
                label="Hudud"  />
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete v-model="filters.branch" :items="allBranches" label="Filial" item-title="branch_name"
                item-value="id"></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete v-model="filters.period" :items="period" item-title="period" item-value="id"
                label="Davr" />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn @click="applyFilters" class=" px-16 w-100">Qidirish</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </VCol>
    <VCol cols="12" class="height">
      <VCard class="border pa-4 h-100  ">
        <VTable class="h-100 overflow-y-auto overflow-x-auto">
          <thead>
            <tr>

              <th class="text-left">Ko'rsatkich turi</th>
              <th class="text-left">Ko'rsatkich nomi </th>
              <th class="text-left">Reja</th>
              <th class="text-left">Fakt</th>
              <th class="text-left">Reja bajarilishi</th>
              <th class="text-left">KPI Foizi</th>
              <th class="text-left">Umumiy KPI</th>





            </tr>
          </thead>
          <tbody>


            <tr v-for="item in employee_KPI.kpi">

              <td>
                {{ item.category }}
              </td>
              <td>
                {{ item.indicator }}
              </td>
              <td>
                {{ formatNumberRoundDown(item.plan) }}
              </td>
              <td>
                {{ formatNumberRoundDown(item.fact) }}
              </td>
              <td>
                {{ formatNumberRoundDown(item.done_percent) * 100 }}%
              </td>
              <td>
                {{ formatNumberRoundDown(item.kpi_percent) * 100 }}%
              </td>
              <td>
                {{ formatNumberRoundDown(item.average_kpi) * 100 }}%
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <VCol cols="12" md="3">
      <UserProfileCard />
    </VCol>
    <VCol cols="12" md="9" class="table-height">
      <v-card class="pa-4 border h-100">
        <VDataTable hover :headers="headers" :items="employeeList.items" :items-per-page="itemsPerPage"
          @update:items-per-page="updateItemsPerPage" item-value="id"
          class="text-no-wrap h-100 overflow-y-auto elevation-1" :items-length="employeeList.total">

          <template v-slot:item="{ item }">
            <tr :class="`cursor-pointer hovering-pan ${getTableClass(item)}`" @click="getEmployeeKPI_ByID(item)">
              <td>
                {{ item.emp_id }}
              </td>
              <td>
                {{ item.full_name }}
              </td>
              <td>
                {{ item.structural_name }}
              </td>
              <td>
                {{ item.position }}
              </td>

            </tr>
          </template>
          <template #bottom>

          </template>
        </VDataTable>

      </v-card>
    </VCol>
  </VRow>
</template>

<style scoped>
.height {
  max-block-size: 275px !important;
}

.table-height {
  max-block-size: 390px !important;
}

.custom-item:hover {
  background-color: #f0f0f0 !important;

}

.active-item {
  background-color: #ccffce !important;
}

.custom-hover-effect {
  cursor: pointer
}
</style>
