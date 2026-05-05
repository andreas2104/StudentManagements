<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
if (import.meta.client) {
  window.$auth = useAuth()
}
</script>
