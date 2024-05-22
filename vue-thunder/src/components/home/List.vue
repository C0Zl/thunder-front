<template>
    <div>
      <div>
        <div class="flex-container">
          <h2>📃목록</h2>
          <p>총 {{ store.thunderList.length }}건</p>
        </div>
      </div>
      <div class="thunder-list">
        <div v-for="thunder in paginatedThunders" :key="thunder.id" class="thunder-item">
          <div class="thunder-header">
            <img :src="getImageUrl(thunder.image)" alt="Thunder Image" class="thunder-image" />
            <div class="thunder-info">
              <div class="thunder-category">{{ thunder.category }}</div>
              <div class="thunder-title">{{ thunder.title }}</div>
              <div class="thunder-dateTime">{{ thunder.dateTime }}</div>
              <div class="thunder-address">{{ trimmedAddress(thunder.addressName) }}</div>
            </div>
            <RouterLink :to="{ name: 'thunderDetail', params: { thunderId: thunder.id } }">자세히</RouterLink>
          </div>
        </div>
      </div>
  
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useThunderStore } from '@/stores/thunder';
  
  const router = useRouter();
  const store = useThunderStore();
  
  const currentPage = ref(1);
  const itemsPerPage = ref(4);
  
  onMounted(() => {
    store.getThunderList();
  });
  
  // 이미지 URL 가져오는 함수
  const getImageUrl = (imageName) => {
    // 번개 이미지가 없을 경우
    const defaultImageUrl = new URL(`/src/assets/thunder/thunderDefault.png`, import.meta.url).href;
    if (imageName) {
      return new URL(`/src/assets/thunder/${imageName}`, import.meta.url).href;
    }
    return defaultImageUrl;
  };

  const paginatedThunders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return store.thunderList.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(store.thunderList.length / itemsPerPage.value);
  });
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const viewDetails = (id) => {
    router.push({ name: 'details', params: { id } });
  };
  
  const navigateToMap = () => {
    router.push({ name: 'map' });
  };
  
  // 함수로 addressName 처리
  const trimmedAddress = (address) => {
    if (address) {
      return address.split(')')[0] + ')';
    }
    return '';
  };
  </script>
  
  <style scoped>
  .thunder-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .thunder-item {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .thunder-header {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
  }
  
  .thunder-image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .thunder-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 600px;
  }
  
  .thunder-category {
    font-size: 12px;
    color: #999;
  }
  
  .thunder-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .thunder-dateTime,
  .thunder-address,
  .thunder-description {
    font-size: 14px;
    color: #666;
  }
  
  .details-btn {
    background-color: #f7d85f;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
    align-self: flex-end;
    margin-left: auto;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .pagination button {
    margin: 0 5px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .flex-container {
    display: flex;
    align-items: center;
  }
  
  .flex-container h2 {
    margin-right: 10px;
  }
  </style>
  