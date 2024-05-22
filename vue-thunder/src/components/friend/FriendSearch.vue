<template>
  <div class="top">
    <div class="search-container">
      <input 
        type="text" 
        class="search-bar" 
        placeholder="이름으로 검색하기" 
        v-model="name" 
      />
      <button class="search-btn" @click="searchAll">🔍</button>
      <button class="filter-btn">⚙️</button>
    </div>
    <div>
      <button class="manage-btn" @click="goFriendManage">친구 관리</button>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useFriendStore } from '@/stores/friend';
  import { useRouter } from 'vue-router';
  
  const friendStore = useFriendStore();
  const name = ref('');
  const router = useRouter();
  
  const searchAll = () => {
    friendStore.getAllFriendList(name.value);
    friendStore.getMyFriendList(name.value);
  };
  
  const goFriendManage = () => {
    router.push({ name: 'friendManage'})
};
  
  </script>
  
  <style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
}

.search-bar {
  border: none;
  padding: 10px;
  border-radius: 50px;
  outline: none;
  flex-grow: 1;
}

.search-btn, .filter-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 20px;
  color: #555;
}

.manage-btn {
  background-color: #e0e5e9;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 50px;
  font-size: 16px;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>