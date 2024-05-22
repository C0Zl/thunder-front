<template>
  <div>
    <h2><img class="thunder-icon" src="../icons/common/thunder.png" alt="thunder icon"> 번개 생성</h2>
    <div id="thunder-create-container">
      <div id="thunder-create-box">
        <form @submit.prevent="handleSubmit">
          <div id="thunder-name" class="form-group">
            <h4>번개 이름</h4>
            <input v-model="title" type="text" placeholder="번개 이름을 입력해주세요">
          </div>
          <div class="form-row">
            <div class="form-group left-container">
              <h4>번개 종목</h4>
              <select v-model="category" name="category">
                <option v-for="(category, index) in categories" :key="index" :value="category.value">{{ category.label }}</option>
              </select>
            </div>
            <div class="form-group">
              <h4>최대 인원</h4>
              <select v-model="scale" name="max-scale-select">
                <option v-for="number in maxNumbers" :key="number" :value="number">{{ number }}</option>
              </select>
            </div>
          </div>
          <div class="form-group description-group">
            <h4>번개 설명</h4>
            <textarea v-model="description" cols="20" rows="10" style="overflow:visible" placeholder="내용을 입력해주세요"></textarea>
          </div>
          <div class="form-row form-row-bottom">
            <div class="form-group form-image">
              <h4>사진 등록</h4>
              <div class="file-upload">
                <img :src="imageUrl" alt="Selected Image" class="uploaded-image">
                <input id="file-upload-button" class="file-upload-button" type="file" accept="image/*" @change="onImageChange">
                <label for="file-upload-button" class="custom-file-upload">사진 선택</label>
              </div>
            </div>
            <div class="form-group thunder-Thunder">
              <h4>번개 일정</h4>
              <input v-model="dateTime" class="form-date" type="datetime-local" :min="minDateTime">
            </div>
            <div class="form-group thunder-location">
              <h4>번개 장소</h4>
              <input :value="formattedAddress(store.address)" class="form-location" type="text" placeholder="주소 검색" @click="openModal" readonly>
            </div>
          </div>
          <div class="form-group">
            <h4>오픈 채팅방 URL</h4>
            <input v-model="chatUrl" class="form-url" type="url" placeholder="URL 등록">
          </div>
          <button type="submit">번개 만들기</button>
        </form>
      </div>
    </div>
    <AddressModal :isModalOpen="isModalOpen" :closeModal="closeModal"/>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddressModal from '@/components/thunder/AddressModal.vue';
import { useThunderStore } from '@/stores/thunder';

const store = useThunderStore();

const categories = [
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

const maxNumbers = Array.from({ length: 29 }, (_, i) => i + 2);

// v-model 초기화
const title = ref('');
const category = ref('배드민턴'); // 기본 선택 값을 "배드민턴"으로 설정
const scale = ref(4); // 기본 선택 값을 "4"로 설정
const description = ref('');
const dateTime = ref('');
const chatUrl = ref('');
const defaultImage = new URL('@/assets/thunder/thunderDefault.png', import.meta.url).href;
const imageUrl = ref(defaultImage);
const minDateTime = ref(new Date().toISOString().slice(0, 16));

const isModalOpen = ref(false);
const file = ref(null);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function onImageChange(event) {
  file.value = event.target.files[0];
  console.log(file.value);
  if (file.value) {
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl.value = reader.result;
    };
    reader.readAsDataURL(file.value);
  } else {
    imageUrl.value = defaultImage;
  }
}

function handleSubmit() {
  const selectedDateTime = new Date(dateTime.value);
  const currentDateTime = new Date();

  if (selectedDateTime < currentDateTime) {
    alert('선택한 일정이 현재보다 과거입니다. 다시 선택해주세요.');
    return;
  }

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('category', category.value);
  formData.append('scale', scale.value);
  formData.append('description', description.value);
  formData.append('dateTime', dateTime.value.replace('T', ' ').substring(0, 19));
  formData.append('addressName', store.address);
  formData.append('longitude', store.longitude);
  formData.append('latitude', store.latitude);
  formData.append('chatUrl', chatUrl.value);

  console.log(file)
  if (file.value) {
    formData.append('file', file.value);
  } else {
    const defaultFile = new File([], 'defaultThunder.png');
    formData.append('file', defaultFile);
  }

  console.log(formData)
  store.createThunder(formData);
}

// 선택된 주소 표시 포맷 함수
function formattedAddress(address) {
  if (address) {
    return address.split(" *")[0];
  }
  return '';
}
</script>

<style scoped>
/* 번개 생성 폼 컨테이너 */
#thunder-create-container {
  padding: 10px 30px 30px 30px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 2000px;
  margin: 0 auto;
}

/* 폼 박스 레이아웃 */
#thunder-create-box {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* 헤더 스타일 */
h2 {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
}

h4 {
  color: #474646;
}

.thunder-icon {
  width: 30px;
  margin-right: 5px;
}

/* 폼 그룹 레이아웃 */
.form-group {
  display: flex;
  flex-direction: column;
}

/* 특정 폼 행 스타일 */
.left-container {
  margin-right: 450px;
}

.form-row,
.form-row-bottom {
  display: flex;
  gap: 20px;
}

/* 날짜 및 시간 입력 스타일 */
.form-date,
.form-time {
  width: 200px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 10px;
  margin-right: 50px;
  font-family: "Noto Sans KR", sans-serif; /* 원하는 글꼴로 변경 */
  font-size: 14px; /* 글꼴 크기 조절 */
  color: #888;
}

/* 공통 입력, 텍스트 영역, 버튼 스타일 */
input, textarea, button {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: white;
}

/* 셀렉트 박스 스타일 */
select {
  padding: 15px 20px 15px 10px;
  width: 250%;
  border: 1px solid #ccc;
  border-radius: 20px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='black' height='38' viewBox='0 0 24 24' width='38' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat right 10px center;
  background-color: white;
  text-align-last: center; 
}

/* 텍스트 영역 스타일 */
textarea {
  resize: none;
  width: calc(100% - 30px); /* 설명 부분에 마진 추가 */
}

/* 옵션 스타일 */
option {
  padding: 0;
}

/* 제출 버튼 스타일 */
button[type="submit"] {
  background-color: #ffcc00;
  border: none;
  color: white;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  grid-column: 1 / -1;
}

button[type="submit"]:hover {
  background-color: #ffbb00;
}

/* 파일 업로드 스타일 */
.file-upload {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-right: 50px;
}

.uploaded-image {
  width: 130px;
  height: 130px;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 10px;
}

.file-upload-button {
  display: none;
}

.custom-file-upload {
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  display: inline-block;
}

/* 위치 입력 스타일 */
.form-location {
  margin-bottom: 10px;
  width: 400px;
}

/* 설명 그룹 스타일 */
.description-group {
  grid-column: 1 / -1;
}

/* 번개 이름 입력 스타일 */
#thunder-name {
  width: 450px;
  margin-right: 30px;
}

/* URL 입력 스타일 */
.form-url {
  width: calc(100% - 30px);
  margin-bottom: 30px;
}

</style>
