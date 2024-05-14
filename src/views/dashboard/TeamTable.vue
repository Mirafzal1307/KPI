<script setup>
const userData = {
  data: [
    {
      id: 1,
      indicator_type: 'Global',
      indicator_name: 'Sof foyda',
      plan: '600,233',
      fact: '-76789789',
      plan_implementation: '-2122%',
      share: '-2122%',
      efficiency_implementation: '-2122%',
      min: '-2122%',
      maks: '-2122%',
    },
  ],
  total: '-2122%',
  name: "Buxoro BXO Rahbariyat - BXO boshlig'i o'inbosari(Biznes)- Kamolov Mirjon Mirxon o'g'li",
}
</script>

<template>
  <VCard class="border">
    <VTable>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Ko'rsatkich turi</th>
          <th class="text-left">Ko'rsatkichlar</th>
          <th class="text-left">Reja</th>
          <th class="text-left">Fakt</th>
          <th class="text-left">Reja bajarilishi</th>
          <th class="text-left">Ulushi</th>
          <th class="text-left">Samaradorlik bajarilishi %</th>
          <th class="text-left">Min</th>
          <th class="text-left">Maks</th>
          <th class="text-left">Jami</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="11">
         hjhfhgh
          </td>
        </tr>
        <tr class="border">
          <td class="hidden">dfsfsdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td class="hidden">fsdfsafasdf</td>
          <td rowspan="12">0010101</td>
        </tr>
        <tr v-for="item in 10">
          <td>
            {{ userData.data[0].id }}
          </td>
          <td>
            {{ userData.data[0].indicator_type }}
          </td>
          <td>
            {{ userData.data[0].indicator_name }}
          </td>
          <td>
            {{ userData.data[0].plan }}
          </td>
          <td>
            {{ userData.data[0].fact }}
          </td>
          <td>
            {{ userData.data[0].plan_implementation }}
          </td>
          <td>
            {{ userData.data[0].share }}
          </td>
          <td>
            {{ userData.data[0].efficiency_implementation }}
          </td>
          <td>
            {{ userData.data[0].min }}
          </td>
          <td>
            {{ userData.data[0].maks }}
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
