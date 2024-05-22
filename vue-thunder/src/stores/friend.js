import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_FRIEND_API = `http://localhost:8080/friend`;

export const useFriendStore = defineStore("friend", () => {
  const allFriendList = ref([]); // 전체 친구 리스트
  const friendThunderList = ref([]); // 친구가 모집하는 번개 리스트
  const friendRecruitingStatus = ref({}); // 친구별 번개 모집 상태 캐시
  const friendRelationStatus = ref({}); // 친구별 관계 상태 캐시
  const friendRequestList = ref([]); // 로그인 유저가 받은 친구 요청 목록
  const myFriendList = ref([]); // 내 친구 목록

  // 전체 친구 검색 및 조회
  const getAllFriendList = async (searchName) => {
    try {
      const response = await axios.get(`${REST_FRIEND_API}/search`, {
        params: { searchName: searchName }
      });
      allFriendList.value = Array.isArray(response.data) ? response.data : [];
      const friendIds = allFriendList.value.map(friend => friend.id);
      // 친구 리스트를 불러온 후 각 친구의 번개 모집 상태와 관계 상태도 함께 불러옴
      await updateFriendRecruitingStatus(friendIds);
      await updateFriendRelationStatus(friendIds);
    } catch (error) {
      console.error("There was an error!", error);
      allFriendList.value = [];
    }
  };

  // 친구별 번개 모집 상태 업데이트
  const updateFriendRecruitingStatus = async (friendIds) => {
    try {
      const promises = friendIds.map(friendId =>
        axios.get(`${REST_FRIEND_API}/${friendId}`)
          .then(response => ({ friendId, thunders: response.data }))
      );
      const results = await Promise.all(promises);
      const status = {};
      results.forEach(({ friendId, thunders }) => {
        status[friendId] = thunders.length > 0;
      });
      friendRecruitingStatus.value = status;
    } catch (error) {
      console.error("There was an error fetching friend thunders!", error);
    }
  };

  // 친구별 관계 상태 업데이트
  const updateFriendRelationStatus = async (friendIds) => {
    try {
      const promises = friendIds.map(friendId =>
        axios.get(`${REST_FRIEND_API}/request/status/${friendId}`, {
          withCredentials: true, // 쿠키를 포함한 요청
        })
          .then(response => ({ friendId, status: response.data }))
      );
      const results = await Promise.all(promises);
      const status = {};
      results.forEach(({ friendId, status: relationStatus }) => {
        status[friendId] = relationStatus;
      });
      friendRelationStatus.value = status;
    } catch (error) {
      console.error("There was an error fetching friend relations!", error);
    }
  };

  // 친구 상태 직접 업데이트
  const setFriendRelationStatus = (friendId, status) => {
    friendRelationStatus.value[friendId] = status;
  };

  // 친구가 모집하는 번개
  const getFriendThunder = (friendId) => {
    axios.get(`${REST_FRIEND_API}/${friendId}`)
      .then((response) => {
        friendThunderList.value = response.data;
      })
      .catch((error) => {
        console.error("There was an error fetching friend thunder!", error);
      });
  };

  // 로그인 유저가 받은 친구 요청 목록 부르기
  const getFriendRequestList = () => {
    axios.get(`${REST_FRIEND_API}/request`, {
      withCredentials: true, // 쿠키를 포함한 요청
    })
      .then((response) => {
        console.log(response.data)
        friendRequestList.value = Array.isArray(response.data) ? response.data : [];
      })
      .catch((error) => {
        console.error("There was an error!", error);
        friendRequestList.value = [];
      });
  }

  // 로그인 유저의 친구 리스트 부르기
  const getMyFriendList = async (searchName) => {
    try {
      const response = await axios.get(`${REST_FRIEND_API}/my/search`, {
        params: { searchName: searchName },
        withCredentials: true,
      });
      myFriendList.value = Array.isArray(response.data) ? response.data : [];
      const friendIds = myFriendList.value.map(friend => friend.id);
      // 친구 리스트를 불러온 후 각 친구의 번개 모집 상태와 관계 상태도 함께 불러옴
      await updateFriendRecruitingStatus(friendIds);
      await updateFriendRelationStatus(friendIds);
    } catch (error) {
      console.error("There was an error!", error);
      myFriendList.value = [];
    }
  };

  return {
    allFriendList,
    getAllFriendList,
    friendThunderList,
    getFriendThunder,
    friendRecruitingStatus,
    updateFriendRecruitingStatus,
    friendRelationStatus,
    updateFriendRelationStatus,
    setFriendRelationStatus,
    friendRequestList,
    getFriendRequestList,
    myFriendList,
    getMyFriendList,
  };
});
