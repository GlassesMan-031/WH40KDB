<script setup lang="ts">
import { onMounted, ref } from "vue";
import Sidebar from "../components/SideBar.vue";
import UnitSelectionCard from "../components/UnitSelectionCard.vue";
import FinalArmyCard from "../components/ArmyCard.vue";
import UnitEditor from "../components/UnitEditor.vue";
import type { Unit } from "../utils/interfaces.ts";
import { getAccount } from "../stores/globalState";
import axios from "axios";
// import type { selectionGroup } from "../utils/interfaces";

const props = defineProps<{ id: number }>();
const account = getAccount();

const selectedUnits = ref<Unit[]>([]);
function handleUnitSelect(unit: Unit) {
  if (!selectedUnits.value.find((u) => u.id === unit.id)) {
    selectedUnits.value.push(unit);
  }
}

const showEditor = ref(false);
const selectedUnit = ref<Unit | null>(null);

const cat = ref(undefined);
// const selectedUnitsData = ref<selectionGroup[]>([]);

async function fetchUnitData() {
  try {
    console.log("fetching unit data");
    const { data } = await axios.get("/api/cat");

    return data?.catalogue?.sharedSelectionEntries?.selectionEntry ?? [];
  } catch (err) {
    console.log(err);
    console.log("uh oh");
  }
}

function showUnitEditor(id: number) {
  const u = selectedUnits.value.find((u: Unit) => u.id === id);
  selectedUnit.value = u ? u : null;
  if (selectedUnit.value === null) {
    return;
  }
  showEditor.value = true;
}

function fetchUnits() {
  axios
    .post("/api/unit/get", { armyId: props.id, accountId: account.id })
    .then((res) => {
      if (res.status === 200) {
        let newUnits: Unit[] = [];
        console.log(res.data);
        res.data.forEach((u: any) => {
          let newUnit: Unit = {
            id: u.id,
            xml_id: u.selection.xml_id,
            name: u.selection.name,
            type: u.selection.type,
            points: u.selection.points,
          };
          console.log("new Unit", newUnit);
          newUnits.push(newUnit);
        });
        selectedUnits.value = newUnits;
      }
    });
}

// function fetchCat() {}

onMounted(async () => {
  fetchUnits();
  cat.value = await fetchUnitData();
});
</script>
<template>
  <div class="flex h-screen bg-gray-300">
    <Sidebar />

    <main class="flex-1 p-8 flex gap-6 h-full">
      <UnitSelectionCard
        @select="handleUnitSelect"
        class="flex-1 max-w-md h-full"
        :id="id"
        :cat="cat"
        :length="selectedUnits.length"
        v-if="cat != undefined"
      />
      <div v-else class="flex-1 max-w-md h-full">
        <section
          class="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col h-full"
        >
          <h3 class="text-xl font-semibold mb-4 shrink-0">Unit Selection</h3>

          <div
            class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          >
            <ul class="flex flex-col gap-2 animate-pulse">
              <li
                v-for="(_unit, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
                :key="index"
              >
                <button
                  class="w-full mx-1 flex justify-between items-center p-3 rounded-md transition bg-gray-100 h-12"
                ></button>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div class="h-full flex-1 flex flex-col gap-6">
        <FinalArmyCard
          v-if="cat != undefined"
          :selectedUnits="selectedUnits"
          @unit-clicked="showUnitEditor"
          class="lg:max-w-md xl:max-w-full flex-2"
        />
        <div v-else class="lg:max-w-md xl:max-w-full flex-2">
          <section
            class="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col h-full"
          >
            <h3 class="text-xl font-semibold mb-4 shrink-0">Final Army</h3>

            <div
              class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            >
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(_unit, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
                  :key="index"
                  class="flex justify-between items-center p-2 rounded-md bg-gray-100 h-10 w-full"
                ></li>
              </ul>
            </div>

            <div
              class="mt-4 flex justify-between font-semibold text-gray-800 shrink-0"
            >
              <span>Total Points:</span>
              <span>0000 pts</span>
            </div>
          </section>
        </div>

        <UnitEditor
          v-if="showEditor"
          :unitData="selectedUnit!"
          :cat="cat"
          class="flex-1"
        />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
