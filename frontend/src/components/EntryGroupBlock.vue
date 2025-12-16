<script setup lang="ts">
import type { selectionGroup } from "../utils/interfaces.ts";

const props = defineProps<{
  group: selectionGroup;
  rootIndex: number;
}>();

const emit = defineEmits<{
  (
    e: "groupUpdate",
    { group, index }: { group: selectionGroup; index: number },
  ): void;
}>();

function changeEntry(index: number, newGroup?: selectionGroup) {
  console.log("changin entry");
  if (props.group.data[index]?.type === "entry") {
    props.group.data[index].checked = !props.group.data[index].checked;
    emit("groupUpdate", { group: props.group, index: props.rootIndex });
  }
  if (props.group.data[index]?.type === "group") {
    if (newGroup === undefined) {
      return;
    }
    props.group.data[index] = newGroup;
    emit("groupUpdate", { group: props.group, index: props.rootIndex });
  }
}
</script>

<template>
  <div
    :class="
      props.group.is_root
        ? 'bg-gray-100 p-2 rounded-lg shadow-md ring-gray-200 ring-1'
        : ''
    "
  >
    <h3
      id="unitname"
      class="font-semibold mb-4 shrink-0"
      v-if="!props.group.is_root"
    >
      {{ props.group.name }}
    </h3>
    <ul>
      <li v-for="(entryItem, index) in group.data" :key="index">
        <div v-if="entryItem.type === 'entry'">
          <input
            type="checkbox"
            :checked="entryItem.checked"
            @change="changeEntry(index)"
          />{{ entryItem.name }}
        </div>
        <EntryGroupBlock
          v-if="entryItem.type === 'group' && entryItem.data.length > 0"
          :group="entryItem"
          :rootIndex="index"
          @group-update="
            (d) => {
              changeEntry(d.index, d.group);
            }
          "
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
