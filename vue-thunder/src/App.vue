<template>
  <div id="app">
    <TheHeaderNav v-if="showHeader" id="nav" />
    <RouterView :class="routerViewClass" id="router" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';

const route = useRoute();

const showHeader = computed(() => {
  return route.meta.showHeader !== false;
});

const routerViewClass = computed(() => {
  return route.name === 'login' || route.name === 'signup' ? 'full-screen' : '';
});
</script>

<style scoped>
#app {
  display: flex;
}

#nav {
  width: 250px; /* Nav의 너비를 설정 */
  position: fixed; /* Nav를 고정 위치로 설정 */
  height: 100vh; /* Nav의 높이를 전체 뷰포트 높이로 설정 */
  top: 0; /* 상단에서부터 0으로 설정 */
  left: 0; /* 왼쪽에서부터 0으로 설정 */
}

#router {
  flex-grow: 1; /* 남은 공간을 차지하게 설정 */
  margin-left: 295px; /* Nav의 너비만큼 왼쪽 여백을 설정 */
  margin-right: 25px;
  margin-bottom: 25px;
}

#router.full-screen {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
