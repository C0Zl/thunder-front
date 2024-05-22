import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const REST_THUNDER_API = `http://localhost:8080/thunder`;

export const useThunderStore = defineStore('thunder', () => {
  const thunderList = ref([]);
  const originalThunderList = ref([]);
  const searchCondition = ref({});
  const regionPoint = ref({ x: null, y: null });
  const regionName = ref('');
  const API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const address = ref('');
  const latitude = ref('');
  const longitude = ref('');
  const joinStatus = ref();
  const joinNum = ref();

  function setAddress(newAddress) {
    address.value = newAddress.address_name;
    latitude.value = newAddress.y;
    longitude.value = newAddress.x;
  }

  // 번개 생성
  function createThunder(thunderData) {
    const response = axios.post(REST_THUNDER_API, thunderData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true // 쿠키를 포함한 요청
    }).then(() => {
      alert('번개가 등록되었습니다')
      router.push({name : 'home'})
    }).catch(() => {
      alert('다시 시도해주세요')
    })
  }

  // 번개 삭제
  const deleteThunder = (thunderId) => {
    axios.delete(`${REST_THUNDER_API}/my/${thunderId}`, {
      withCredentials: true 
    }).then(() => {
      alert('번개를 나갔습니다.')
      router.push({name : 'myThunder'})
    }).catch((error) => {
      console.log(error)
    })
  }

  // 전체 번개 조회
  const getThunderList = function() {
    axios.get(REST_THUNDER_API)
      .then((res) => {
        thunderList.value = res.data;
        originalThunderList.value = res.data;
      })
      .catch((error) => {
        alert('조회 실패, 다시 시도해주세요.')
      });
  };

  // 날짜, 시간, 카테고리, 지역으로 검색
  const searchThunder = async function(condition, keyword) {
    searchCondition.value = condition;

    // 조건 검색 수행
    try {
      const thunderResponse = await axios.post(`${REST_THUNDER_API}/search`, condition);
      if (thunderResponse.status === 204) {
        thunderList.value = [];
      } else {
        thunderList.value = thunderResponse.data;
        originalThunderList.value = thunderResponse.data;
      }
    } catch (error) {
      alert('검색 실패, 다시 시도해주세요.')
      thunderList.value = [];
    }

    // 키워드가 있는 경우에만 지역 검색 수행
    if (keyword) {
      const regionUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(keyword)}`;
      try {
        const regionResponse = await axios.get(regionUrl, {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`
          }
        });
        const regionData = regionResponse.data.documents;
        if (regionData.length > 0) {
          const location = regionData[0];
          regionPoint.value = { x: location.x, y: location.y };
          regionName.value = location.address_name;
        } else {
          alert('검색 결과가 없습니다.');
          return;
        }
      } catch (error) {
          alert('검색 실패, 다시 시도해주세요.')
        return;
      }
    }

    // 전체 일정 목록에서 지역으로 필터링
    let filteredThunders = originalThunderList.value;
    if (keyword) {
      filteredThunders = filteredThunders.filter(thunder => thunder.addressName.includes(keyword));
    }

    // 검색 조건이 있는 경우 추가 필터링
    if (searchCondition.value.dateTime || searchCondition.value.category) {
      filteredThunders = filteredThunders.filter(thunder => {
        const matchesDateTime = searchCondition.value.dateTime ? thunder.dateTime.includes(searchCondition.value.dateTime) : true;
        const matchesCategory = searchCondition.value.category ? thunder.category.includes(searchCondition.value.category) : true;
        return matchesDateTime && matchesCategory;
      });
    }

    thunderList.value = filteredThunders;
  };

  // 번개 상세보기
  const thunder = ref({});
  const getThunderDetail = async (thunderId) => {
    try {
      const response = await axios.get(`${REST_THUNDER_API}/${thunderId}`);
      thunder.value = response.data;
    } catch (error) {
      alert('번개 상세 조회 실패, 다시 시도해주세요.')
    }
  };

    // 로그인 유저가 번개에 이미 참여했는지 판단
  const checkJoinStatus = async (thunderId) => {
    try {
      const response = await axios.get(`${REST_THUNDER_API}/status/${thunderId}`, { withCredentials: true });
      joinStatus.value = response.data;
      console.log(response.data)
      console.log(sessionStorage.getItem("loginUser"))
      console.log(thunderId)
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // 번개 참여 인원 조회
  const countJoin = async(thunderId) => {
    try{
      const response = await axios.get(`${REST_THUNDER_API}/join/${thunderId}`);
      joinNum.value = response.data;
    }
    catch{

    }
  };

  
  return {
    API_KEY,
    address,
    latitude,
    longitude,
    setAddress,
    createThunder,
    deleteThunder,
    thunderList,
    searchThunder,
    regionPoint,
    regionName,
    getThunderList,
    thunder,
    getThunderDetail,
    countJoin,
    checkJoinStatus,
    joinStatus,
    joinNum,
  };
});
