<template>
    <div class="container">
      <h2>🔎검색</h2>
      <input type="date" class="search-bar" v-model="searchCon.date">
      <input type="time" class="search-bar" v-model="searchCon.time">
  
      <select class="dropdown" v-model="searchCon.category" name="운동 종목">
        <option value="">운동종목</option>
        <option value="축구/풋살">축구/풋살</option>
        <option value="등산">등산</option>
        <option value="러닝">러닝</option>
        <!-- 더 많은 카테고리 옵션 추가 -->
      </select>
  
      <input type="text" class="search-bar" v-model="region" placeholder="위치를 입력하세요" />
      <button class="search-btn" @click="searchAll">검색</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useThunderStore } from '@/stores/thunder';
  
  const store = useThunderStore();
  
  // 번개 조건 데이터
  const searchCon = ref({
    date: '',
    time: '',
    category: '', // 기본값을 빈 문자열로 설정
  });
  
  // 지역 검색어
  const region = ref('');
  
  const searchAll = () => {
    // 일정 검색 조건 생성
    const dateTime = `${searchCon.value.date} ${searchCon.value.time}`.trim();
    const condition = {
      dateTime: dateTime || '',
      category: searchCon.value.category || '', // category가 빈 문자열일 경우 빈 문자열로 설정
    };
    store.searchThunder(condition, region.value);
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .btn {
    background-color: #f7d85f;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
  }
  
  .datepicker,
  .dropdown,
  .search-bar {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .search-bar {
    flex-grow: 1;
  }
  
  .search-btn {
    background-color: #f7d85f;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
  }
  </style>
  