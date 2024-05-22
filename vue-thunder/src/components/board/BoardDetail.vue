<template>
    <div class="board-detail">
      <div class="board-header">
        <div class="header-content">
          <h1 class="board-title">{{ board.title }}</h1>
          <p class="board-date">{{ formatDate(board.regDate) }}</p>
          <div class="board-user">
            <img :src="userImage" alt="user image" class="user-image" />
            <span class="user-name">{{ userName }}</span>
          </div>
        </div>
      </div>
      <div class="board-content">
        <p>{{ board.content }}</p>
      </div>
      <CommentRegist :board="board" @commentAdded="loadComments" />
      <CommentList :comments="comments" :board="board"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCommentStore } from '@/stores/comment';
  import { useUserStore } from '@/stores/user';
  import { useBoardStore } from '@/stores/board';
  import CommentRegist from './CommentRegist.vue';
  import CommentList from './CommentList.vue';
  
  const route = useRoute();
  const thunderId = route.params.thunderId;
  const boardId = route.params.boardId;
  
  const boardStore = useBoardStore();
  const commentStore = useCommentStore();
  const userStore = useUserStore();
  
  const board = ref({});
  const comments = ref([]);
  const userName = ref('');
  const userImage = ref('');
  
  const loadData = async () => {
    try {
      const boardData = await boardStore.fetchBoardDetail(thunderId, boardId);
      board.value = boardData;
      await loadUser(boardData.userId);
      loadComments();
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };
  
  const loadUser = async (userId) => {
    try {
      const userData = await userStore.loginUser;
      userName.value = userData.name;
      userImage.value = userData.image
        ? new URL(`/src/assets/userProfile/${userData.image}`, import.meta.url).href
        : new URL(`/src/assets/userProfile/profile.png`, import.meta.url).href;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  
  const loadComments = async () => {
    try {
      comments.value = await commentStore.fetchComments(thunderId, boardId);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };
  
  onMounted(() => {
    loadData();
  });
  
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
  </script>
  
  <style scoped>
  .board-detail {
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .board-header {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .board-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .board-date {
    font-size: 14px;
    color: #888;
  }
  
  .board-user {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .user-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .board-content {
    padding: 20px;
    font-size: 16px;
    line-height: 1.6;
  }
  
  .board-comments {
    padding: 20px;
    border-top: 1px solid #e0e0e0;
  }
  
  .comments-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .loading {
    text-align: center;
    font-size: 16px;
    color: #666;
  }
  
  .comment-item {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .comment-user-name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  
  .comment-date {
    font-size: 12px;
    color: #888;
  }
  
  .comment-content {
    font-size: 14px;
    color: #555;
  }
  </style>
  