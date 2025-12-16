<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../components/SideBar.vue";
import { getAccount, type accountState } from "../stores/globalState";
import type { army } from "../utils/interfaces";
import Modal from "../components/Modal.vue";

const rosterList = ref([1, 2]);

const account: accountState = getAccount();

const showModal = ref(false);

function createNewArmy(event: SubmitEvent) {
  // implement create new army here?
  event.preventDefault();
  if (account.id === undefined) {
    console.log("not logged in");
    return;
  }
  const newArmy: army = {
    owner_id: account.id,
    name: "testArmy",
    max_points: 2000,
  };

  showModal.value = false;
  return;
}
</script>

<template>
  <div class="h-full w-full flex flex-row">
    <Sidebar />
    <div id="roster-list" class="flex flex-row flex-wrap gap-4 m-4">
      <div
        id="roster-card"
        v-for="(item, index) in rosterList"
        :key="index"
        class="bg-gray-200 rounded-lg h-64 w-64"
      >
        <h3 class="text-3xl font-semibold">Army name</h3>
        <p>index: {{ index }}</p>
      </div>
      <div
        id="roster-create"
        class="bg-gray-200 rounded-lg size-64 flex justify-center align-middle"
      >
        <button class="text-8xl size-full" @click="showModal = true">+</button>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @maskclick="showModal = false">
    <template #header>
      <h3 class="text-3xl font-semibold shrink-0">New Army</h3>
    </template>
    <template #body>
      <form @submit="createNewArmy($event)" class="flex flex-col gap-4">
        <div class="flex flex-row gap-4">
          <label for="army-name">Name:</label>
          <input
            id="army-name"
            type="text"
            placeholder="Army name"
            class="border-b-2 border-gray-300 w-3/5"
          />
        </div>
        <div class="flex flex-row gap-4">
          <label for="army-number" class="block">Points:</label>
          <input
            class="w-fit inline-block"
            id="army-number"
            type="number"
            min="0"
            step="100"
            max="9999"
            placeholder="0"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </template>
  </Modal>
</template>

<style scoped>
.page {
  padding: 24px;
}
</style>
