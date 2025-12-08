<template>
  <div class="page register">
    <h2>Register</h2>
    <form @submit.prevent>
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Create account</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const username = ref("");
const email = ref("");
const password = ref("");
</script>

<style scoped>
.page {
  padding: 24px;
}
</style>
