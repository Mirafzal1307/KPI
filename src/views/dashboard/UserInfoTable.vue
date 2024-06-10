<script setup>

const headers = [
  {
    title: 'Vil. kodi',
    key: 'region_code',
  },
  {
    title: 'Bank lokal kodi',
    key: 'bank_local_code',
  },
  {
    title: 'Tabel raqami',
    key: 'table_number',
  },
  {
    title: 'F.I.SH',
    key: 'fullName',
  },
  {
    title: 'Departament',
    key: 'department',
  },
  {
    title: 'Lavozim',
    key: 'position',
  },
]

const userData = [
  {
    id: 1,
    fullName: 'Galasasen Slixby',
    region_code: '01',
    bank_local_code: '0101',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 2,
    fullName: 'Halsey Redmore',
    region_code: '02',
    bank_local_code: '0202',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 3,
    fullName: 'Marjory Sicely',
    region_code: '03',
    bank_local_code: '0303',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 4,
    fullName: 'Dorothy Whiston',
    region_code: '04',
    bank_local_code: '0404',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 5,
    fullName: 'Dorothy Whiston',
    region_code: '05',
    bank_local_code: '0505',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 6,
    fullName: 'Dorothy Whiston',
    region_code: '06',
    bank_local_code: '0606',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 7,
    fullName: 'Dorothy Whiston',
    region_code: '07',
    bank_local_code: '0707',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 8,
    fullName: 'Dorothy Whiston',
    region_code: '08',
    bank_local_code: '0808',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
  {
    id: 9,
    fullName: 'Dorothy Whiston',
    region_code: '09',
    bank_local_code: '0909',
    table_number: '1654645',
    department: 'IT',
    position: 'developer',
  },
]


</script>

<template>
  <VCard class="border">
    <VDataTable
      :headers="headers"
      :items="userData"
      item-value="id"
      class="text-no-wrap"
    >
      <!-- User -->
      <template #item.username="{ item }">
        <div class="d-flex align-center gap-x-4">
          <div class="d-flex flex-column">
            <h3 class="text-h6 font-weight-medium user-list-name">
              {{ item.fullName }}
            </h3>
          </div>
        </div>
      </template>
      <template #bottom />
    </VDataTable>
  </VCard>
</template>
