<script setup lang="ts">
import { ref, onMounted } from "vue";
// import axios from "axios";

type Unit = {
  id: number;
  name: string;
};

const units = ref<Unit[]>([]);
const loading = ref(true);
// const error = ref<string | null>(null);

// DUMMY FETCH
async function fetchUnits() {
  loading.value = true;

  await new Promise((r) => setTimeout(r, 500));

  units.value = [
    { id: 1, name: "Warrior" },
    { id: 2, name: "Immortal" },
    { id: 3, name: "Destroyer" },
  ];

  loading.value = false;
}

// REAL FETCH
// async function fetchUnits() {
//   try {
//     const response = await axios.get<Unit[]>("/api/units");
//     units.value = response.data;
//   } catch (err) {
//     units.value = [];
//     error.value = "No units available.";
//   } finally {
//     loading.value = false;
//   }
// }

const selectedUnitId = ref<number | null>(null);

const emit = defineEmits<{
  (e: "select", unit: Unit): void;
}>();

function selectUnit(unit: Unit) {
  selectedUnitId.value = unit.id;
  emit("select", unit);
}

onMounted(() => {
  fetchUnits();
});
</script>

<template>
  <section
    data-cy="unit-selection-card"
    class="bg-gray-200 rounded-lg shadow-md p-6 max-w-md"
  >
    <h3 class="text-xl font-semibold mb-4">Unit Selection</h3>

    <p v-if="loading">Loading units…</p>

    <p v-else-if="units.length === 0">No units available.</p>

    <ul v-else>
      <li v-for="unit in units" :key="unit.id">
        <button
          @click="selectUnit(unit)"
          class="w-full text-left p-3 rounded-md transition bg-gray-100 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500"
          :class="{
            'bg-blue-400 text-white hover:bg-blue-500':
              selectedUnitId === unit.id,
          }"
        >
          {{ unit.name }}
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
