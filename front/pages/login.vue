
<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});

import { apiClient } from '~/utils/apiClient';
const { setToken } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;

  try {
    const data = await apiClient<{ token: string }>('/api/login_check', {
      method: 'POST',
      body: JSON.stringify({ username: email.value, password: password.value }),
    });

    setToken(data.token);
    router.push('/dashboard');
  } catch (err: any) {
    error.value = err.message || 'Échec de connexion. Veuillez réessayer.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="text-center mb-6">
    <h2 class="text-2xl font-semibold text-white">Connexion</h2>
    <p class="text-slate-300 text-sm mt-1">Accédez à votre compte</p>
  </div>

  <form @submit.prevent="handleSubmit" class="space-y-5">
    <div v-if="error" class="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm text-center">
      {{ error }}
    </div>

    <div>
      <div class="flex items-center justify-between mb-2">
        <label for="email" class="block text-sm font-medium text-slate-200">Email</label>
      </div>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition backdrop-blur"
        placeholder="votre@email.com"
      />
    </div>

    <div class="flex items-center justify-between">
      <label for="password" class="block text-sm font-medium text-slate-200">Mot de passe</label>
      <NuxtLink to="/forgot-password" class="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Mot de passe oublié ?</NuxtLink>
    </div>
    <input
      id="password"
      v-model="password"
      type="password"
      required
      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition backdrop-blur mb-3"
      placeholder="••••••••"
    />

    <div class="flex items-center gap-2">
      <input
        id="remember"
        type="checkbox"
        class="w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-indigo-400 focus:ring-offset-0"
      />
      <label for="remember" class="text-sm text-slate-300">Se souvenir de moi</label>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
    >
      <span v-if="loading" class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        Connexion en cours...
      </span>
      <span v-else>Se connecter</span>
    </button>
  </form>

  <p class="text-center text-slate-300 mt-6 text-sm">
    Pas de compte ?
    <NuxtLink to="/register" class="text-indigo-400 hover:text-indigo-300 font-medium">S'inscrire</NuxtLink>
  </p>
</template>