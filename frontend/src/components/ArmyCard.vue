<script setup lang="ts">
import { computed } from "vue";
import type { Unit } from "../utils/interfaces.ts";

const props = defineProps<{
  selectedUnits: Unit[];
}>();

const totalPoints = computed(() =>
  props.selectedUnits.reduce((sum, unit) => sum + unit.points, 0),
);
</script>

<template>
  <section class="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col basis-2">
    <h3 class="text-xl font-semibold mb-4 shrink-0">Final Army</h3>

    <div
      v-if="props.selectedUnits.length > 0"
      class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
    >
      <ul class="flex flex-col gap-2">
        <li
          v-for="unit in props.selectedUnits"
          :key="unit.id"
          class="flex justify-between items-center p-2 rounded-md bg-gray-100"
          @click="$emit('unitClicked', unit.id)"
        >
          <span class="flex items-center gap-1">
            {{ unit.name }}
            <span v-if="unit.type === 'model'" class="text-gray-500 text-sm"
              >(model)</span
            >
          </span>
          <span class="font-semibold text-gray-700">{{ unit.points }} pts</span>
        </li>
      </ul>
    </div>

    <div v-else class="flex-1 flex items-center justify-center text-gray-600">
      No units selected yet.
    </div>

    <div
      v-if="props.selectedUnits.length > 0"
      class="mt-4 flex justify-between font-semibold text-gray-800 shrink-0"
    >
      <span>Total Points:</span>
      <span>{{ totalPoints }} pts</span>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #e5e7eb;
  border-radius: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 4px;
}
</style>
