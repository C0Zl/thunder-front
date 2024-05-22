<template>
  <div class="board-list-container">
    <Board
      v-for="board in boardStore.boards"
      :key="board.id"
      :board="board"
      :loginUserId="userStore.loginUser.id"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { useUserStore } from '@/stores/user';
import Board from '@/components/board/Board.vue';

const boardStore = useBoardStore();
const userStore = useUserStore();

const boards = ref([]);
const route = useRoute();
const thunderId = route.params.thunderId;

onMounted(() => {
  boardStore.fetchBoards(thunderId);
});
</script>

<style scoped>
.board-list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
</style>
