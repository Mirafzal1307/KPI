<template>
  
    <VCard class="pa-6 border" >
      <h2 class="pt-4 pb-8" >Shaxsiy ma'lumotlar</h2>

      <VTable>
        <thead>
          <tr>
            <th class="text-left">No</th>
            <th class="text-left">Nomi</th>
            <th class="text-left">Ma'lumot</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data"
            :key="item.id"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

</template>

<script setup>
const data = ref([
  {
    id: 1,
    title: 'F.I.SH',
    value: "Oromjonov Shaxriyor Oromjon o'g'li",
  },
  {
    id: 2,
    title: 'Phone',
    value: '+998 99 999 99 99',
  },
  {
    id: 3,
    title: 'Email',
    value: 'usjonjonov@gmail.com',
  },
  {
    id: 4,
    title: 'Address',
    value: 'Tashkent, Uzbekistan',
  },
  {
    id: 5,
    title: 'Department',
    value: 'IT',
  },
  {
    id: 6,
    title: 'Position',
    value: 'Developer',
  },
  {
    id: 7,
    title: 'Table number',
    value: '1654645',
  },
  {
    id: 8,
    title: 'Bank local code',
    value: '0101',
  },
  {
    id: 9,
    title: 'Region code',
    value: '01',
  },
]);

</script>

