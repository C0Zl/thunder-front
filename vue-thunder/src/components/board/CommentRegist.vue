<template>
    <div class="comment-input">
      <input
        v-model="newComment"
        type="text"
        placeholder="댓글을 입력하세요"
        class="comment-input-field"
        @keyup.enter="addComment"
      />
      <button @click="addComment" class="comment-submit-button">댓글 달기</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCommentStore } from '@/stores/comment';
  import { useUserStore } from '@/stores/user';
  
  const props = defineProps({
    board: Object,
  });
  
  const route = useRoute();
  const thunderId = route.params.thunderId;
  
  const newComment = ref('');
  const commentStore = useCommentStore();
  const userStore = useUserStore();
  
  const addComment = async () => {
    const boardId = props.board.id;
    if (newComment.value.trim() === '') return;
  
    try {
      await commentStore.addComment(thunderId, boardId, {
        content: newComment.value,
        user: {
          name: userStore.user.name,
          image: userStore.user.image
        }
      });
      newComment.value = '';
      // commentStore.fetchComments(thunderId, boardId); // 새 댓글 목록 불러오기
      window.location.reload();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };
  </script>
  
  <style scoped>
  .comment-input {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  
  .comment-input-field {
    flex-grow: 1;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .comment-submit-button {
    padding: 10px 20px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .comment-submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  