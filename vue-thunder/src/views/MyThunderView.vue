<template>
    <div>
        <div class="thunder-tab">
            <RouterLink :to="{ name: 'remain' }" class="tab" :class="{ active: isActive('remain') }">예정된 번개</RouterLink>
            <div class="divider">|</div>
            <RouterLink :to="{ name: 'past' }" class="tab" :class="{ active: isActive('past') }">지난 번개</RouterLink>
        </div>
        <RouterView/>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

function isActive(tabName) {
  return route.name === tabName;
}
</script>

<style scoped>
.thunder-tab {
    display: flex;
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: flex-start; /* 왼쪽 정렬 */
    margin-top: 20px;
    padding-left: 20px; /* 왼쪽 여백 추가 */
}

.tab {
    position: relative;
    padding: 10px 25px;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #f1f1f1; /* 기본 배경 색상 */
    color: #333; /* 기본 텍스트 색상 */
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    transition: background-color 0.3s, color 0.3s; /* 부드러운 전환 효과 */
    text-decoration: none; /* 밑줄 없애기 */
    margin-right: 5px; /* 탭 사이의 간격 */
}

.tab.active {
    background-color: #ffc107; /* 활성화된 탭의 배경 색상 */
    color: white; /* 활성화된 탭의 텍스트 색상 */
}

.tab:hover {
    background-color: #e0e0e0; /* 호버 시 배경 색상 */
    color: #000; /* 호버 시 텍스트 색상 */
}

.tab:last-child {
    margin-left: 5px;
}

.tab:last-child::after {
    content: '';
}

.divider {
    color: #ccc; /* 구분선 색상 */
    margin: 0 10px; /* 구분선 양쪽 여백 */
    font-size: 24px; /* 구분선 크기 조정 */
    line-height: 1;
    margin-bottom: 5px;
}
</style>
