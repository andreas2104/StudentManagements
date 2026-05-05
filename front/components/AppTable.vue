<script setup>
defineProps({
  headers: Array,
  items: Array
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{  header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item, index in items" :key="index">
        <slot :item="item"></slot>
      </tr>
    </tbody>
  </table>
</template>