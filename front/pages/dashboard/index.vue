<script setup lang="ts">
const { user, clearAuth } = useAuth();
const router = useRouter();

const handleLogout = () => {
  clearAuth();
  router.push('/login');
};

const navigation = [
  { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true },
  { name: 'Déclarations', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active: false },
  { name: 'Documents', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active: false },
  { name: 'Paramètres', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', active: false },
];

const stats = [
  { label: 'Total Impôts', value: '1,240.00 €', change: '+12%', icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z' },
  { label: 'Déclarations', value: '4', change: 'En cours', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { label: 'Prochain Paiement', value: '15 Mai 2026', change: 'Rappel', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
];
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex font-inter">
    <!-- Sidebar -->
    <aside class="w-72 glass-card m-4 rounded-3xl flex flex-col border-white/5 shadow-2xl relative z-20">
      <div class="p-10">
        <h1 class="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">T</span>
          TaxManager
        </h1>
      </div>

      <nav class="flex-1 px-6 space-y-2">
        <a v-for="item in navigation" :key="item.name" href="#" 
           :class="[item.active ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent']"
           class="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all group font-medium text-sm">
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          {{ item.name }}
        </a>
      </nav>

      <div class="p-6 border-t border-white/5">
        <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-12 space-y-10 overflow-y-auto">
      <!-- Header -->
      <header class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold text-white mb-1">Bonjour, {{ user?.name || 'Utilisateur' }}</h2>
          <p class="text-slate-400 font-medium">Voici ce qui se passe aujourd'hui.</p>
        </div>
        <div class="flex items-center gap-4">
          <button class="p-2 glass-card rounded-xl text-slate-300 hover:text-white transition-colors relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center font-bold text-white text-lg">
            {{ user?.name?.charAt(0) || 'U' }}
          </div>
        </div>
      </header>

      <!-- Stats Grid -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="p-6 glass-card rounded-3xl relative group hover:scale-[1.02] transition-transform">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:bg-indigo-500/50 transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
              </svg>
            </div>
            <span class="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{{ stat.change }}</span>
          </div>
          <h3 class="text-slate-400 text-sm font-semibold mb-1">{{ stat.label }}</h3>
          <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
        </div>
      </section>

      <!-- Placeholder Section -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 p-8 glass-card rounded-3xl h-96 flex flex-col items-center justify-center text-center space-y-4">
          <div class="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">Graphique d'évolution</h3>
          <p class="text-slate-400 max-w-sm">Vos données seront visualisées ici dès que vous aurez effectué vos premières déclarations.</p>
          <button class="btn-primary">Nouvelle Déclaration</button>
        </div>
        
        <div class="p-8 glass-card rounded-3xl space-y-6">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            Activités Récentes
          </h3>
          <div class="space-y-4">
            <div v-for="i in 3" :key="i" class="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-white">Déclaration #2024-0{{ i }}</p>
                <p class="text-xs text-slate-500">Il y a {{ i * 2 }} jours</p>
              </div>
            </div>
          </div>
          <button class="w-full py-3 text-slate-400 hover:text-white transition-colors text-sm font-medium">Voir tout l'historique</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* No additional styles needed as we use the global design system and Tailwind */
</style>