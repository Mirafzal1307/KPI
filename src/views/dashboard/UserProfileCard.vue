<script setup>



</script>

<template>
  <VCard class="border">
    <div class="mx-10 h-100 d-flex align-center flex-column justify">
      <img
        class="w-100 mb-10 text-center"
        src="/src/assets//images/avatars/userImg.png"
        alt=""
      />
      <RouterLink :to="{ name: 'user-profile', query: { id: '1' } }">

        <VBtn >Shaxsiy monitoring / ma'lumot</VBtn>
      </RouterLink>
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}

.justify {
  justify-content: space-around !important;
}
</style>
