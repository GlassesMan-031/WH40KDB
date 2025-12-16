<template>
  <div class="page register">
    <h2>Register</h2>
    <form @submit="signup($event)">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Create account</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
const username = ref("");
const email = ref("");
const password = ref("");

function signup(event: SubmitEvent) {
  event.preventDefault();
  axios
    .post("/api/account", {
      username: username.value,
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      console.log(res);
    });
}
</script>

<style scoped>
.page {
  padding: 24px;
}
</style>
