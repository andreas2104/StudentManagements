<script setup lang="ts">
const { token, clearAuth, isAuthenticated } = useAuth();
const router = useRouter();

const handleLogout = () => {
  clearAuth();
  router.push('/login');
};

watch(() => isAuthenticated.value, (authenticated) => {
  if (!authenticated) {
    router.push('/login');
  }
}, { immediate: true });
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-800">TaxManager</h1>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="ml-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>