<template>
  <div class="board-regist-container">
    <h1 class="page-title">게시물 등록</h1>
    <form @submit.prevent="submitForm" class="board-form">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="store.board.title" placeholder="제목을 입력하세요" />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="store.board.content" placeholder="내용을 입력해주세요"></textarea>
      </div>
      <button type="submit" class="submit-button">등록하기</button>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'

const route = useRoute()
const store = useBoardStore()
const router = useRouter()

const submitForm = async () => {
  await store.submitForm(route.params.thunderId)
  store.board.title = '';
  store.board.content = '';
}
</script>

<style scoped>
.board-regist-container {
  margin-top: 35px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.board-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 15px;
  font-size: 14px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 14px;
  height: 200px;
  resize: none;
}

.submit-button {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.submit-button:hover {
  background-color: #e0a800;
}
</style>
