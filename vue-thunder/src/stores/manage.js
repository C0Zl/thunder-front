import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router';

const REST_MANAGE_API = 'http://localhost:8080/thunder/manage';

export const useManageStore = defineStore('manage', () => {
 
    const updateThunder = async (thunderId, updatedData) => {
        try {
            const response = await axios.put(`${REST_MANAGE_API}/${thunderId}`, updatedData, {
                withCredentials: true // 세션 정보를 포함한 요청
            });
            alert('일정을 변경하였습니다.')
            return response.data;
        } catch (error) {
            alert('일정 변경에 실패했습니다.')
        }
    }

    const applyUsers = ref([])

    const fetchApplyUsers = async (thunderId) => {
        try {
          const response = await axios.get(`${REST_MANAGE_API}/${thunderId}`, {
            withCredentials: true // 세션 정보를 포함한 요청
          });
          applyUsers.value = response.data;
        } catch (error) {
        //   console.log('Failed to fetch users:', error);
        }
      };
  
    const declineUser = async (thunderId, userId) => {
        try {
            const response = await axios.delete(`${REST_MANAGE_API}/${thunderId}/${userId}`, {
              withCredentials: true // 세션 정보를 포함한 요청
            });
            // applyUsers.value = response.data;
            alert('유저 가입 신청을 거절하였습니다.')
            window.location.reload();
        } catch (error) {
            console.log('Failed to fetch users:', error);
        }
    }
    
    const acceptUser = async (thunderId, userId) => {
        try {
            const response = await axios.put(`${REST_MANAGE_API}/${thunderId}/${userId}`, {}, {
                // headers: {
                //     'loginuser': managerId,
                // },
                withCredentials: true // 세션 정보를 포함한 요청
            });
            console.log(response)
            // applyUsers.value = response.data;
            alert('유저 가입 신청을 승인하였습니다.')
            window.location.reload();
          } catch (error) {
            console.log('Failed to fetch users:', error);
        }
    }

    return {
        updateThunder, applyUsers, fetchApplyUsers, declineUser, acceptUser
    }
})
