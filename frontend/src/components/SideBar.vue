<script setup lang="ts">
import { useRoute } from "vue-router";

import { ref } from "vue";

const route = useRoute();
const isCollapsed = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<template>
  <aside
    :class="[
      'h-screen bg-gray-200 text-black p-4 flex flex-col shadow-lg transition-all duration-300 relative',
      isCollapsed ? 'w-16' : 'w-48',
    ]"
  >
    <button
      @click="toggleSidebar"
      class="absolute top-3 right-3 bg-gray-400 hover:bg-gray-500 text-white p-1 rounded transition-all duration-200 text-xs"
    >
      {{ isCollapsed ? ">" : "<" }}
    </button>

    <h2 v-if="!isCollapsed" class="text-2xl font-bold mb-8 mt-6">Menu</h2>

    <nav class="flex flex-col gap-4 mt-10">
      <RouterLink
        to="/profile"
        class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-amber-200 relative"
        :class="{
          'bg-amber-300 font-bold border-l-4 border-amber-700':
            route.path === '/profile',
          'border-l-4 border-transparent': route.path !== '/profile',
        }"
      >
        <span v-if="isCollapsed">👤</span>
        <span v-else>Profile</span>
      </RouterLink>

      <RouterLink
        to="/army-roster"
        class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-amber-200 relative"
        :class="{
          'bg-amber-300 font-bold border-l-4 border-amber-700':
            route.path === '/army-roster',
          'border-l-4 border-transparent': route.path !== '/army-roster',
        }"
      >
        <span v-if="isCollapsed">📜</span>
        <span v-else>Army Roster</span>
      </RouterLink>

      <RouterLink
        to="/army-builder"
        class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-amber-200 relative"
        :class="{
          'bg-amber-300 font-bold border-l-4 border-amber-700':
            route.path === '/army-builder',
          'border-l-4 border-transparent': route.path !== '/army-builder',
        }"
      >
        <span v-if="isCollapsed">⚒️</span>
        <span v-else>Army Builder</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped></style>
