<script setup>
const emit = defineEmits(['submit'])
defineProps({
  title: String,
  loading: Boolean
})
</script>

<template>
  <form @submit.prevent="emit('submit')" class="custom-form">
    <h2 v-if="title">{{ title }}</h2>
    <slot /> 
    <div class="form-actions">
       <slot name="actions" />
    </div>
  </form>
</template>