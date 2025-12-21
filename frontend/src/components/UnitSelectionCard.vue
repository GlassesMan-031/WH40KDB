<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { extractPoints } from "../utils/CatHelpers.ts";
import type { Unit } from "../utils/interfaces.ts";
const props = defineProps<{
  id: number;
  length: number;
  cat: any;
}>();

// hardcoded value for testing
// const id = 1;

const units = ref<Unit[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedUnitId = ref<string | null>(null);
let newLength: number = 0;

const emit = defineEmits<{
  (e: "select", unit: Unit): void;
}>();

async function selectUnit(unit: Unit) {
  selectedUnitId.value = unit.xml_id;
  let newId = props.length > newLength ? props.length : newLength;
  let unitWithId = { id: newId, ...unit };
  newLength = newId + 1;
  emit("select", unitWithId);

  if (!props.id) {
    console.error("id is missing!");
    return;
  }

  console.log("Posting unit to backend", {
    id: props.id,
    unit,
  });

  try {
    const response = await axios.post(`/api/unit/${props.id}`, {
      name: unit.name,
      xml_id: unit.xml_id.toString(),
      selection: unit,
    });
    console.log("Unit saved successfully:", response.data);
  } catch (err) {
    console.error("Failed to save unit:", err);
  }
}

// goes through battlescribe data
async function fetchUnits() {
  loading.value = true;
  error.value = null;

  try {
    const list = Array.isArray(props.cat) ? props.cat : [props.cat];

    units.value = list
      .filter((e: any) => e.type === "unit" || e.type === "model")
      .map((e: any) => ({
        xml_id: e.id,
        name: e.name,
        type: e.type,
        points: extractPoints(e),
      }));
  } catch (err) {
    error.value = "Failed to load units";
    units.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchUnits());
</script>

<template>
  <section
    data-cy="unit-selection-card"
    class="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col h-full"
  >
    <h3 class="text-xl font-semibold mb-4 shrink-0">Unit Selection</h3>

    <p v-if="loading" data-cy="unit-loading" class="text-gray-600">
      Loading units…
    </p>

    <p
      v-else-if="units.length === 0"
      data-cy="unit-empty"
      class="text-gray-600"
    >
      No units available.
    </p>

    <div
      v-else
      class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
    >
      <ul data-cy="unit-list" class="flex flex-col gap-2">
        <li v-for="unit in units" :key="unit.xml_id">
          <button
            data-cy="unit-button"
            @click="selectUnit(unit)"
            class="w-full mx-1 flex justify-between items-center p-3 rounded-md transition bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{
              'bg-blue-400 hover:bg-blue-500': selectedUnitId === unit.xml_id,
            }"
          >
            <span class="flex items-center gap-1">
              {{ unit.name }}
              <span
                v-if="unit.type === 'model'"
                data-cy="unit-model-tag"
                class="text-gray-500 text-sm"
              >
                (model)
              </span>
            </span>

            <span data-cy="unit-points" class="font-semibold text-gray-700">
              {{ unit.points }} pts
            </span>
          </button>
        </li>
      </ul>
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
