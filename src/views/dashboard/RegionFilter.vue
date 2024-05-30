<!-- FilterNav.vue -->
<template>


</template>

<script setup>
import { ref } from 'vue';

const filters = ref({
  page: null,
  size: null,
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

const applyFilters = () => {
  console.log('Filters:', filters.value);
  // Implement the filter logic here
  // For example, make an API call with the filters
};
</script>

<style scoped>
/* Add any scoped styles here if necessary */
</style>
