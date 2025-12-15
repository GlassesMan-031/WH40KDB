<script setup lang="ts">
import axios from "axios";
import type { selectionEntry, selectionGroup } from "../utils/interfaces.ts";
import { onMounted, ref } from "vue";

type Unit = {
  id: number;
  name: string;
  type: string;
  points: number;
};

const props = defineProps<{
  unitData: Unit;
}>();

const unitProfile = ref<any | null>(null);

async function fetchUnitData() {
  try {
    const { data } = await axios.get("/api/warhammer");

    const entries: any[] =
      data?.catalogue?.sharedSelectionEntries?.selectionEntry ?? [];
    unitProfile.value = entries.find((entry) => entry.id === props.unitData.id);
  } catch (err) {
    console.log("uh oh");
  }
}

onMounted(() => {
  fetchUnitData();
});
</script>

<template>
  <section
    id="uniteditor"
    class="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col"
  >
    <h3
      id="unitname"
      class="text-xl font-semibold mb-4 shrink-0"
      v-if="props.unitData"
    >
      {{ props.unitData.name }}
    </h3>
    <div v-if="unitProfile != null">
      <div id="unitstats">
        <h5 class="text-lg font-semibold shrink-0">Stats</h5>
        <ul>
          <li
            v-for="value in unitProfile.profiles?.profile.find((p: any) => {
              if (p.typeName === 'Unit') {
                return p;
              }
            }).characteristics.characteristic"
          >
            {{ value.name }}: {{ value.value }}
          </li>
        </ul>
      </div>
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
