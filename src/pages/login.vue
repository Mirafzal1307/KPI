<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7 ">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img src="../assets/images/1MKBANK.png" width="300px" alt="mkb logo img" class="mb-6" />
          </div>
        </template>

      </VCardItem>

      <VCardText class="w-100">
        <h2 class="mb-3"  >MKBANK KPI tizimiga xush kelibsiz!</h2>
        <p class="pb-5" >Tizimga kirish uchun foydalanuvchi logini va parolini kiriting</p>

        <VForm @submit.prevent="login()">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.username" label="Login" type="text" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Parol" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- login button -->
              <VBtn class="mt-5" block :type="'submit'">
                Kirish 
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { loading } = storeToRefs(userStore)
const isPasswordVisible = ref(false)


const form = ref({
  username: '',
  password: '',
})

const login = async () => {
  const usercredentials = {
    username: form.value.username,
    password: form.value.password,
  }
  try {
    const res = await userStore.userLogin(usercredentials)
    console.log(res);
    toast.success('Siz ilovaga kirdingiz !')
  } catch (error) {
    return error
  }
}

console.log(form);

</script>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>
