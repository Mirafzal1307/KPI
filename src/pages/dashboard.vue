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

const { employeeList, period, employee_KPI } = storeToRefs(useEmployee);
const { getEmployeeList, getPeriodList, getEmployeeKpiById } = useEmployeeStore()


const headers = ref([
  { title: 'ID', key: 'emp_id' },
  { title: 'F.I.SH', key: 'full_name' },
  { title: 'Tarkibiy bo\'linma nomi', key: 'structural_name' },
  { title: 'Lavozimi', key: 'position' },
  { title: 'KPI', key: 'kpi' },
  { title: 'O\'rtacha KPI', key: 'average_kpi' },
]);

const filters = ref({
  page: 1,
  size: 50,
  branch: null,
  param: null,
  period: null,
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
  getEmployeeList(filters.value.page, filters.value.size, filters.value.branch, filters.value.param, filters.value.period);
};

const getEmployeeKPI_ByID = async (id) => {

  await getEmployeeKpiById(id, '2024-03-30');

}

function formatNumberRoundDown(num) {
  return Math.floor(num * 100) / 100;
}


</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <v-card class="border pa-4">
        <v-container>
          <v-row v-if="period.length">
            <v-col cols="12" md="3">
              <v-text-field v-model="filters.param" label="Qidirish"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete v-model="filters.branch" :items="allBranches" label="Filial" item-title="branch_name"
                item-value="id"></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <v-autocomplete v-model="filters.period" :items="period" item-title="period" item-value="id"
                label="Davr" />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn @click="applyFilters" class="w-100 h-100">Qidirish</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </VCol>

    <VCol cols="12" md="9" class="table-height" >
      <v-card class="pa-4 border h-100">
        <VDataTable :headers="headers" :items="employeeList.items" :items-per-page="itemsPerPage"
          @update:items-per-page="updateItemsPerPage" item-value="id" class="text-no-wrap h-100 overflow-y-auto"
          :items-length="employeeList.total">
          <template v-slot:item="{ item }">
            <tr>
              <td @click="getEmployeeKPI_ByID(item.emp_id)" class="cursor-pointer">
                {{ item.emp_id }}
              </td>
              <td @click="getEmployeeKPI_ByID(item.emp_id)" class="cursor-pointer">
                {{ item.full_name }}
              </td>
              <td @click="getEmployeeKPI_ByID(item.emp_id)" class="cursor-pointer">
                {{ item.structural_name }}
              </td>
              <td @click="getEmployeeKPI_ByID(item.emp_id)" class="cursor-pointer">
                {{ item.position }}
              </td>
              <td @click="getEmployeeKPI_ByID(item.emp_id)" class="cursor-pointer">
                {{ formatNumberRoundDown(item.kpi) }}%
              </td>
              <td @click="getEmployeeKPI_ByID(item.emp_id)" class="cursor-pointer">
                {{ formatNumberRoundDown(item.average_kpi) }} %
              </td>
            </tr>
          </template>
          <template #bottom >
 
          </template>
        </VDataTable>

      </v-card>
    </VCol>
    <VCol cols="12" md="3">
      <UserProfileCard />
    </VCol>
    <VCol cols="12" class="height">
      <VCard class="border pa-4 h-100  ">
        <VTable class="h-100 overflow-y-auto overflow-x-auto" >
          <thead>
            <tr>

              <th class="text-left">Ko'rsatkich turi</th>
              <th class="text-left">O'rtacha KPI</th>
              <th class="text-left">KPI Foizi</th>
              <th class="text-left">Reja</th>
              <th class="text-left">Fakt</th>
              <th class="text-left">Reja bajarilishi</th>
              <th class="text-left">Ulushi</th>
              <th class="text-left">Ko'rsatkichi </th>
              <th class="text-left">Min</th>
              <th class="text-left">Maks</th>

              <th class="text-left">Davr</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td colspan="12">
                <div class="d-flex ga-10 font-weight-bold">
                  <span>
                    F.I.SH: {{ employee_KPI.full_name }}
                  </span> <span>
                    Boshqarma: {{ employee_KPI.governance }}
                  </span>
                  <span>
                    Lavozim: {{ employee_KPI.position }}
                  </span>
                  <span>
                    KPI ko'rsatkichi: {{
                      formatNumberRoundDown(employee_KPI.average_kpi) }}%
                  </span>
                </div>

              </td>
            </tr>
            <tr v-for="item in employee_KPI.kpi">

              <td>
                {{ item.category }}
              </td>
              <td>
                {{ formatNumberRoundDown(item.average_kpi) * 100 }}%
              </td>
              <td>
                {{ formatNumberRoundDown(item.kpi_percent) * 100 }}%
              </td>
              <td>
                {{ formatNumberRoundDown(item.plan) }}%
              </td>
              <td>
                {{ formatNumberRoundDown(item.fact) }}%
              </td>
              <td>
                {{ formatNumberRoundDown(item.done_percent) * 100 }}%
              </td>
              <td>
                {{ formatNumberRoundDown(item.kpi) * 100 }}%</td>

              <td>
                {{ item.indicator }}
              </td>
              <td>
                {{ item.min_percent * 100 }}%
              </td>
              <td>
                {{
                  item.max_percent * 100
                }}%
              </td>
              <td>
                {{
                  item.period
                }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.height {
  max-height: 215px !important;
}

.table-height{
  max-height: 450px !important;
}
</style>
