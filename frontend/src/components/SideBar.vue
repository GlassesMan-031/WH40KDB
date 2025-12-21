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
    data-cy="sidebar"
    :class="[
      'h-screen bg-gray-300 text-black p-4 flex flex-col shadow-lg transition-all duration-300 relative',
      isSidebarCollapsed ? 'w-16' : 'w-48',
    ]"
  >
    <button
      data-cy="sidebar-toggle"
      @click="toggleSidebar"
      class="absolute top-4 right-4 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-1 shadow-md transition-all duration-200 size-8 flex items-center justify-center text-2xl text-center"
    >
      <span v-if="!isSidebarCollapsed">«</span>
      <span v-else>»</span>
    </button>

    <div class="pb-10 h-8 border-b-2 border-gray-400">
      <h2
        v-if="!isSidebarCollapsed"
        data-cy="sidebar-title"
        class="text-2xl font-semibold mb-0"
      >
        Menu
      </h2>
    </div>

    <nav
      data-cy="sidebar-nav"
      class="flex flex-col gap-3 mt-5"
    >
      <RouterLink
        data-cy="nav-profile"
        to="/profile"
        class="flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
      >
        <UserIcon class="w-6 h-6 shrink-0" />
        <span v-if="!isSidebarCollapsed">Profile</span>
      </RouterLink>

      <RouterLink
        data-cy="nav-army-roster"
        to="/army-roster"
        class="flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
      >
        <ClipboardDocumentListIcon class="w-6 h-6 shrink-0" />
        <span v-if="!isSidebarCollapsed">Army Roster</span>
      </RouterLink>

      <RouterLink
        v-if="currentArmyId != 0"
        data-cy="nav-army-builder"
        :to="`/army-builder/${currentArmyId}`"
        class="flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-400"
      >
        <WrenchScrewdriverIcon class="w-6 h-6 shrink-0" />
        <span v-if="!isSidebarCollapsed">Army Builder</span>
      </RouterLink>
    </nav>
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
