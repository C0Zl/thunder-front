import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router';

const REST_Thunder_API = 'http://localhost:8080/thunder/my';

export const useMyThunderStore = defineStore('mythunder', () => {

    const thunders = ref([]);

    const fetchThunders = () => {
        const userId  = sessionStorage.getItem('loginUser');

        axios.get(`${REST_Thunder_API}/remain`,{
            headers: {
                'loginuser': userId,
            },
            withCredentials: true // 세션 정보를 포함한 요청
        })
        .then((response) => {
            thunders.value = response.data;
            console.log(thunders)
        })
        .catch((error) => {
            alert(error)
        })
    };
  
    return {
        fetchThunders, thunders
    };
})
