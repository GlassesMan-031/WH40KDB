<script setup lang="ts">
import type { selectionGroup } from "../utils/interfaces.ts";

const props = defineProps<{
  group: selectionGroup;
}>();
</script>

<template>
  <div>
    <h3
      id="unitname"
      class="text-xl font-semibold mb-4 shrink-0"
      v-if="!props.group.is_root"
    >
      {{ props.group.name }}
    </h3>
    <ul>
      <li v-for="(entryItem, index) in group.data" :key="index">
        <input
          v-if="entryItem.type === 'entry'"
          type="checkbox"
          :value="entryItem.checked"
        />{{ entryItem.name }}
        <EntryGroupBlock
          v-if="entryItem.type === 'group'"
          :group="entryItem"
        ></EntryGroupBlock>
      </li>
    </ul>
  </div>
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
