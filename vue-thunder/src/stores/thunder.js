import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

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
    try {
      const response = await axios.post('http://localhost:8080/thunder', thunderData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true // 쿠키를 포함한 요청
      });
      console.log('Thunder created successfully:', response.data);
    } catch (error) {
      console.error('Error creating thunder:', error);
    }
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
