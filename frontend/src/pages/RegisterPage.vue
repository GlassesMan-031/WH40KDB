<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const username = ref("");
const password = ref("");
const Email = ref("");

function handleLogin() {
  console.log("Logging in with:", username.value, password.value);
  // placeholder so that we can connect it to backend later
}

function goToRegister() {
  router.push("/register");
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
      <input
        v-model="Email"
        type="text"
        placeholder="Email"
        class="w-3/4 max-w-[400px] mb-6 p-4 rounded-lg text-black bg-gray-200 mx-auto"
      />
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-3/4 max-w-[400px] mb-6 p-4 rounded-lg text-black bg-gray-200 mx-auto"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-3/4 max-w-[400px] mb-6 p-4 rounded-lg text-black bg-gray-200 mx-auto"
      />

      <button
        @click="handleLogin"
        class="w-2/3 max-w-[360px] mx-auto bg-gray-700 hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4 hover:text-black"
      >
        Log In
      </button>

      <p class="text-white mt-4">
        <span>Already signed up? </span>
        <span
          @click="goToRegister"
          class="underline cursor-pointer hover:text-teal-400 transition-colors duration-200"
        >
          Login here
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
