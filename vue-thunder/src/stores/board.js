import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = 'http://localhost:8080/thunder/board'

export const useBoardStore = defineStore('board', () => {
  const boards = ref([])
  const board = ref({ thunderId: '', title: '', content: '' })

  const fetchBoards = (thunderId) => {
    const userId = sessionStorage.getItem('loginUser')

    axios
      .get(`${REST_BOARD_API}/${thunderId}`, {
        headers: {
          loginuser: userId,
        },
        withCredentials: true, // 세션 정보를 포함한 요청
      })
      .then((response) => {
        boards.value = response.data
        // console.log(response)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  // board 등록하기
  const submitForm = (thunderId) => {
    if (board.value.title && board.value.content) {
      board.value.thunderId = thunderId
      axios
        .post(`${REST_BOARD_API}/${thunderId}`, board.value, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키를 포함한 요청
        })
        .then(() => {
          router.push({ name: 'boardList', params: { thunderId } }) // 게시물 리스트 페이지로 이동
        })
        .catch((error) => {
        //   console.log(error)
        })
    } else {
      alert('제목과 내용을 입력해주세요.')
    }
  }

  // board 업데이트
  const updateBoard = (thunderId, boardId) => {
    // console.log('update')
    if (board.value.title && board.value.content) {
      board.value.thunderId = thunderId
      axios
        .put(`${REST_BOARD_API}/${thunderId}/${boardId}`, board.value, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키를 포함한 요청
        })
        .then(() => {
          router.push({ name: 'boardList', params: { thunderId } }) // 게시물 리스트 페이지로 이동
        })
        .catch((error) => {
        //   console.log(error)
        })
    } else {
      alert('제목과 내용을 입력해주세요.')
    }
  }

  const deleteBoard = (thunderId, boardId) => {
    // console.log(boardId)
    axios.delete(`${REST_BOARD_API}/${thunderId}/${boardId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // 쿠키를 포함한 요청
    })
    .then(() => {
      alert('게시글이 삭제되었습니다.')
      router.push({ name: 'boardList' }).then(() => {
        window.location.reload();
      });
    })
    .catch((error) => {
      // console.log(error)
    })
  }

  const fetchBoardDetail = async (thunderId, boardId) => {
    try {
      const response = await axios.get(`${REST_BOARD_API}/${thunderId}/${boardId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch board detail:', error);
      throw error;
    }
  };

  return { boards, fetchBoards, board, submitForm, deleteBoard, updateBoard, fetchBoardDetail }
})
