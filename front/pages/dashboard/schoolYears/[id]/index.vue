<script setup>
const route = useRoute()
const api = useApi()
const loading = ref(false)
const schoolYear = ref(null)

const fetchSchoolYear = async () => {
    loading.value = true
    try {
        const response = await api.get(`/api/school_years/${route.params.id}`)
        schoolYear.value = response
    } catch (e) {
        console.error('Failed to fetch school year:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSchoolYear()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/dashboard/schoolYears" class="text-slate-400 hover:text-white">
          ← Retour
        </NuxtLink>
        <h1 class="text-2xl font-bold text-white">Détails de l'année scolaire</h1>
      </div>
      <NuxtLink :to="`/dashboard/schoolYears/${route.params.id}/edit`">
        <AppBouton variant="primary">Modifier</AppBouton>
      </NuxtLink>
    </div>

    <div class="glass-card rounded-3xl p-6">
      <AppLoading v-if="loading" />
      <div v-else-if="schoolYear" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-slate-400 text-sm">ID</p>
            <p class="text-white">{{ schoolYear.id }}</p>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Label</p>
            <p class="text-white font-medium">{{ schoolYear.label }}</p>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Date de début</p>
            <p class="text-white">{{ new Date(schoolYear.startDate).toLocaleDateString() }}</p>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Date de fin</p>
            <p class="text-white">{{ new Date(schoolYear.endDate).toLocaleDateString() }}</p>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Statut</p>
            <span :class="schoolYear.isActive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'" class="px-2 py-1 rounded-full text-xs font-bold">
              {{ schoolYear.isActive ? 'Actif' : 'Inactif' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>