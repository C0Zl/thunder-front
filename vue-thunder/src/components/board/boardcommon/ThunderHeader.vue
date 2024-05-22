<template>
  <div class="thunder-header-container">
    <div class="header-content">
      <div class="title-category">
        <h1 class="thunder-title"><img class="thunder-icon" src="@/components/icons/common/thunder.png" alt="thunder icon"> {{ thunderStore.thunder.title }}</h1>
        <div class="category">{{ thunderStore.thunder.category }}</div>
      </div>
      <div class="thunder-info">
        <div class="thunder-date">
          <img src="@/components/icons/common/calendar-icon.png" alt="calendar icon" class="calendar-icon" />
          {{ thunderStore.thunder.dateTime }}
        </div>
        <div class="button-group">
          <button @click="openChatUrl" class="button yellow-button">오픈채팅 바로가기</button>
          <button @click="writeBoard" class="button white-button">글 작성하기</button>
        </div>
      </div>
    </div>
    <img v-if="userStore.loginUser.id != thunderStore.thunder.managerId" @click="confirmDeleteThunder" class="delete-icon" src="@/components/icons/common/deleteThunder.png" alt="delete icon">
  </div>
</template>

<script setup>
import { useThunderStore } from '@/stores/thunder';
import { useRoute, useRouter } from "vue-router";
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const thunderStore = useThunderStore();  
const userStore = useUserStore();

const route = useRoute();
const router = useRouter()

onMounted(async () => {
  await thunderStore.getThunderDetail(route.params.thunderId); // 데이터를 가져올 때까지 기다림
  userStore.checkLoginStatus();
});

const openChatUrl = () => {
  if (thunderStore.thunder.chatUrl == null || thunderStore.thunder.chatUrl == '') {
      alert('오픈 채팅이 등록되지 않은 번개입니다.');
      return;
  }
  window.open(thunderStore.thunder.chatUrl, '_blank'); // 새 창 또는 탭에서 열기
}

const writeBoard = () => {
    router.push({name : 'boardRegist'})
}

const confirmDeleteThunder = () => {
  var userResponse = ''
  userResponse = prompt(`정말로 이 번개에서 나가시겠습니까? 번개의 이름 (${thunderStore.thunder.title})을(를) 입력하세요.`);
  if (userResponse === thunderStore.thunder.title) {
    thunderStore.deleteThunder(route.params.thunderId);
    alert('나감')
  } else {
    alert('번개의 이름이 일치하지 않습니다. 다시 시도해주세요.');
  }

}
</script>

<style scoped>
.thunder-header-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  position: relative;
}

img {
  width: 25px;
  margin-right: 7px;
}

.header-content {
  display: flex;
  flex-direction: column; /* 수정: 타이틀과 주소를 세로로 배치하기 위해 flex-direction 변경 */
}

.title-category {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.thunder-title {
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin:10px 0 0 0;
}

.category {
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  margin-top: 13px;
  margin-left: 10px;
}

.thunder-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thunder-date {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6c757d;
}

.calendar-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-left: 20px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.yellow-button {
  background-color: #ffc107;
  color: #fff;
}

.white-button {
  background-color: #fff;
  color: #212529;
  border: 1px solid #ced4da;
}

.yellow-button:hover {
  background-color: #f4bb12;
}

.white-button:hover {
  background-color: #e9ecef;
}

.thunder-address {
  font-size: 14px;
  color: #495057;
  margin-top: 0 ;
}

.delete-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.delete-icon:hover {
  transform: scale(1.1);
  color: #212529;
}
</style>
