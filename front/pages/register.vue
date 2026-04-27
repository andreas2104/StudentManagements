<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { post } = useApi();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const error = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  if (password.value !== passwordConfirm.value) {
    error.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  error.value = "";
  loading.value = true;

  try {
    // Using API Platform default endpoint /api/users
    await post("/api/users", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    router.push("/login?registered=true");
  } catch (err: any) {
    const errorMsg = err.message || "Échec de l'inscription. Veuillez réessayer.";
    console.error("[REGISTER_ERROR]", { name: name.value, email: email.value, error: errorMsg });
    error.value = errorMsg;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-100">
    <div
      class="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm p-8"
    >
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Créer un compte</h2>
        <p class="text-gray-600 text-sm">Rejoignez StudentManagement aujourd'hui</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm"
        >
          {{ error }}
        </div>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Nom Complet</label
          >
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="vous@example.com"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Mot de passe</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              for="passwordConfirm"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Confirmation</label
            >
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <div v-if="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Création en cours...
          </div>
          <span v-else>S'inscrire</span>
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-6">
        Déjà un compte ?
        <NuxtLink
          to="/login"
          class="text-blue-600 hover:text-blue-700 font-medium"
          >Se connecter</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
