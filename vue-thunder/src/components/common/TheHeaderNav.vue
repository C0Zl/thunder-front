<template>
  <nav class="sidebar">
    <div class="profile">
      <img :src="imageUrl" alt="Profile Image" class="profile-img" />
      <span v-if="store.isLoggedIn" class="profile-name">{{ store.loginUser.name }}</span>
    </div>
    <a v-if="store.isLoggedIn" href="#" @click.prevent="handleLogout">
      <img src="../icons/common/logout.png" alt="로그아웃" style="width: 15px;">로그아웃
    </a>
    <div v-else class="signup-login">
      <RouterLink :to="{name : 'signup'}">
        <img src="../icons/common/signup.png" alt="회원가입" style="width: 15px;">회원가입
      </RouterLink>
      <span class="separator">|</span>
      <RouterLink :to="{name : 'login'}">
        <img src="../icons/common/login.png" alt="로그인" style="width: 15px;">로그인
      </RouterLink>
    </div>
    <ul class="nav-links">
      <li class="search"><RouterLink :to="{name : 'home'}"><img class="icon" src="../icons/common/searchThunder.png" alt="번개 찾기">번개 찾기</RouterLink></li>
      <li class="my"><RouterLink :to="{name : 'myThunder'}"><img class="icon" src="../icons/common/mythunder.png" alt="내 번개">내 번개</RouterLink></li>
      <li class="friend"><RouterLink :to="{name: 'myFriendList'}"><img class="icon" src="../icons/common/friend.png" alt="친구">친구</RouterLink></li>
      <li class="album"><RouterLink :to="{name : 'album'}"><img class="icon" src="../icons/common/album.png" alt="사진첩">사진첩</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';

const store = useUserStore();

const handleLogout = async () => {
  await store.logout();
};

// const defaultImage = new URL('../assets/profile.png', import.meta.url).href;

const imageUrl = computed(() => {
  if (store.isLoggedIn) {
    // 로그인 되어 있지만, 유저 프로필이 없으면 기본 이미지 제공
    const defaultManagerImageUrl = new URL(`/src/assets/userProfile/profile.png`, import.meta.url).href;
    if (store.loginUser.image) {
      return new URL(`/src/assets/userProfile/${store.loginUser.image}`, import.meta.url).href;
    }
    return defaultManagerImageUrl;
  } else {// 로그인 되지 않은 경우 기본 유저 프로필
    return new URL('@/assets/userProfile/profile.png', import.meta.url).href;
    // return new URL('@/assets/thunderDafault.png', import.meta.url).href;
  }
});

onMounted(() => {
  store.checkLoginStatus();
});

</script>
  
<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 10px;
  border-right: 1px solid #e9e9e9;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 1.5px solid #d5d5d5;
}

.profile-name {
  font-size: 18px;
  font-weight: bold;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.nav-links li {
  margin: 15px 0;
}

nav a {
  margin: 5px;
  text-decoration: none;
  color: #807F7F;
  font-size: 13px;
}

nav a > img {
  margin-right: 7px;
}

a {
  display: flex; /* flex 레이아웃 사용 */
  align-items: center; /* 수직 정렬 */
}

.nav-links a {
  text-decoration: none;
  color: #807F7F;
  font-size: 16px;
  padding: 5px 40px; /* 왼쪽으로 더 이동 */
}

.nav-links a:hover {
  color: #000;
}

.signup-login {
  display: flex;
  align-items: center;
}

.signup-login .separator {
  margin: 0 10px;
  color: #807F7F;
}

.signup-login img {
  margin-right: 7px; /* 이미지 간 간격을 추가 */
}
</style>
