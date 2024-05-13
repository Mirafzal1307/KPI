<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7 w-25">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img
              src="/MKBANK(M).png"
              width="30px"
              alt="mkb logo img"
            />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> MKBANK </VCardTitle>
      </VCardItem>

      <VCardText class="w-100">
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- login button -->
              <VBtn
                class="mt-5"
                block
                type="submit"
                to="/"
                @click="submit()"
              >
                Login
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const { userLogin } = useUserStore()
const userStore = useUserStore()
const { loading } = storeToRefs(userStore)
const isPasswordVisible = ref(false)


const form = ref({
  email: '',
  password: '',
})

const submit = async () => {
  const usercredentials = {
    email: form.value.email,
    password: form.value.password,
  }
  console.log(usercredentials)
  try {
    await userLogin(usercredentials)
  } catch (error) {
    return error
  }
}

console.log(form)

</script>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>
