<script setup lang="ts">
import { computed } from "vue";
import { selectionEntry, selectionGroup } from "../utils/interfaces.ts";

type Unit = {
  id: number;
  name: string;
  type: string;
  points: number;
};

const props = defineProps<{
  unitData: Unit;
}>();
</script>

<template>
  <section
    id="uniteditor"
    class="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col h-full"
  >
    <h3
      id="unitname"
      class="text-xl font-semibold mb-4 shrink-0"
      v-if="props.unitData"
    >
      {{ props.unitData.name }}
    </h3>
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
