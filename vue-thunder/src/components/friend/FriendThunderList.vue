<template>
    <h2>{{ userStore.user.name }}님이 모집중인 번개</h2>
    <div class="thunder-container">
        <div class="thunder-list">
            <div v-for="thunder in friendStore.friendThunderList" :key="thunder.id" class="thunder-item">
                <img :src="getImageUrl(thunder.image)" alt="thunder image" class="thunder-image" />
                <div class="thunder-info">
                  <div class="category">{{ thunder.category }}</div>
                  <div class="item">
                    <h4 class="title">{{ thunder.title }}</h4>
                    <div class="location"><img src="@/components/icons/common/picker.png" style="width: 12px; margin-right: 5px;">{{ getAddressName(thunder.addressName) }}</div>
                  </div>
                  <!-- <div>{{ getShortDescription(thunder.description) }}</div> -->
                </div>
                <RouterLink :to="{ name: 'thunderDetail', params: {thunderId: thunder.id} }" class="thunder-detail-link">
                  >
                <!-- <img src="@/assets/detail-arrow.png" alt="상세 보기" /> \ -->
                </RouterLink>
            </div>
        </div>
    </div>
  </template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useFriendStore } from '@/stores/friend';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const friendStore = useFriendStore();
const route = useRoute();


onMounted(()=>{
    userStore.getUserById(route.params.friendId)
    console.log(route.params.friendId)
    friendStore.getFriendThunder(route.params.friendId)
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

.thunder-detail-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #F3D849;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.thunder-detail-link:hover {
  background-color: #ff9900;
}

.detail-arrow {
  width: 20px;
  height: 20px;
}
</style>