<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../components/SideBar.vue";

const rosterList = ref([1, 2]);

function createNewArmy() {
  // implement create new army here?
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
        <button class="text-8xl size-full" @click="createNewArmy()">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
}
</style>
