<template>
    <div class="thunder-detail">
      <div class="header-image-container">
        <img :src="thunderImageUrl" alt="Thunder Image" class="header-image" />
      </div>
      <div class="header-content">
        <h2 class="title">{{ thunderStore.thunder.title }}</h2>
        <p class="category">{{ thunderStore.thunder.category }}</p>
        <div class="date-location">
          <span>📅 {{ thunderStore.thunder.dateTime }}</span>
          <span>📍 {{ trimmedAddress }}</span>
        </div>
      </div>
      <div class="no-name">
        <button class="join-btn">번개 참여하기</button>
        <div class="details">
          <h3>소개글</h3>
          <p>{{ thunderStore.thunder.description }}</p>
        </div>
        <div class="people">
          <div class="members">
            <h3>매니저 소개</h3>
            <div class="member-list">
              <div class="member">
                <i class="icon-user"></i>
                <div class="manager">
                  <div class="manager-profile">
                    <img :src="managerImageUrl" alt="">
                  </div>
                  <div>
                    <div class="manager-name">
                      <h4>이름</h4>
                      <p>{{ userStore.user.name }}</p>
                    </div>
                    <div class="manager-favor">
                      <h4>선호 운동</h4>
                      <p>{{ userStore.user.favorite }}</p>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
          <div class="additional-info">
            <h3>모집 현황</h3>
            <div class="info">
              <i class="icon-users"></i>
              <span>3 / {{ thunderStore.thunder.scale }}명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useThunderStore } from '@/stores/thunder';
  import { useUserStore } from "@/stores/user";
  
  const route = useRoute();
  const thunderStore = useThunderStore();
  const userStore = useUserStore();

  const trimmedAddress = ref('');
  
  const thunderImageUrl = computed(() => {
    // 번개 이미지가 없을 경우
    const defaultImageUrl = new URL(`/src/assets/thunder/background.png`, import.meta.url).href;
    if (thunderStore.thunder.image) {
      return new URL(`/src/assets/thunder/${thunderStore.thunder.image}`, import.meta.url).href;
    }
    return defaultImageUrl;
  });  
  
  const managerImageUrl = computed(() => {
    // 매니저 이미지가 없을 경우 기본 유저 프로필
    const defaultManagerImageUrl = new URL(`/src/assets/userProfile/profile.png`, import.meta.url).href;
    if (userStore.user.image) {
      return new URL(`/src/assets/userProfile/${userStore.user.image}`, import.meta.url).href;
    }
    return defaultManagerImageUrl;
  });    

  onMounted(async () => {
    await thunderStore.getThunderDetail(route.params.thunderId); // 데이터를 가져올 때까지 기다림
  
    if (thunderStore.thunder.managerId) {
      userStore.getUserById(thunderStore.thunder.managerId);
    }
  });
  
  watch(
    () => thunderStore.thunder.addressName,
    (newAddress) => {
      if (newAddress) {
        trimmedAddress.value = newAddress.split(')')[0] + ')';
      }
    },
    { immediate: true }
  );
  
  watch(
    () => thunderStore.thunder.managerId,
    (newManagerId) => {
      if (newManagerId) {
        userStore.getUserById(newManagerId);
      }
    }
  );
  </script>
  
  <style scoped>
  .thunder-detail {
    width: 100%;
    max-width: 1400px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .header {
    position: relative;
  }
  
  .header-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .header-content {
    padding: 20px;
    text-align: center;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .category {
    font-size: small;
    margin-top: 5px;
    background-color: #E0E5E9;
    padding: 5px 10px;
    border-radius: 10px;
    display: inline-block;
  }
  
  .join-btn {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #f7d85f;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 1050px;
  }
  
  .date-location {
    display: flex;
    justify-content: center;
    /* 가운데 정렬 */
    gap: 20px;
    /* 간격 조절 */
    padding: 20px;
  }
  
  .date-time,
  .location {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .details {
    padding: 20px;
    font-size: 16px;
    color: #666;
  }
  
  .no-name {
    max-width: 1200px;
    /* 폭을 좁히기 위해 추가 */
    margin: auto;
    /* 중앙 정렬 */
    padding: 20px;
    border-top: 1px solid #eee;
  }
  
  .people {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  .members {
    width: 48%;
    /* 나란히 놓기 위해 폭 설정 */
  }
  
  .member-list {
    display: flex;
    gap: 20px;
    margin-top: 10px;
  }
  
  .member {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .additional-info {
    padding: 20px;
    width: 48%;
    /* 나란히 놓기 위해 폭 설정 */
  }
  
  .info {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
  }
  
  h3 {
    color: #000;
  }
  
  .manager-profile {
    width: 150px;
    height: 150px;
    border-radius: 70%;
    overflow: hidden;
    margin-right: 80px;
  }
  
  .manager-profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .manager {
    display: flex;
    align-items: center;
  }
  
  .manager p{
    font-weight: 600px;
  }
  
  .manager h4{
    margin-right: 10px;
  }
  
  .manager-name
  .manager-favor{
    display: inline;
  }
  
  </style>
