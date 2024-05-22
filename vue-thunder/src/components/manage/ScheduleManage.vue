<template>
  <div class="schedule-manage-container">
    <div class="header">
      <div class="header-left">
        <router-link :to="{ name: 'remain' }" class="back-button">＜</router-link>
        <h1 class="title">{{ thunderStore.thunder.title }} 관리페이지</h1>
      </div>
      <div class="header-right">
        <input type="datetime-local" v-model="datetime" class="datetime-input" />
        <input :value="formattedAddress(thunderStore.address)" class="address-input" type="text" placeholder="주소 검색" @click="openModal" readonly>
        <button class="update-button" @click="updateSchedule">일정 및 장소 변경</button>
      </div>
    </div>
    <AddressModal :isModalOpen="isModalOpen" :closeModal="closeModal" @selectAddress="setAddress"/>
  </div>
</template>

<script setup>
import { useThunderStore } from '@/stores/thunder';
import { useManageStore } from '@/stores/manage';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AddressModal from '@/components/manage/AddressModal.vue'; // AddressModal import

const datetime = ref('');
const address = ref('');
const isModalOpen = ref(false); // 모달 상태를 관리하기 위한 변수

const thunderStore = useThunderStore();
const manageStore = useManageStore();

const route = useRoute();

onMounted(() => {
  thunderStore.getThunderDetail(route.params.thunderId).then(() => {
    const thunder = thunderStore.thunder;
    if (thunder.date && thunder.time) {
      datetime.value = `${thunder.date}T${thunder.time}`;
    }
    if (thunderStore.address) {
      address.value = thunderStore.address;
    }
  });
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const setAddress = (selectedAddress) => {
  address.value = selectedAddress;
};

const updateSchedule = async () => {
  const [date, time] = datetime.value.split('T');
  const currentThunder = thunderStore.thunder;

  // 현재 시간보다 과거인지 확인
  const selectedDateTime = new Date(datetime.value);
  const currentDateTime = new Date();
  
  if (selectedDateTime < currentDateTime) {
    alert('선택한 일정이 현재보다 과거입니다. 다시 선택해주세요.');
    return;
  }

  // 기존 값을 유지하도록 설정
  const updatedThunder = {
    dateTime: datetime.value ? `${date} ${time}:00` : currentThunder.dateTime,
    addressName: thunderStore.address || currentThunder.addressName,
    longitude: thunderStore.longitude || currentThunder.longitude,
    latitude: thunderStore.latitude || currentThunder.latitude
  };

  // 입력된 값이 비어있는 경우 경고 메시지 표시
  if (!datetime.value && !thunderStore.address) {
    alert('일정 또는 장소를 선택해주세요');
    return;
  }

  try {
    await manageStore.updateThunder(route.params.thunderId, updatedThunder);
    window.location.reload();
    // console.log('일정 및 장소 변경:', updatedThunder);
    // 성공적으로 업데이트된 경우 페이지를 리다이렉트 할 수 있습니다.
    // router.push({ name: 'remain' });
  } catch (error) {
    // console.error('Failed to update schedule:', error);
    // 에러 메시지를 사용자에게 표시하는 로직을 추가할 수 있습니다.
  }
};

function formattedAddress(address) {
  if (address) {
    return address.split(" * ")[0];
  }
  return '';
}
</script>


<style scoped>
.schedule-manage-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
}

.header-left {
  display: flex;
  align-items: center;
}

.back-button {
  font-size: 24px;
  margin-right: 10px;
  text-decoration: none;
  color: #000;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.datetime-input,
.address-input {
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.update-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-button:hover {
  background-color: #0056b3;
}
</style>
