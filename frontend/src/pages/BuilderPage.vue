<script setup lang="ts">
import Sidebar from "../components/SideBar.vue";
import UnitSelectionCard from "../components/UnitSelectionCard.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-300">
    <Sidebar />

    <main class="flex-1 p-8 overflow-y-auto">
      <UnitSelectionCard @select="(unit) => console.log('Selected:', unit)" />
    </main>
  </div>
</template>

<style scoped></style>
