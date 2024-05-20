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
      <v-window-item><div class="pa-10">one</div> </v-window-item>
      <v-window-item><div class="pa-10">two</div></v-window-item>
      <v-window-item><div class="pa-10">three</div></v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref(null)
</script>
