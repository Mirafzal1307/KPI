<script setup>
import { useBranchStore } from '@/store/branch'
import { useEmployeeStore } from '@/store/employee'
import UserProfileCard from '@/views/dashboard/UserProfileCard.vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const branchStore = useBranchStore()
const { allBranches, allRegions } = storeToRefs(branchStore)
const { getBranches, getRegions, getBranchesByRegionId } = useBranchStore()

const useEmployee = useEmployeeStore()
const { employeeList, period, employee_KPI } = storeToRefs(useEmployee)
const { getEmployeeList, getPeriodList, getEmployeeKpiById } = useEmployeeStore()

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

const itemsPerPage = ref(filters.value.size)

const updateItemsPerPage = newItemsPerPage => {
  getEmployeeList(filters.value.page, newItemsPerPage, filters.value.branch, filters.value.param, filters.value.period)

  filters.value.size = newItemsPerPage
  itemsPerPage.value = newItemsPerPage
}

function formatNumberWithSpaces(number) {
  const [integerPart, decimalPart] = number.toFixed(2).toString().split('.')
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (!decimalPart) return formattedIntegerPart
  const formattedDecimalPart = decimalPart.replace(/(\d{3})(?=\d)/g, '$1 ')

  return `${formattedIntegerPart}.${formattedDecimalPart}`
}

const getEmployeeKPI_ByID = async item => {
  employeeList.value['items'].forEach(element => {
    element.isActive = false
  })
  item.isActive = true
  await getEmployeeKpiById(item.emp_id, '2024-03-30')
}

function getTableClass(item) {
  if (item.isActive) return 'active-item'
}

async function filterEmployees() {
  await getEmployeeList(
    filters.value.page,
    filters.value.size,
    filters.value.branch,
    filters.value.param,
    filters.value.period,
  )
}

async function fetchBranchesByRegionId(id) {
  if (!id) {
    await getBranches()

    return
  }

  await getBranchesByRegionId(id)
}

onMounted(() => {
  getEmployeeList(
    filters.value.page,
    filters.value.size,
    filters.value.branch,
    filters.value.param,
    filters.value.period,
  )
  getPeriodList()
  getBranches()
  getRegions()
})
</script>

<template>
  <section>
    <VForm
      class="mb-3"
      @submit.prevent="filterEmployees"
    >
      <VCard class="border rounded-md">
        <VCardText>
          <VRow dense>
            <VCol
              cols="12"
              md="3"
            >
              <VAutocomplete
                v-model="filters.region"
                density="compact"
                :items="allRegions"
                item-title="region_name_uz"
                item-value="id"
                label="Hudud"
                clearable
                @update:model-value="fetchBranchesByRegionId"
              />
            </VCol>
            <VCol
              cols="12"
              md="3"
            >
              <VAutocomplete
                v-model="filters.branch"
                :items="allBranches"
                density="compact"
                label="Filial"
                item-title="branch_name"
                item-value="id"
                clearable
              />
            </VCol>
            <VCol
              cols="12"
              md="2"
            >
              <VAutocomplete
                v-model="filters.period"
                density="compact"
                :items="period"
                item-title="period"
                item-value="id"
                label="Davr"
              />
            </VCol>
            <VCol
              cols="12"
              md="2"
            >
              <VTextField
                v-model="filters.param"
                density="compact"
                label="Qidirish"
              />
            </VCol>
            <VCol
              cols="12"
              md="2"
            >
              <VBtn
                type="submit"
                class="w-100"
              >
                Qidirish
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VForm>
  </section>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="12"
      class="py-0"
    />
    <VCol
      cols="12"
      md="12"
      class="pb-0"
    >
      <VResponsive max-height="400">
        <VCard class="border pa-3 h-100">
          <VTable
            class="h-100 overflow-y-auto overflow-x-auto"
            fixed-header
          >
            <thead>
              <tr>
                <th class="text-left">Ko'rsatkich turi</th>
                <th class="text-left">Ko'rsatkich nomi</th>
                <th class="text-left">Reja</th>
                <th class="text-left">Fakt</th>
                <th class="text-left">Reja bajarilishi</th>
                <th class="text-left">Samaradorlik bajarilishi</th>
                <th class="text-left">Umumiy KPI natijasi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in employee_KPI.kpi"
                :key="item.id"
              >
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
                <td>
                  <span
                    v-if="item.average_kpi"
                    class="font-weight-bold"
                  >
                    {{ Math.round(item.average_kpi * 100) }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VResponsive>
    </VCol>
    <VCol
      cols="12"
      md="3"
    >
      <UserProfileCard />
    </VCol>
    <VCol
      cols="12"
      md="9"
      class="table-height"
    >
      <VCard class="pa-4 border h-100">
        <VDataTable
          hover
          :headers="headers"
          :items="employeeList['items']"
          :items-per-page="itemsPerPage"
          item-value="id"
          class="text-no-wrap h-100 overflow-y-auto elevation-1"
          :items-length="employeeList['total']"
          fixed-header
          @update:items-per-page="updateItemsPerPage"
        >
          <template #item="{ item, index }">
            <tr
              :class="`cursor-pointer hovering-pan ${getTableClass(item)}`"
              @click="getEmployeeKPI_ByID(item)"
            >
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
  cursor: pointer;
}
</style>
