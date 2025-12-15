<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../components/SideBar.vue";
import UnitSelectionCard from "../components/UnitSelectionCard.vue";
import FinalArmyCard from "../components/ArmyCard.vue";

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
</script>
<template>
  <div class="flex h-screen bg-gray-300">
    <Sidebar />

    <main class="flex-1 p-8 flex gap-6 h-full">
      <UnitSelectionCard
        @select="handleUnitSelect"
        class="flex-1 max-w-md h-full"
      />

      <FinalArmyCard
        :selectedUnits="selectedUnits"
        class="flex-1 max-w-md h-full"
      />
    </main>
  </div>
</template>

<style scoped></style>
