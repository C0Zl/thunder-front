import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router';

const REST_COMMENT_API = 'http://localhost:8080/thunder/comment';

export const useCommentStore = defineStore('comment', () => {

   const fetchComments = async (thunderId, boardId) => {
    try {
      const response = await axios.get(`${REST_COMMENT_API}/${thunderId}/${boardId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw error;
    }
    };

    const addComment = async(thunderId, boardId, comment) => {
        try {
            const response = await axios.post(`${REST_COMMENT_API}/${thunderId}/${boardId}`, comment, {
                withCredentials: true,
              });
            return response.data;
          } catch (error) {
            // console.error('Failed to add comment:', error);
            // throw error;
          }
    }

    const deleteComment = async(thunderId, boardId, commentId) => {
        try {
            axios.delete(`${REST_COMMENT_API}/${thunderId}/${boardId}/${commentId}`, {
                withCredentials: true,
            })
            alert('댓글이 삭제되었습니다.')
            window.location.reload();
        } catch (error) {
            alert('댓글 삭제에 실패하였습니다.')
        }
    }

    return {
        fetchComments, addComment, deleteComment
    };
})


