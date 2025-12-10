<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import {
  UserIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const isCollapsed = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<template>
  <aside
    :class="[
      'h-screen bg-gray-300 text-black p-4 flex flex-col shadow-lg transition-all duration-300 relative',
      isCollapsed ? 'w-16' : 'w-48',
    ]"
  >
    <button
      @click="toggleSidebar"
      class="absolute top-4 right-4 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-1 shadow-md transition-all duration-200 w-6 h-6 flex items-center justify-center"
    >
      <span v-if="!isCollapsed">«</span>
      <span v-else>»</span>
    </button>

    <h2
      v-if="!isCollapsed"
      class="text-2xl font-semibold mb-10 transition-opacity duration-300"
    >
      Menu
    </h2>

    <TransitionGroup
      name="fade-slide"
      tag="nav"
      class="flex flex-col gap-3 mt-5"
    >
      <RouterLink
        to="/profile"
        class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
        :class="{
          'bg-gray-400 font-bold border-l-4 border-amber-400':
            route.path === '/profile',
          'border-l-4 border-transparent': route.path !== '/profile',
        }"
      >
        <UserIcon class="w-6 h-6" />
        <span v-if="!isCollapsed">Profile</span>
      </RouterLink>

      <RouterLink
        to="/army-roster"
        class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
        :class="{
          'bg-gray-400 font-bold border-l-4 border-amber-400':
            route.path === '/army-roster',
          'border-l-4 border-transparent': route.path !== '/army-roster',
        }"
      >
        <ClipboardDocumentListIcon class="w-6 h-6" />
        <span v-if="!isCollapsed">Army Roster</span>
      </RouterLink>

      <RouterLink
        to="/army-builder"
        class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
        :class="{
          'bg-gray-400 font-bold border-l-4 border-amber-400':
            route.path === '/army-builder',
          'border-l-4 border-transparent': route.path !== '/army-builder',
        }"
      >
        <WrenchScrewdriverIcon class="w-6 h-6" />
        <span v-if="!isCollapsed">Army Builder</span>
      </RouterLink>
    </TransitionGroup>
  </aside>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-6px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
</style>
