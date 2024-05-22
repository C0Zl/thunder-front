import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router';

const REST_USER_API = 'http://localhost:8080/user';

export const useUserStore = defineStore('user', () => {
    // 로그인 중인지 체크
    const isLoggedIn = ref(false);
    const loginUser = ref({ id: '', name: '', image: '' });
    const user = ref({ id: '', name: '', image: '', favorite: '' });
    
    const checkLoginStatus = () => {
        const userId  = sessionStorage.getItem('loginUser'); // 쿠키에서 토큰을 가져옵니다.
        // console.log(userId)
        if (userId) {
            axios.get(`${REST_USER_API}/loginUser`, {
                headers: {
                    'loginuser': userId,
                },
                withCredentials: true // 세션 정보를 포함한 요청
            })
            .then((response) => {
                // console.log(response)
                isLoggedIn.value = true;
                // console.log()
                // console.log(isLoggedIn);
                loginUser.value = response.data
                // user.value =  {
                //     id : response.data.id,
                //     name : response.data.name,
                //     image : response.data.image
                // }
                // console.log(user)
            })
            .catch((error) => {
                // console.error('Error verifying token:', error);
                isLoggedIn.value = false;
            })
        } else {
            isLoggedIn.value = false;
        }
        // console.log(isLoggedIn)
    };

    const login = (username, password) => {
        axios.post(`${REST_USER_API}/login`, {
            id: username,
            password: password
        }, {
            withCredentials: true // 쿠키를 포함한 요청
        })
        .then((response) => {
            // // 로그인 성공 알림
            // response.data = username;
            // // console.log(response)
            // const token = response.data;
            // console.log(token)
            sessionStorage.setItem('loginUser', username);

            alert('로그인 성공');
            isLoggedIn.value = true;
            router.push({name : 'home'});
        })
        .catch((error) => {
            console.log(error)
            if (error.response && error.response.status === 400) {
                alert('아이디 비밀번호가 일치하지 않습니다');
            } else {
                alert('로그인 실패');
            }
            router.push({name : 'login'})
        });
    }

    const logout = () => {
        axios.post(`${REST_USER_API}/logout`, {}, {
            withCredentials: true // 쿠키를 포함한 요청
        })
        .then(() => {
            alert('로그아웃 성공');
            isLoggedIn.value = false;

            sessionStorage.removeItem('loginUser'); // Local Storage에서 토큰 삭제

            router.push({name : 'map'})
        })
        .catch(() => {
            alert('로그아웃 실패');
        });
    };

    const signup = (user) => {
          const response = axios.post(`${REST_USER_API}/signup`, user, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => {
            alert('회원가입이 성공적으로 완료되었습니다.');
            router.push({ name: 'login' });
          })
          .catch((error) => {
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
          })
    
      };

      const getUserById = async (userId) => {
        try {
            // console.log('try')
          const response = await axios.get(`${REST_USER_API}/${userId}`, {
            timeout: 3000, // 5초 타임아웃 설정
          });
          user.value = response.data;
        //   console.log(user)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    return {
        login, logout, isLoggedIn, signup, checkLoginStatus, user, getUserById, loginUser
    };
})

