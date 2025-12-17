<script setup lang="ts">
import { checkSessionAccount } from "./stores/globalState";
import { onMounted } from "vue";

// import HelloWorld from "./components/HelloWorld.vue";
onMounted(() => {
  checkSessionAccount();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
