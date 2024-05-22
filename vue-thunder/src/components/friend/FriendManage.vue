<template>
    <h2>나의 친구 요청 관리</h2>
    <div v-for="friend in friendStore.friendRequestList" :key="friend.id" class="friend-card">
        <div class="profile">
            <img :src="imageUrl(friend.image)" alt="Profile Image" class="profile-icon" />
            <div class="profile-name">{{ friend.name }}</div>
        </div>
        <div class="actions">
            <button class="btn action-btn accept-btn" @click="addFriend(friend.id)"></button>
            <button class="btn action-btn reject-btn" @click="rejectFriend(friend.id)"></button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useFriendStore } from '@/stores/friend';
import axios from 'axios';

const friendStore = useFriendStore();
const REST_FRIEND_API = `http://localhost:8080/friend`;

onMounted(() => {
    friendStore.getFriendRequestList();
})

// 유저 프로필 사진 가져오기
const imageUrl = (friendImage) => {
    if (friendImage === null) {
        return new URL('@/assets/userProfile/profile.png', import.meta.url).href;
    } else {
        return new URL(`/src/assets/userProfile/${friendImage}`, import.meta.url).href;
    }
};

// 친구 맺기
const addFriend = async (friendId) => {
    try {
        await axios.put(`${REST_FRIEND_API}/request/${friendId}`, {}, { withCredentials: true }); // 쿠키를 포함한 요청
        console.log('Friend request accepted successfully');
        // 친구 요청 리스트에서 해당 요청 제거
        friendStore.friendRequestList = friendStore.friendRequestList.filter(friend => friend.id !== friendId);
        alert("요청을 수락했습니다.")
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// 친구 거절
const rejectFriend = async (friendId) => {
    try {
        await axios.delete(`${REST_FRIEND_API}/request/${friendId}`, { withCredentials: true }); // 쿠키를 포함한 요청
        console.log('Friend request rejected successfully');
        // 친구 요청 리스트에서 해당 요청 제거
        friendStore.friendRequestList = friendStore.friendRequestList.filter(friend => friend.id !== friendId);
        alert("요청을 거절했습니다.")
    } catch (error) {
        console.error('There was an error!', error);
    }
};
</script>

<style scoped>
.friend-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin: 10px 0;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.profile {
    display: flex;
    align-items: center;
}

.profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* Profile icon color */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.profile-icon::before {
    content: '👤';
    /* Placeholder icon */
    font-size: 24px;
    color: white;
}

.profile-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.actions {
    display: flex;
    align-items: center;
}

.btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
}

.accept-btn {
    background-color: #F3D849;
    /* Accept button color */
}

.accept-btn::before {
    content: '✔️';
    /* Accept icon */
    font-size: 16px;
    color: white;
}

.reject-btn {
    background-color: #e0e5e9;
    /* Reject button color */
}

.reject-btn::before {
    content: '❌';
    /* Reject icon */
    font-size: 16px;
    color: white;
}
</style>
