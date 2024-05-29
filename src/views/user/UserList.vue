<template>
  <UserListFilter></UserListFilter>

  <v-card class="border">
    <template #title>Foydalanuvchilar ro'yxati</template>
    <v-row justify="end" class="pa-4">
      <v-btn color="primary" @click="openCreateDialog">Add User</v-btn>

    </v-row>
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
          <td>
            <v-icon color="error" @click="openDeleteDialog(item)">ri-delete-bin-6-fill</v-icon>
            <v-icon color="primary" @click="openEditDialog(item)">ri-edit-fill</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>


    <v-dialog v-model="deleteDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete the user "{{ currentItem?.username }}"?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="confirmDelete">Delete</v-btn>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">{{ isEditing ? 'Edit User' : 'Create User' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="currentItem.username" label="Username"></v-text-field>
          <v-text-field v-model="currentItem.full_name" label="Full Name"></v-text-field>
          <v-autocomplete return-object item-value="id" item-title="name" v-model="currentItem.user_status"
            :items="statuses" label="Fotyalanuvchi statusi" :loading="loadingStatus"></v-autocomplete>
          <v-autocomplete return-object item-value="id" item-title="name" v-model="currentItem.branch" :items="branches"
            label="Filial" :loading="loadingBranches"></v-autocomplete>
          <v-autocomplete return-object item-value="id" item-title="name" v-model="currentItem.block" :items="blocks"
            label="Block" :loading="loadingBlocks"></v-autocomplete>
          <v-autocomplete return-object item-value="id" item-title="name" v-model="currentItem.department"
            :items="departments" label="Department" :loading="loadingDepartments"></v-autocomplete>
          <v-autocomplete return-object item-value="id" item-title="name" v-model="currentItem.management"
            :items="managements" label="Management" :loading="loadingManagements"></v-autocomplete>
          <v-autocomplete return-object item-value="id" item-title="name" v-model="currentItem.division"
            :items="divisions" label="Division" :loading="loadingDivisions"></v-autocomplete>
          <v-autocomplete return-object item-value="id" item-title="name" v-model="currentItem.position"
            :items="positions" label="Position" :loading="loadingPositions"></v-autocomplete>
          <v-autocomplete return-object item-value="id" item-title="full_name" v-model="currentItem.head"
            :items="userList.items" label="Boshliq" :loading="loadingHeads"></v-autocomplete>
          <v-text-field v-model="currentItem.tabel_number" label="Table Number"></v-text-field>
          <v-text-field v-model="currentItem.inps" label="INPS"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveEdit">{{ isEditing ? 'Saqlash' : 'Create' }}</v-btn>
          <v-btn color="error" @click="editDialog = false">Bekor qilish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { useBlockStore } from '@/store/blocks';
import { useBranchStore } from '@/store/branches';
import { useDepartmentStore } from '@/store/department';
import { useDivisionStore } from '@/store/division';
import { useManagementStore } from '@/store/management';
import { usePositionStore } from '@/store/position';
import { useStatusStore } from '@/store/status';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import UserListFilter from './UserListFilter.vue';

const statusStore = useStatusStore();
const userStore = useUserStore();
const departmentStore = useDepartmentStore();
const branchStore = useBranchStore();
const blockStore = useBlockStore();
const managementStore = useManagementStore();
const divisionStore = useDivisionStore();
const positionStore = usePositionStore();

const { userList } = storeToRefs(userStore);
const { departments } = storeToRefs(departmentStore);
const { branches } = storeToRefs(branchStore);
const { blocks } = storeToRefs(blockStore);
const { managements } = storeToRefs(managementStore);
const { divisions } = storeToRefs(divisionStore);
const { positions } = storeToRefs(positionStore);
const { statuses } = storeToRefs(statusStore);

const loadingBranches = ref(true);
const loadingBlocks = ref(true);
const loadingDepartments = ref(true);
const loadingManagements = ref(true);
const loadingDivisions = ref(true);
const loadingPositions = ref(true);
const loadingHeads = ref(true);
const loadingStatus = ref(true);

const getUserList = async () => {
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
};

const getOptions = async () => {
  try {
    await Promise.all([
      statusStore.fetchStatuses(),
      userStore.getUsers(),
      branchStore.fetchBranches(),
      blockStore.fetchBlocks(),
      departmentStore.fetchDepartments(),
      managementStore.fetchManagements(),
      divisionStore.fetchDivisions(),
      positionStore.fetchPositions()
    ]);
  } catch (error) {
    console.error('Error fetching options:', error);
  } finally {
    loadingHeads.value = false;
    loadingBranches.value = false;
    loadingBlocks.value = false;
    loadingDepartments.value = false;
    loadingManagements.value = false;
    loadingDivisions.value = false;
    loadingPositions.value = false;
    loadingStatus.value = false;
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
  { title: 'Tabel raqami', key: 'tabel_number' },
  { title: 'INPS', key: 'inps' },
  { title: 'Actions' }
];

const deleteDialog = ref(false);
const editDialog = ref(false);
const currentItem = reactive({});
const isEditing = ref(false);

const openDeleteDialog = (item) => {
  Object.assign(currentItem, item);
  deleteDialog.value = true;
};

const openEditDialog = (item) => {
  isEditing.value = true;
  Object.assign(currentItem, item);
  editDialog.value = true;
};

const openCreateDialog = () => {
  isEditing.value = false;
  Object.assign(currentItem, {
    username: '',
    full_name: '',
    user_status: null,
    branch: null,
    block: null,
    department: null,
    management: null,
    division: 1,
    position: null,
    head: null,
    tabel_number: '',
    inps: ''
  });
  editDialog.value = true;
};

const confirmDelete = async () => {
  try {
    await userStore.deleteUser(currentItem.id);
    await getUserList();
  } catch (error) {
    console.error('Error deleting user:', error);
  } finally {
    deleteDialog.value = false;
  }
};


const saveEdit = async () => {
  try {
    const userPayload = {
      username: currentItem.username,
      full_name: currentItem.full_name,
      user_status_id: currentItem.user_status?.id || null,
      branch_id: currentItem.branch?.id || null,
      block_id: currentItem.block?.id || null,
      department_id: currentItem.department?.id || null,
      management_id: currentItem.management?.id || null,
      division_id: currentItem.division?.id || null,
      position_id: currentItem.position?.id || null,
      head_id: currentItem.head?.id || null,
      tabel_number: currentItem.tabel_number,
      inps: currentItem.inps
    };

    if (isEditing.value) {
      await userStore.updateUser(currentItem.id, userPayload);
    } else {
      await userStore.createUser(userPayload);
    }

    await getUserList(); // Refresh the list
  } catch (error) {
    console.error('Error saving user:', error);
  } finally {
    editDialog.value = false;
  }
};

onMounted(() => {
  getUserList();
  getOptions();
});
</script>

<style scoped>
.v-card {
  margin-block-end: 20px;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.v-card-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
