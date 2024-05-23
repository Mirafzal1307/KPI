<template>
  <v-card class="border mb-2">
    <v-row justify="center" class="d-flex justify-center">
      <v-col cols="12 d-flex ">
        <v-col cols="2 d-flex justify-center">
          <v-btn class="text-caption" @click="getCreditBlockData()">Boshqaruvchi</v-btn>
        </v-col>
        <v-col cols="2 d-flex justify-center">
          <v-btn class="text-caption" @click="getFinanceData()">Bosh buxgalter</v-btn>
        </v-col>
        <v-col class=" d-flex justify-center" cols="3 ">
          <v-btn class="text-caption" @click="getGovData()">Davlat dasturlari blok</v-btn>
        </v-col>
        <v-col cols="3 d-flex justify-center">
          <v-btn class="text-caption" @click="getOperationalData()">Biznes va operatsion blok </v-btn>
        </v-col>
        <v-col cols="2 d-flex justify-center">
          <v-btn class="text-caption" @click="getCreditData()">Kredit blok</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false)


const getCreditBlockData = () => {
  console.log('credit block data fetch');
}

</script>
