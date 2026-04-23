<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">TaxManager</h1>
        <p class="text-slate-300">Gérez vos impôts en toute simplicité</p>
      </div>
      
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        <NuxtPage />
      </div>
      
      <p class="text-center text-slate-400 mt-6 text-sm">
        © 2026 TaxManager. Tous droits réservés.
      </p>
    </div>
  </div>
</template>