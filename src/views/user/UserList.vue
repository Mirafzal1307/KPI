<template>
  <UserListFilter></UserListFilter>

  <v-card class="border">
    <template #title>Foydalanuvchilar ro'yxati</template>
    <v-data-table v-if="userList" :loading="false" :headers="headers" :items="userList.items">
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <v-card class="m-2" elevation="2" rounded>
              <v-img :src="item.img_path" width="40" cover></v-img>
            </v-card>
          </td>
          <td>{{ item.username }}</td>
          <td>{{ item.full_name }}</td>
          <td>{{ item.user_status.name }}</td>
          <td>{{ item.branch }}</td>
          <td>{{ item.block }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.management }}</td>
          <td>{{ item.division }}</td>
          <td>{{ item.position }}</td>
          <td>{{ item.head }}</td>
          <td>{{ item.tabel_number }}</td>
          <td>{{ item.inps }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import UserListFilter from './UserListFilter.vue';


const userStore = useUserStore();
const { userList } = storeToRefs(userStore);
const getUserList = async () => {
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
};

const headers = [
  { title: "img" },
  { title: "Foydalanuvchi nomi", key: 'username' },
  { title: 'To\'liq ismi', key: 'full_name' },
  { title: 'Foydalanuvchi statusi', key: 'user_status.name' },
  { title: 'Filial', key: 'branch' },
  { title: 'Blok', key: 'block' },
  { title: 'Departament', key: 'department' },
  { title: 'Boshqarma', key: 'management' },
  { title: 'Bo\'lim', key: 'division' },
  { title: 'Lavozim', key: 'position' },
  { title: 'Head', key: 'head' },
  { title: 'table_number', key: 'table_number' },
  { title: 'INPS', key: 'inps' },
];


onMounted(() => {
  getUserList();
});
</script>
