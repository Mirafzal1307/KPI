<script setup>
import aviato from '@images/logos/aviato.png'
import bitbank from '@images/logos/bitbank.png'
import zipcar from '@images/logos/zipcar.png'

const earnings = [
  {
    avatar: zipcar,
    title: 'Zipcar',
    subtitle: 'Vuejs, React & HTML',
    amount: '$24,895.65',
    progress: 'primary',
  },
  {
    avatar: bitbank,
    title: 'Bitbank',
    subtitle: 'Sketch, Figma & XD',
    amount: '$8,6500.20',
    progress: 'info',
  },
  {
    avatar: aviato,
    title: 'Aviato',
    subtitle: 'HTML & Anguler',
    amount: '$1,2450.80',
    progress: 'secondary',
  },
]
</script>

<template>
  <VCard class="border">
    <div class="ma-12 d-flex justify-center align-center flex-column" >
      <img 
      class="w-100 mb-10 text-center"
        src="/src/assets//images/logos/american-bank.png"
        alt=""
      />
      <VBtn>Shaxsiy monitoring / ma'lumot</VBtn>
    </div>
  
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
