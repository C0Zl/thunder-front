<script setup>
  import ThunderCreate from "@/components/thunder/ThunderCreate.vue";
</script>

<template>
  <main>
    <RouterLink :to="{name : 'thunder'}">Thunder</RouterLink>
    <RouterLink :to="{name : 'user'}">User</RouterLink>
  </main>
</template>
