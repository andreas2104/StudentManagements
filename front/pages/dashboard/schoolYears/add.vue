<script setup>
const api = useApi()
const router = useRouter()
const loading = ref(false)

const form = ref({
   label: '',
   startDate: '',
   endDate: '',
   isActive: false
})

const handleSubmit = async () => {
   loading.value = true
   try {
       // Using proper Date formatting to keep API happy
       await api.post('/api/school_years', {
           ...form.value,
           startDate: new Date(form.value.startDate).toISOString(),
           endDate: new Date(form.value.endDate).toISOString(),
       })
       router.push('/dashboard/schoolYears')
   } catch(e) { 
       console.error('Error creating school year:', e)
       alert('Erreur lors de la création')
   } finally { 
       loading.value = false 
   }
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/dashboard/schoolYears" class="text-slate-400 hover:text-white transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-white">Ajouter une année scolaire</h1>
    </div>

    <div class="glass-card rounded-3xl p-8">
      <AppForm title="" @submit="handleSubmit" :loading="loading">
         <div class="space-y-6 mb-8">
           <div class="flex flex-col gap-2">
             <label class="text-sm font-semibold text-slate-300">Label</label>
             <input type="text" v-model="form.label" required class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Ex: 2024-2025" />
           </div>
           
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="flex flex-col gap-2">
               <label class="text-sm font-semibold text-slate-300">Date de début</label>
               <input type="date" v-model="form.startDate" required class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
             </div>
             <div class="flex flex-col gap-2">
               <label class="text-sm font-semibold text-slate-300">Date de fin</label>
               <input type="date" v-model="form.endDate" required class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
             </div>
           </div>

           <div class="flex items-center gap-3">
             <input type="checkbox" id="isActive" v-model="form.isActive" class="w-5 h-5 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer" />
             <label for="isActive" class="text-sm font-semibold text-slate-300 cursor-pointer">Actif</label>
           </div>
         </div>
         
         <template #actions>
            <div class="flex justify-end gap-4 border-t border-white/10 pt-6">
              <NuxtLink to="/dashboard/schoolYears">
                <button type="button" class="px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  Annuler
                </button>
              </NuxtLink>
              <AppBouton type="submit" variant="primary" :loading="loading">Enregistrer</AppBouton>
            </div>
         </template>
      </AppForm>
    </div>
  </div>
</template>
