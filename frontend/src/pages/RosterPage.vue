<script setup lang="ts">
import { onMounted, ref } from "vue";
import Sidebar from "../components/SideBar.vue";
import { getAccount, type accountState } from "../stores/globalState";
import type { army } from "../utils/interfaces";
import Modal from "../components/Modal.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { currentArmyId } from "../stores/SideBarState";

const rosterList = ref<army[]>([]);

const account: accountState = getAccount();
const router = useRouter();

const showModal = ref(false);

const armyName = ref("");
const armyPoints = ref(0);

function createNewArmy(event: SubmitEvent) {
  // implement create new army here?
  event.preventDefault();
  if (account.id === undefined) {
    console.log("not logged in");
    return;
  }
  const newArmy: army = {
    owner_id: account.id,
    name: armyName.value,
    max_points: armyPoints.value,
  };
  console.log("sending army");
  axios.post("api/army/", newArmy).then((res) => {
    console.log(res);

    if (res.status === 200) {
      showModal.value = false;
      rosterList.value = [...rosterList.value, res.data];
    }
  });
}

onMounted(() => {
  axios.get(`api/army/${account.id}`).then((res) => {
    rosterList.value = res.data;
  });
});
</script>

<template>
  <div class="h-full w-full flex flex-row bg-gray-300">
    <Sidebar />
    <div id="roster-list" class="flex flex-row flex-wrap gap-4 p-8">
      <div
        id="roster-card"
        v-for="(item, index) in rosterList"
        :key="index"
        class="bg-gray-200 rounded-lg h-64 w-64 p-4 shadow-lg"
        @click="
          () => {
            router.push(`/army-builder/${item.id}`);
            currentArmyId = item.id!;
          }
        "
      >
        <h3 class="text-3xl font-semibold border-b-2 border-gray-400 mb-2">
          {{ item.name }}
        </h3>
        <p>Points: {{ item.max_points }}</p>
        <p class="">ID: {{ item.id }}</p>
      </div>
      <div
        id="roster-create"
        class="bg-gray-200 rounded-lg size-64 flex justify-center align-middle inset-shadow-sm"
      >
        <button class="text-8xl size-full" @click="showModal = true">+</button>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" dismissable v-model:show="showModal">
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
            class="border-b-2 border-gray-400 w-3/5"
            @change="
              (event) => (armyName = (event.target as HTMLInputElement).value)
            "
          />
        </div>
        <div class="flex flex-row gap-4">
          <label for="army-number" class="block">Points:</label>
          <input
            class="w-fit inline-block border-b-2 border-gray-400"
            id="army-number"
            type="number"
            min="0"
            step="100"
            max="9999"
            placeholder="0"
            @change="
              (event) =>
                (armyPoints = Number((event.target as HTMLInputElement).value))
            "
          />
          <p>{{ armyPoints }}</p>
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
