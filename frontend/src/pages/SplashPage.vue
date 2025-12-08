<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-300">
    <div
      class="bg-[#1F1616] p-12 sm:p-16 md:p-24 rounded-lg text-center shadow-lg min-w-[300px] sm:min-w-[500px] md:min-w-[800px] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex flex-col justify-between"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8 transition-colors duration-200"
      >
        WH40K ARMY BUILDER
      </h1>
      <button
        @click="goToLogin"
        class="bg-gray-700 hover:bg-gray-200 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg transition-colors duration-200 self-center hover:text-black"
      >
        Go to Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function goToLogin() {
  router.push("/login");
}
</script>
