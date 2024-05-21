<template>
  <v-card class="border pa-10">
    <v-tabs
      v-model="tab"
      background-color="primary"
    >
      <v-tab>KO'RSATKICH KATEGORIYASI</v-tab>
      <v-tab>KO'RSATKICHLAR RO'YHATI</v-tab>
      <v-tab>KO'RSATKICH BIRIKTIRISH</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        ><div class="pa-10"><IndicatorCategory /></div>
      </v-window-item>
      <v-window-item><div class="pa-10"><IndicatorList/></div></v-window-item>
      <v-window-item><div class="pa-10"><AddIndicator/></div></v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import AddIndicator from '@/views/kpi/AddIndicator.vue';
import IndicatorCategory from '@/views/kpi/IndicatorCategory.vue'
import IndicatorList from '@/views/kpi/IndicatorList.vue';
import { ref } from 'vue'

const tab = ref(null);
</script>
