<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../components/SideBar.vue";
import UnitSelectionCard from "../components/UnitSelectionCard.vue";
import FinalArmyCard from "../components/ArmyCard.vue";
import UnitEditor from "../components/UnitEditor.vue";

type Unit = {
  id: number;
  name: string;
  type: string;
  points: number;
};

const selectedUnits = ref<Unit[]>([]);
function handleUnitSelect(unit: Unit) {
  if (!selectedUnits.value.find((u) => u.id === unit.id)) {
    selectedUnits.value.push(unit);
  }
}

const showEditor = ref(false);
const selectedUnit = ref<Unit | null>(null);

function showUnitEditor(id: number) {
  console.log("func");
  const u = selectedUnits.value.find((u) => u.id === id);
  selectedUnit.value = u ? u : null;
  if (selectedUnit.value === null) {
    return;
  }
  showEditor.value = true;
}
</script>
<template>
  <div class="flex h-screen bg-gray-300">
    <Sidebar />

    <main class="flex-1 p-8 flex gap-6 h-full">
      <UnitSelectionCard
        @select="handleUnitSelect"
        class="flex-1 max-w-md h-full"
      />

      <div class="h-full flex flex-col">
        <FinalArmyCard
          :selectedUnits="selectedUnits"
          @unit-clicked="showUnitEditor"
          class="max-w-md flex-2"
        />

        <UnitEditor
          v-if="showEditor"
          :unitData="selectedUnit!"
          class="flex-1"
        />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
