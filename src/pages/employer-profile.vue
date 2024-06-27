<script setup>
import { useEmployeeStore } from '@/store/employee'
import UserProfileCard from '@/views/dashboard/UserProfileCard.vue';
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'


const useEmployee = useEmployeeStore()
const { employeeList, period, employee_list_KPI, subordinate } = storeToRefs(useEmployee)
const { getPeriodList, getEmployeeListKpiById, getSubordinateAll } = useEmployeeStore()

const headers = ref([
  { title: '№', key: 'emp_id' },
  { title: 'F.I.SH', key: 'full_name' },
  { title: "Tarkibiy bo'linma nomi", key: 'structural_name' },
  { title: 'Lavozimi', key: 'position' },
])

const filters = ref({
  page: 1,
  size: 50,
  branch: null,
  param: null,
  period: null,
  region: null,
})




function formatNumberWithSpaces(number) {
  const [integerPart, decimalPart] = number.toFixed(2).toString().split('.')
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (!decimalPart) return formattedIntegerPart
  const formattedDecimalPart = decimalPart.replace(/(\d{3})(?=\d)/g, '$1 ')

  return `${formattedIntegerPart}.${formattedDecimalPart}`
}


const empID = ref(null)

const getEmployeeKPI_ByID = async item => {
  empID.value = item.emp_id
  subordinate.value.forEach(element => {
    element.isActive = false
  })
  item.isActive = true
  await getEmployeeListKpiById(item.emp_id, '2024-01-30')
}

function getTableClass(item) {
  if (item.isActive) return 'active-item'
}

const getEmployeeAverageKpi = computed(() => {
  if (!employee_list_KPI.value?.kpi?.length) return

  return employee_list_KPI.value?.kpi[0].average_kpi
})




const getUserDataByID = async (newValue) => {
  if (empID.value === null) return

  await getEmployeeListKpiById(empID.value, newValue)
  console.log(newValue);
}


onMounted(() => {
  getSubordinateAll()
  getPeriodList()

})
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="12" class="pb-0">
      <VResponsive max-height="400">
        <VCard class="border pa-3 h-100">
          <VCol cols="12" md="4" class="ml-auto">
            <VAutocomplete @update:model-value="getUserDataByID" v-model="filters.period" :items="period"
              density="compact" label="Davr" item-title="period" item-value="id" clearable />
          </VCol>
          <VTable class="h-100 overflow-y-auto overflow-x-auto height hover-table" fixed-header>
            <thead>
              <tr>
                <th class="text-left">№</th>
                <th class="text-left">Ko'rsatkich turi</th>
                <th class="text-left">Ko'rsatkich nomi</th>
                <th class="text-left">Reja</th>
                <th class="text-left">Fakt</th>
                <th class="text-left">Reja bajarilishi</th>
                <th class="text-left">Samaradorlik bajarilishi</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in employee_list_KPI.kpi" :key="item.id">
                <td>
                  {{ index + 1 }}</td>
                <td>
                  {{ item.category }}
                </td>
                <td>
                  {{ item.indicator }}
                </td>
                <td>
                  {{ formatNumberWithSpaces(item.plan) }}
                </td>
                <td>
                  {{ formatNumberWithSpaces(item.fact) }}
                </td>
                <td>{{ Math.round(item.done_percent * 100) }}%</td>
                <td>{{ Math.round(item.kpi_percent * 100) }}%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td class=" font-weight-black text-h5">Umumiy KPI</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class=" font-weight-bold text-red-darken-4 text-h5">{{ isNaN(getEmployeeAverageKpi) ? 0 :
                  Math.round(getEmployeeAverageKpi * 100) }}%</td>
              </tr>
            </tfoot>
          </VTable>
        </VCard>
      </VResponsive>
    </VCol>
    <VCol cols="12" md="3">
      <UserProfileCard :img="employee_list_KPI?.img_path" />
    </VCol>

    <VCol cols="12" md="9" class="table-height">
      <VCard class="pa-4 border h-100">
        <VDataTable hover :headers="headers" :items="subordinate" item-value="id"  items-per-page="300"
          class="text-no-wrap h-100 overflow-y-auto elevation-1 hover-table" fixed-header>
          <template #item="{ item, index }">
            <tr :class="`cursor-pointer hovering-pan ${getTableClass(item)}`" @click="getEmployeeKPI_ByID(item)">
              <td>
                {{ index + 1 }}
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
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.height {
  max-block-size: 320px !important;
}

.table-height {
  max-block-size: 490px !important;
}

.custom-item:hover {
  background-color: #f0f0f0 !important;
}

.active-item {
  background-color: #ccffce !important;
}

.custom-hover-effect {
  cursor: pointer;
}

.justify {
  justify-content: space-between !important;
}

.hover-table tbody tr:hover {
  background-color: #f5f5f5 !important;
}
</style>
