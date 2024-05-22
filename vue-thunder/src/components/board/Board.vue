<template>
  <div class="board-item">
    <div class="board-header">
      <img :src="userImage" alt="user image" class="user-image" />
      <div class="board-info">
        <div class="user-name">{{ userName }}</div>
        <div class="board-date">
          {{ formatDate(board.regDate) }}
          <div v-if="board.userId === loginUserId" class="board-actions">
            <button @click="updateBoard" class="edit-button">수정</button>
            <button @click="deleteBoard(board.id)" class="delete-button">삭제</button>
          </div>
        </div>
      </div>
    </div>
    <div class="board-title">
      {{ board.title }}
    </div>
    <div class="board-content">
      <p>{{ board.content }}</p>
    </div>
    <div class="board-footer">
      <a @click="viewComments" class="comment-count">댓글 {{ board.commentCnt }}</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useBoardStore } from '@/stores/board';
import { useRoute } from 'vue-router';
import router from '@/router';

  const props = defineProps({
    board: Object,
    loginUserId: String
  });

const route = useRoute();  
const boardStore = useBoardStore();
const userStore = useUserStore();
const userName = ref('');
const userImage = ref('');

onMounted(async () => {
  await userStore.getUserById(props.board.userId);
  userName.value = userStore.user.name;
  userImage.value = userStore.user.image
    ? new URL(`/src/assets/userProfile/${userStore.user.image}`, import.meta.url).href
    : new URL(`/src/assets/userProfile/profile.png`, import.meta.url).href;
});

const updateBoard = () => {
  // console.log(props.board.id)
  router.push({name:'boardUpdate', params: {thunderId: route.params.thunderId, boardId: props.board.id}});
  window.location.reload;
}
//   const updateBoard = (boardId) => {
//     boardStore.updateBoard(route.params.thunderId, boardId);
//   };

const deleteBoard = (boardId) => {
  boardStore.deleteBoard(route.params.thunderId, boardId);
};
  
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const date = new Date(dateString);
  return date.toLocaleString('sv-SE', options).replace(' ', 'T').replace('T', ' ').replace(/\//g, '-');
};

const viewComments = () => {
  router.push({ name: 'boardDetail', params : { thunderId : route.params.thunderId, boardId : props.board.id} });
};
</script>

<style scoped>
.board-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.board-header {
  display: flex;
  align-items: center;
}

.user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgb(230, 230, 230);
}

.board-title {
  margin-top: 10px;
}

.board-info {
  flex-grow: 1;
  margin-left: 10px;
}

.user-name {
  font-weight: bold;
  font-size: 16px;
}

.board-date {
  font-size: 12px;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 5px;
}

.board-actions {
  display: flex;
  gap: 5px;
}

.edit-button,
.delete-button {
  background-color: transparent;
  border: none;
  color: rgb(169, 169, 169);
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  margin-left: 5px;
}

.edit-button:hover,
.delete-button:hover {
  text-decoration: underline;
  color: #ffcc00;
}

.board-content {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
}

.board-footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.comment-count {
  font-size: 12px;
  color: #6c757d;
  cursor: pointer;
}

.comment-count:hover {
  text-decoration: underline;
  color: #ffcc00;
}
</style>
