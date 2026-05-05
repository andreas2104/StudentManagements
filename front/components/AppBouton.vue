<script setup>
defineProps({
  label: String,
  type: {string, default: 'button'},
  variant: { type: String, defulault: 'button' },
  loading: { type: Boolean, default: false }
})
</script>

<template>
  <button :type="type" :class="['btn',`btn-${variant}`]" :disabled="loading">
    <span v-if="loading" class="spinner">...</span>
    <slot v-else>{{ label }}</slot>
  </button>
</template>
<style>
.btn {padding: 10px 20px; border-radius: 5px; cursor: pointer; }
.btn-primary {background: #3498db; color:white; }
.btn-danger { background: #e74c3c; color: white ; }
.btn-disabled {opacity: 0.7; cursor: not-allowed ; }
</style>