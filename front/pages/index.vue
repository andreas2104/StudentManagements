<script setup lang="ts">
const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Tentative de connexion avec :", email.value, password.value);
  // Ici, tu ajouteras ta logique d'appel API
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Connexion
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="nom@exemple.com"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Mot de passe</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-gray-600">
        Pas de compte ?
        <NuxtLink to="/register" class="text-blue-500 hover:underline"
          >S'inscrire</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
