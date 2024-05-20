import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const REST_THUNDER_API = `http://localhost:8080/thunder`;
const REST_USER_API = `http://localhost:8080/user`;

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

  function setAddress(newAddress) {
    address.value = newAddress.address_name;
    latitude.value = newAddress.y;
    longitude.value = newAddress.x;
  }

  function createThunder(thunderData) {
    const response = axios.post(REST_Thunder_API, thunderData, {
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

  // 전체 번개 조회
  const getThunderList = function() {
    axios.get(REST_THUNDER_API)
      .then((res) => {
        console.log(res.data);
        thunderList.value = res.data;
        originalThunderList.value = res.data;
      })
      .catch((error) => {
        console.error('Error fetching thunders:', error);
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
        console.log(condition);
        thunderList.value = thunderResponse.data;
        originalThunderList.value = thunderResponse.data;
      }
    } catch (error) {
      console.error('Error searching thunder:', error);
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
          console.log(location);
        } else {
          alert('검색 결과가 없습니다.');
          return;
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
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
    console.log(thunderList.value);
  };

  // 번개 상세보기
  const thunder = ref({});
  const getThunderDetail = async (thunderId) => {
    try {
      const response = await axios.get(`${REST_THUNDER_API}/${thunderId}`);
      thunder.value = response.data;
    } catch (error) {
      console.error('Error fetching thunder detail:', error);
    }
  };

  // 유저 정보 불러오기
  const user = ref({});
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${REST_USER_API}/${userId}`);
      user.value = response.data;
      console.log('Fetched user data:', user.value); // user 값을 출력
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  
  
  return {
    API_KEY,
    address,
    latitude,
    longitude,
    setAddress,
    createThunder,
    
    thunderList,
    searchThunder,
    regionPoint,
    regionName,
    getThunderList,
    thunder,
    getThunderDetail,
    user,
    getUserById,
  };
});
