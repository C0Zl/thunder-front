<template>
    <div class="user-manage-container">
      <div class="user-list">
        <div v-for="user in manageStore.applyUsers" :key="user.id" class="user-item">
          <img :src="getImageUrl(user.image)" alt="user image" class="user-image" />
          <span class="user-name">{{ user.name }}</span>
          <div class="action-buttons">
            <button class="accept-button" @click="acceptUser(user.id)">✔️</button>
            <button class="decline-button" @click="declineUser(user.id)">❌</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useManageStore } from '@/stores/manage';
  
  const manageStore = useManageStore();
  const route = useRoute();
  onMounted(() => {
    manageStore.fetchApplyUsers(route.params.thunderId);
    // console.log(manageStore.applyUsers)
  });
  
  const getImageUrl = (imagePath) => {
    // console.log(imagePath)
    return imagePath ? new URL(`/src/assets/userProfile/${imagePath}`, import.meta.url).href : 
    new URL(`@/assets/userProfile/profile.png`, import.meta.url).href;
};

  const acceptUser = (userId) => {
    manageStore.acceptUser(route.params.thunderId, userId);
  };
  
  const declineUser = (userId) => {
    manageStore.declineUser(route.params.thunderId, userId);
  };
  </script>
  
  <style scoped>
  .user-manage-container {
    padding: 20px;
  }
  
  .user-list {
    margin-top: 20px;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .user-name {
    flex-grow: 1;
    font-size: 16px;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  
  .accept-button,
  .decline-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .accept-button {
    background-color: #ffcc00;
  }
  
  .accept-button:hover {
    background-color: #ffaa00;
  }
  
  .decline-button {
    background-color: #ddd;
  }
  
  .decline-button:hover {
    background-color: #bbb;
  }
  </style>
  