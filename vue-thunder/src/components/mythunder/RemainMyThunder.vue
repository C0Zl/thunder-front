<template>
  <div class="thunder-container">
      <div class="thunder-list">
          <div v-for="thunder in store.thunders" :key="thunder.id" class="thunder-item">
              <img :src="getImageUrl(thunder.image)" alt="thunder image" class="thunder-image" />
              <div class="thunder-info">
                <div class="category">{{ thunder.category }}</div>
                <div class="item">
                  <h4 class="title">{{ thunder.title }}</h4>
                  <div class="location"><img src="@/components/icons/common/picker.png" style="width: 12px; margin-right: 5px;">{{ getAddressName(thunder.addressName) }}</div>
                </div>
                <!-- <div>{{ getShortDescription(thunder.description) }}</div> -->
              </div>
              <div class="thunder-actions">
                <RouterLink v-if="thunder.managerId === userStore.loginUser.id" class="manage-button" :to="{name : 'manage', params : {thunderId: thunder.id}}">
                  <img src="@/components/icons/common/manage-icon.png" alt="manage icon" class="manage-icon" /> 번개 관리하기
                </RouterLink>
                <RouterLink :to="{ name: 'board', params: {thunderId: thunder.id} }" class="thunder-detail-link" />
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMyThunderStore } from '@/stores/mythunder';
import router from '@/router';
import { useUserStore } from '@/stores/user';

const store = useMyThunderStore();
const userStore = useUserStore();

onMounted(() => {
  store.fetchRemainThunders();
  const userSession = sessionStorage.getItem('loginUser')
  if(!userSession) {
    alert('로그인이 필요합니다.')
    router.push({name:'home'})
  }
});

const getImageUrl = (imagePath) => {
  return imagePath ? new URL(`/src/assets/thunder/${imagePath}`, import.meta.url).href : 
    new URL(`@/assets/thunder/thunderDefault.png`, import.meta.url).href;
};

const getAddressName = (address) => {
  if(address) {
    return address.split(')')[0] + ')';
  }
}

const getShortDescription = (description) => {
  if (description.length > 20) {
    return description.slice(0, 50) + '... (자세히 보기)';
  }
  return description;
};
</script>

<style scoped>
.thunder-container {
  padding: 20px;
}

.thunder-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.thunder-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;
}

.thunder-item:hover {
  transform: translateY(-5px);
}

.thunder-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 20px;
  object-fit: cover;
}

.thunder-info {
  flex-grow: 1;
}

.category {
  font-size: 14px;
  color: #aaa;
  margin: 0;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.location {
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-size: 16px;
  color: #666;
}

.picker-icon {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}

.description {
  margin: 5px 0;
  font-size: 14px;
  color: #888;
}

.thunder-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.thunder-detail-link {
  position: absolute; /* 수정: 부모 요소 내에서 절대 위치로 설정 */
  right: 20px; /* 오른쪽 여백 */
  width: 50px;
  height: 50px;
  border-radius: 30%;
  transition: background-color 0.2s;
  background-image: url('@/components/icons/common/detail-link.png'); 
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.thunder-detail-link:hover {
  background-image: url('@/components/icons/common/detail-link-active.png'); /* hover 시 이미지 변경 */
}

.manage-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 17px;
  background-color: #fff;
  color: black;
  border: 2px solid #ffcc00;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  margin-right: 60px;
  margin-top: 35px;
  font-size:12px;
  line-height: 1;
}

.manage-button:hover {
  background-color: #ffcc00;
  color: #fff;
}

.manage-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
