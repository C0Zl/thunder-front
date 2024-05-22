<template>
    <div class="board-comments">
      <h2 class="comments-title">댓글</h2>
      <!-- <div v-if="loading" class="loading">Loading...</div> -->
      <div>
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <span class="comment-user-name">{{ comment.userId }}</span>
            <span class="comment-date">{{ formatDate(comment.regDate) }}</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
          <div v-if="comment.userId === userStore.loginUser.id" class="board-actions">
            <button @click="deleteComment(comment.id)" class="delete-button">삭제</button>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useBoardStore } from '@/stores/board';
import { useCommentStore } from '@/stores/comment';

  const userStore = useUserStore();
  const commentStore = useCommentStore();
//   const boardStore = useBoardStore(); 

  const props = defineProps({
    comments: Array,
    board : Object
  });

  onMounted(() => {

  })
  
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

  const deleteComment = (commentId) => {
    // console.log(props.board)
    commentStore.deleteComment(props.board.scheduleId, props.board.id, commentId)
  }
  </script>
  
  <style scoped>
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
  