<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  UserIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";

import { isSidebarCollapsed, currentArmyId } from "../stores/SideBarState";

const route = useRoute();

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}
</script>

<template>
  <aside
    :class="[
      'h-screen bg-gray-300 text-black p-4 flex flex-col shadow-lg transition-all duration-300 relative',
      isSidebarCollapsed ? 'w-16' : 'w-48',
    ]"
  >
    <button
      @click="toggleSidebar"
      class="absolute top-4 right-4 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-1 shadow-md transition-all duration-200 w-6 h-6 flex items-center justify-center"
    >
      <span v-if="!isSidebarCollapsed">«</span>
      <span v-else>»</span>
    </button>
    <div class="mb-10 h-8">
      <h2
        v-if="!isSidebarCollapsed"
        class="text-2xl font-semibold mb-0 transition-opacity duration-300"
      >
        Menu
      </h2>
    </div>

    <TransitionGroup
      name="fade-slide"
      tag="nav"
      class="flex flex-col gap-3 mt-5"
    >
      <RouterLink
        to="/profile"
        class="flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
        :class="[
          route.path === '/profile'
            ? 'bg-gray-400 font-bold border-l-4 border-amber-400'
            : 'border-l-4 border-transparent',
          isSidebarCollapsed ? 'justify-center' : 'gap-3',
        ]"
      >
        <UserIcon class="w-6 h-6 shrink-0" />
        <span v-if="!isSidebarCollapsed">Profile</span>
      </RouterLink>

      <RouterLink
        to="/army-roster"
        class="flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
        :class="[
          route.path === '/army-roster'
            ? 'bg-gray-400 font-bold border-l-4 border-amber-400'
            : 'border-l-4 border-transparent',
          isSidebarCollapsed ? 'justify-center' : 'gap-3',
        ]"
      >
        <ClipboardDocumentListIcon class="w-6 h-6 shrink-0" />
        <span v-if="!isSidebarCollapsed">Army Roster</span>
      </RouterLink>

      <RouterLink
        v-if="currentArmyId != 0"
        :to="`/army-builder/${currentArmyId}`"
        class="flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
        :class="[
          route.path === `/army-builder/${currentArmyId}`
            ? 'bg-gray-400 font-bold border-l-4 border-amber-400'
            : 'border-l-4 border-transparent',
          isSidebarCollapsed ? 'justify-center' : 'gap-3',
        ]"
      >
        <WrenchScrewdriverIcon class="w-6 h-6 shrink-0" />
        <span v-if="!isSidebarCollapsed">Army Builder</span>
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
