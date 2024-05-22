<template>
  <div id = "container">
    <div id="login-container">
      <div class="login-header">
        <img src="@/components/icons/logo.png" alt="Logo Icon" />
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input v-model="username" type="text" id="username" required placeholder="아이디를 입력하세요">
        </div>
        <div class="form-group">
          <input v-model="password" type="password" id="password" required placeholder="비밀번호를 입력하세요">
        </div>
        <button type="submit" class="login-button">로그인</button>
      </form>
      <div class="signup-link">
        <router-link :to="{ name: 'signup' }">회원가입</router-link>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const store = useUserStore();

const username = ref('');
const password = ref('');

// 로그인 기능
const handleLogin = async () => {
  await store.login(username.value, password.value);
};
</script>

<style scoped>


#login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 화면 전체 높이를 사용 */
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #fafafa;
  border-radius: 10px;
  text-align: center;
}

.login-header {
  margin-bottom: 20px;
}

img {
  border-radius: 50%; /* 원형으로 변경 */
  margin-bottom: 30px;
}

.login-header img {
  width: 100px; /* 이미지 크기 조정 */
  height: 100px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
}

input {
  width: 100%;
  padding: 10px 40px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  text-align: center;
}

button.login-button {
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

button.login-button:hover {
  background-color: #e0a800;
}

.signup-link {
  margin-top: 20px;
  font-size: 14px;
}

.signup-link a {
  color: #807F7F;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
