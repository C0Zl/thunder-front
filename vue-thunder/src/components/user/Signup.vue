<template>
  <div>

    <div id="signup-container">
      <label for="profileImageInput">
        <div class="signup-header">
          <img :src="imageUrl" alt="Profile Image" class="profile-img" />
          <input id="file-upload-button" class="file-upload-button" type="file" accept="image/*" @change="onImageChange" style="display: none;">
          <label for="file-upload-button" class="custom-file-upload">프로필 선택</label>
        </div>
      </label>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="name">닉네임</label>
          <input v-model="name" type="text" id="name" required placeholder="닉네임을 입력하세요">
        </div>
        <div class="form-group">
          <label for="id">아이디</label>
          <input v-model="id" type="text" id="id" required placeholder="아이디를 입력하세요">
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input v-model="password" type="password" id="password" required placeholder="비밀번호를 입력하세요">
        </div>
        <div class="form-group">
          <label for="favorite">관심 운동</label>
          <select v-model="favorite" id = "favorite" name="favorite">
            <option class="option" v-for="(category, index) in categories" :key="index" :value="category.value">{{ category.label }}</option>
          </select>
          <!-- <input v-model="favorite" type="text" id="favorite" required placeholder="관심 운동을 입력하세요"> -->
        </div>
        <button type="submit" class="signup-button">회원가입</button>
      </form>
      <div class="login-link">
        <router-link :to="{ name: 'login' }">로그인하러 가기</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const store = useUserStore();

const defaultImage = new URL('@/assets/userProfile/profile.png', import.meta.url).href;

const name = ref('');
const id = ref('');
const password = ref('');
const favorite = ref('배드민턴');
const imageUrl = ref(defaultImage);
const file = ref(null);

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

function onImageChange(event) {
  file.value = event.target.files[0];
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

const handleSignup = async () => {
  // if (!file.value) {
  //   alert('프로필 이미지를 선택하세요.');
  //   return;
  // }

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('id', id.value);
  formData.append('password', password.value);
  formData.append('favorite', favorite.value);

  if (file.value) {
    formData.append('file', file.value);
  }

  await store.signup(formData);
};
</script>

<style scoped>
#signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #fafafa;
  border-radius: 10px;
  text-align: center;
}

.signup-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.signup-header img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1.5px solid #d5d5d5;
  display: block;
  margin-bottom: 10px;
}

.custom-file-upload {
  font-size: small;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-block;
  background-color: #eee;
}

.form-group {
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #474646;
}

.option {
  padding-left: 0px;
}

select {
  padding: 10px 40px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='black' height='38' viewBox='0 0 24 24' width='38' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat right 10px center;
  background-color: white;
  text-align-last: center; 
}

input   {
  width: 100%;
  padding: 10px 40px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  text-align: center;
}

button.signup-button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
}

button.signup-button:hover {
  background-color: #e0a800;
}

.login-link {
  margin-top: 10px;
  font-size: 14px;
}

.login-link a {
  color: #807F7F;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

</style>
