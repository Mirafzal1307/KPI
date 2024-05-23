<template>
  <div>
    <VCard class="border pa-10">
      <div class="d-flex ga-10">
        <div class="w-50">
          <v-combobox label="Combobox" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="outlined"></v-combobox>
        </div>
        <div class="w-50">
          <v-text-field hide-details="auto" label="Davrni tanlang" placeholder="02.02.2024" type="date"></v-text-field>
        </div>
      </div>
      <div class="mt-10  rounded-lg" >
        <v-data-table class="border" :items="items"></v-data-table>
      </div>
    </VCard>

  </div>
</template>

<script setup>
const items = [
  {
    ['nam ma']: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    ['nam ma']: 'African Wild Dog',
    species: 'Lycaon pictus',
    diet: 'Carnivore',
    habitat: 'Savanna',
  },
  {
    ['nam ma']: 'Black Rhinoceros',
    species: 'Diceros bicornis',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    ['nam ma']: 'Cheetah',
    species: 'Acinonyx jubatus',
    diet: 'Carnivore',
    habitat: 'Savanna',
  },
  {
    ['nam ma']: 'Giraffe',
    species: 'Giraffa camelopardalis',
    diet: 'Herbivore',
    habitat: 'Savanna',
  },
  {
    ['nam ma']: 'Hippopotamus',
    species: 'Hippopotamus amphibius',
    diet: 'Herbivore',
    habitat: 'Rivers, Lakes',
  },
  {
    ['nam ma']: 'Leopard',
    species: 'Panthera pardus',
    diet: 'Carnivore',
    habitat: 'Savanna, Forests',
  },
  {
    ['nam ma']: 'Lion',
    species: 'Panthera leo',
    diet: 'Carnivore',
    habitat: 'Savanna',
  },
  {
    ['nam ma']: 'Plains Zebra',
    species: 'Equus quagga',
    diet: 'Herbivore',
    habitat: 'Savanna',
  },
  {
    ['nam ma']: 'White Rhinoceros',
    species: 'Ceratotherium simum',
    diet: 'Herbivore',
    habitat: 'Savanna',
  },
]
</script>

<!-- <style lang="scss" scoped>

</style> -->
