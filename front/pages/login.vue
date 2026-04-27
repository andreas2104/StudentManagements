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
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md glass-card rounded-2xl px-10 py-12">

      <!-- Header -->
      <div class="text-center mb-2">
        <h2 class="text-2xl font-bold text-white mb-2">Se connecter</h2>
        <p class="text-slate-400 text-sm">Accédez à votre compte</p>
      </div>

      <!-- Error -->
      <div
        v-if="error"
        class="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm"
      >
        {{ error }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label for="email" class="text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="vous@example.com"
          />
        </div>

        <!-- Mot de passe -->
        <div class="flex flex-col gap-2">
          <label for="password" class="text-sm font-medium text-slate-300 mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        <!-- Remember me -->
        <div class="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            class="h-4 w-4 rounded border-white/10 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
          />
          <label for="remember" class="text-sm text-slate-400">
            Se souvenir de moi
          </label>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="btn-primary w-full"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span>{{ loading ? "Chargement..." : "Se connecter" }}</span>
        </button>

      </form>

      <!-- Register link -->
      <p class="text-center text-slate-400 text-sm">
        Pas encore de compte ?
        <NuxtLink
          to="/register"
          class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          S'inscrire
        </NuxtLink>
      </p>

    </div>
  </div>
</template>