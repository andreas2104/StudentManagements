<script setup>
const api = useApi()
const loading = ref(false)
const schoolYears = ref([])

const fetchSchoolYears = async () => {
    loading.value = true
    try {
        const response = await api.get('/api/school_years')
        // API Platform usually returns Hydra format: response['hydra:member']
        schoolYears.value = response['hydra:member'] || response || []
    } catch (e) {
        console.error('Failed to fetch school years:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSchoolYears()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Années Scolaires</h1>
      <NuxtLink to="/dashboard/schoolYears/add">
        <AppBouton variant="primary">Ajouter une année scolaire</AppBouton>
      </NuxtLink>
    </div>

    <div class="glass-card rounded-3xl p-6">
      <AppLoading v-if="loading" />
      <AppTable v-else :headers="['ID', 'Label', 'Date de début', 'Date de fin', 'Actif', 'Actions']" :items="schoolYears">
        <template #default="{ item }">
          <td class="px-4 py-3 border-b border-white/5 text-slate-300">{{ item.id }}</td>
          <td class="px-4 py-3 border-b border-white/5 text-slate-300 font-medium">{{ item.label }}</td>
          <td class="px-4 py-3 border-b border-white/5 text-slate-300">{{ new Date(item.startDate).toLocaleDateString() }}</td>
          <td class="px-4 py-3 border-b border-white/5 text-slate-300">{{ new Date(item.endDate).toLocaleDateString() }}</td>
          <td class="px-4 py-3 border-b border-white/5">
            <span :class="item.isActive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'" class="px-2 py-1 rounded-full text-xs font-bold">
              {{ item.isActive ? 'Oui' : 'Non' }}
            </span>
          </td>
          <td class="px-4 py-3 border-b border-white/5 text-slate-300">
             <NuxtLink :to="`/dashboard/schoolYears/${item.id}/edit`" class="text-indigo-400 hover:text-indigo-300 hover:underline">
               Modifier
             </NuxtLink>
          </td>
        </template>
      </AppTable>
    </div>
  </div>
</template>

<style scoped>
/* Using global tailwind styles based on index.vue existing layout */
</style>
