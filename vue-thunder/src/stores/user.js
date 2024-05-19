import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router'

const REST_USER_API = 'http://localhost:8080/user';

export const useUserStore = defineStore('user', () => {
    // 로그인 중인지 체크
    const isLoggedIn = ref(false);
    
    const login = async (username, password) => {
        await axios.post(`${REST_USER_API}/login`, {
            id: username,
            password: password
        }, {
        withCredentials: true // 쿠키를 포함한 요청
        })
        .then(() => {
            // 로그인 성공 알림
            alert('로그인 성공');
            isLoggedIn.value = true;
            router.push({name : 'home'});
        })
        .catch((error) => {
            alert('로그인 실패');
            router.push({name : 'user'})
        });
    }

    const logout = async () => {
        await axios.post(`${REST_USER_API}/logout`, {}, {
            withCredentials: true // 쿠키를 포함한 요청
        })
        .then(() => {
            alert('로그아웃 성공');
            isLoggedIn.value = false;
            router.push({name : 'home'})
        })
        .catch(() => {
            alert('로그아웃 실패');
        });
    };

    const signup = async (user) => {
          const response = await axios.post(`${REST_USER_API}/signup`, user, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => {
            alert('회원가입이 성공적으로 완료되었습니다.');
            router.push({ name: 'login' });
          })
          .catch((error) => {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
          })
    
      };

    return {
        login, logout, isLoggedIn, signup
    };
})

