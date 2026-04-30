<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { post } = useApi();
const { setToken } = useAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  error.value = "";
  loading.value = true;
  try {
    const data = await post<{ token: string }>("/api/login", {
      email: email.value,
      password: password.value,
    });
    setToken(data.token);
    router.push("/dashboard");
  } catch (err: any) {
    const errorMsg = err.message || "Échec de connexion. Veuillez réessayer.";
    console.error("[LOGIN_ERROR]", { email: email.value, error: errorMsg });
    error.value = errorMsg;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center bg-gray-500 justify-center p-4">
    <div class="w-full max-w-md glass-card border border-gray-500 rounded-3xl bg-gray-700 px-10 py-12">
      <div class="flex justify-center items-center mb-6">
        <p class="text-2xl font-bold text-white">Se connecter</p>
      </div>

      <div
        v-if="error"
        class="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6"
      >
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6 text-sm font-medium text-slate-300">
        <div class="flex flex-col gap-2">
          <div>
            <label for="email">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="password">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-500 bg-transparent text-indigo-600 focus:ring-indigo-500"
          />
          <label for="remember">
            Se souvenir de moi
          </label>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full border border-gray-500 hover:bg-gray-600 disabled:bg-gray-500 rounded-xl p-2 transition-colors flex justify-center items-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span>{{ loading ? "Chargement..." : "Se connecter" }}</span>
        </button>
      </form>

      <div class="flex justify-center items-center mt-6">
        <p class="text-sm">
          Pas encore de compte ?
          <NuxtLink
            to="/register"
            class="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            S'inscrirenmmm
          </NuxtLink>
        </p>
      </div>

    </div>
  </div>
</template>