<template>
  <v-card class="border">
    <template #title>Lavozimlar ro'yxati</template>

    <v-row justify="end" class="pa-4">
      <v-btn color="primary" class="rounded-pill" @click="openAddDialog" elevation="2">
        <v-icon left>ri-add-fill</v-icon>
        Lavozim qo'shish
      </v-btn>
    </v-row>
    <v-data-table :headers="headers" :items="positions">
      <template #item.actions="{ item }">
        <v-col cols="5 d-flex justify-between">
          <v-icon color="error" @click="openDeleteDialog(item)">ri-delete-bin-6-fill</v-icon>
          <v-icon color="primary" @click="openEditDialog(item)">ri-edit-fill</v-icon>
        </v-col>
      </template>
    </v-data-table>


    <v-dialog v-model="deleteDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">O'chirishni tasdiqlash</v-card-title>
        <v-card-text>Siz "{{ currentItem?.name }}"nomli lavozimni rostdan o'chirasizmi?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="confirmDelete">O'chirish</v-btn>
          <v-btn @click="deleteDialog = false">Bekor qilish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Edit Position</v-card-title>
        <v-card-text>
          <v-text-field class="mb-2" v-model="currentItem.name" label="Position Name"></v-text-field>
          <v-text-field v-model="currentItem.level" label="Lavozim darajasi" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveEdit">Tahrirlash</v-btn>
          <v-btn color="error" @click="editDialog = false">Bekor qilish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Lavozim qo'shing</v-card-title>
        <v-card-text>
          <v-text-field class="mb-2" v-model="newPosition.name" label="Lavozim nomi"></v-text-field>
          <v-text-field v-model="newPosition.level" label="Lavozim darajasi" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveNewPosition">Qo'shish</v-btn>
          <v-btn color="error" @click="addDialog = false">Bekor qilish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { usePositionStore } from '@/store/position';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';

const positionStore = usePositionStore();
const { positions } = storeToRefs(positionStore);

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Lavozim', value: 'name' },
  { title: 'Daraja', value: 'level' },
  { title: 'Actions', value: 'actions', sortable: false }
];

const deleteDialog = ref(false);
const editDialog = ref(false);
const addDialog = ref(false);
const currentItem = reactive({ id: null, name: '', level: 0 });
const newPosition = reactive({ name: '', level: 0 });

const openDeleteDialog = (item) => {
  currentItem.id = item.id;
  currentItem.name = item.name;
  currentItem.level = item.level;
  deleteDialog.value = true;
};

const openEditDialog = (item) => {
  currentItem.id = item.id;
  currentItem.name = item.name;
  currentItem.level = item.level;
  editDialog.value = true;
};

const openAddDialog = () => {
  newPosition.name = '';
  newPosition.level = 0;
  addDialog.value = true;
};

const confirmDelete = () => {
  try {
    const data = positionStore.deletePosition(currentItem.id);
    if (data) {
      positionStore.fetchPositions();
      deleteDialog.value = false;
    }
  } catch (error) {
    console.log(error);
  }
  finally {
    positionStore.fetchPositions();
  }

};


const saveEdit = () => {
  positionStore.updatePosition(currentItem.id, { name: currentItem.name, level: currentItem.level });
  editDialog.value = false;
  positionStore.fetchPositions();

};

const saveNewPosition = () => {
  try {
    const data = positionStore.createPosition({ name: newPosition.name, level: newPosition.level });
    if (data) {
      addDialog.value = false;
      positionStore.fetchPositions();
    }


  } catch (error) {
    console.log(error);
  }
  finally {
    positionStore.fetchPositions();
  }


};

onMounted(() => {
  positionStore.fetchPositions();
});
</script>
