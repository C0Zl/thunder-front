import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router';

const REST_Thunder_API = 'http://localhost:8080/thunder';

export const useThunderStore = defineStore('thunder', () => {
  const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const address = ref('');
  const latitude = ref('');
  const longitude = ref('');

  function setAddress(newAddress) {
    address.value = newAddress.address_name;
    latitude.value = newAddress.y;
    longitude.value = newAddress.x;
  }

  async function createThunder(thunderData) {
    const response = await axios.post(REST_Thunder_API, thunderData, {
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

  return {
    API_KEY,
    address,
    latitude,
    longitude,
    setAddress,
    createThunder,
  };
})
