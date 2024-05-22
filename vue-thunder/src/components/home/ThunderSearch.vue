<template>
    <div class="container">
      <h2>🔎검색</h2>
      <input type="date" class="search-bar" v-model="searchCon.date">
      <input type="time" class="search-bar" v-model="searchCon.time">
  
      <select class="dropdown" v-model="searchCon.category" name="운동 종목">
        <option v-for="(category, index) in categories" :key="index" :value="category.value">{{ category.label }}</option>
      </select>
  
      <input type="text" class="search-bar" v-model="region" placeholder="지역명 또는 동으로 검색해보세요. (ex. 둔산동)" />
      <button class="search-btn" @click="searchAll">검색</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useThunderStore } from '@/stores/thunder';
  
  const store = useThunderStore();
  
  const categories = [
  { label: '종목선택', value: ''},
  { label: '배드민턴', value: '배드민턴' },
  { label: '농구', value: '농구' },
  { label: '야구', value: '야구' },
  { label: '등산', value: '등산' },
  { label: '러닝', value: '러닝' },
  { label: '축구/풋살', value: '축구/풋살' },
  { label: '테니스', value: '테니스' },
  { label: '탁구', value: '탁구' },
  { label: '볼링', value: '볼링' },
  { label: '당구', value: '당구' },
  { label: '클라이밍', value: '클라이밍' },
  { label: '사이클링', value: '사이클링' },
  { label: '기타', value: '기타' }
];

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
    background-color: #F3D849;
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
    background-color: #F3D849;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
  }
  </style>
  