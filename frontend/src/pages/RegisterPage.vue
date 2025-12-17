<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
      if (res.status === 200) {
        router.push("/login");
      }
    });
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-300">
    <div
      class="bg-[#1F1616] p-16 md:p-24 rounded-lg text-center shadow-xl min-w-[500px] md:min-w-[700px] lg:min-w-[900px] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex flex-col justify-center"
    >
      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-10">
        Register
      </h1>

      <form @submit="signup($event)" class="flex flex-col items-center">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-3/4 max-w-[400px] mb-6 p-4 rounded-lg text-black bg-gray-200"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-3/4 max-w-[400px] mb-6 p-4 rounded-lg text-black bg-gray-200"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-3/4 max-w-[400px] mb-6 p-4 rounded-lg text-black bg-gray-200"
        />

        <button
          type="submit"
          class="w-2/3 max-w-[360px] bg-gray-700 hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:text-black"
        >
          Create account
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
