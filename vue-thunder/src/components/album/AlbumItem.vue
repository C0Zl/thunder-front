<template>
    <div class="photo-item">
      <img :src="photoImage" alt="photoImage">
      <div class="photo-info">
        <span class="date">{{ formattedDate }}</span>
        <span class="title">{{ scheduleTitle }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from 'vue';
  import { useMyThunderStore } from '@/stores/mythunder.js';
  
  const props = defineProps({
    photo: Object
  });
  
  const thunderStore = useMyThunderStore();
  const photoImage = ref('');
  
  onMounted(() => {
    photoImage.value = new URL(`/src/assets/album/${props.photo.image}`, import.meta.url).href;
  });
  
  const schedule = computed(() => thunderStore.thunders.find(thunder => thunder.id === props.photo.scheduleId));
  const scheduleTitle = computed(() => schedule.value ? schedule.value.title : 'Unknown Schedule');
  
  const formattedDate = computed(() => {
    if (!schedule.value) return '';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(schedule.value.dateTime).toLocaleDateString('ko-KR', options);
  });
  </script>
  
  <style scoped>
  .photo-item {
    width: 340px;
    margin-left: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; /* 사진 항목 중앙 정렬 */
  }
  
  .photo-item img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .photo-item p {
    font-size: 1rem;
    color: #333;
    margin: 0;
  }
  
  .photo-info {
    text-align: center; /* 텍스트 중앙 정렬 */
    margin-top: auto;
  }
  
  .date {
    font-size: 0.8rem;
    color: #666;
    display: block;
  }
  
  .title {
    font-size: 1.5rem; /* 글씨 크기 조정 */
    font-weight: bold; /* 글씨 굵게 */
    color: #333;
    text-decoration: underline; /* 밑줄 추가 */
    text-decoration-thickness: 5px;
    text-decoration-color: #f7d85f; /* 밑줄 색상 노란색 */
  }
  </style>
  