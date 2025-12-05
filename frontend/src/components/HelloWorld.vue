<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div
    class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ..."
  >
    <div class="space-y-2 text-center sm:text-left">
      <div class="space-y-0.5">
        <p class="font-medium text-gray-500">Below is a count button</p>
      </div>
      <button
        type="button"
        @click="count++"
        class="border-purple-200 text-purple-600 hover:bg-red-600 hover:text-black active:bg-purple-700 sm:flex-row sm:items-center sm:gap-6 sm:py-4"
      >
        count is {{ count }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
