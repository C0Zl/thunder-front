<template>
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>주소 검색</h2>
      <form @submit.prevent="searchAddress" class="search-form">
        <input type="text" v-model="keyword" placeholder="키워드를 입력해주세요" class="search-input">
        <button type="submit" class="search-button">검색</button>
      </form>
      <div class="results">
        <p v-if="addresses.length === 0 && !searching">키워드로 검색해보세요!</p>
        <ul v-else>
          <li v-for="address in addresses" :key="address.id" @click="selectAddress(address)">
            <div class="address-item">
              <div class="address-header">
                <span class="place-name">{{ address.place_name }}</span>
                <span class="category-name">{{ address.category_name }}</span>
              </div>
              <div class="address-body">
                <span class="road-name">도로명: {{ address.road_address_name }}</span>
                <span class="address-name">지번: {{ address.address_name }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useThunderStore } from '@/stores/thunder';
import axios from 'axios';

const props = defineProps({
  isModalOpen: Boolean,
  closeModal: Function,
});

const keyword = ref('');
const addresses = ref([]);
const searching = ref(false);
const store = useThunderStore();

async function searchAddress() {
  searching.value = true;

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword.value)}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${store.API_KEY}`,
      },
    });
    addresses.value = response.data.documents;
  } catch (error) {
    console.error('Error fetching address:', error.response.status, error.response.statusText);
  } finally {
    searching.value = false;
  }
}

function selectAddress(address) {
  const selectedAddress = {
    address_name: `${address.place_name} (${address.road_address_name}) * ${address.address_name}`,
    y: address.y,
    x: address.x,
  };
  store.setAddress(selectedAddress);
  props.closeModal();
}
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-height: 90vh; /* 모달창의 최대 높이 설정 */
  overflow-y: auto;
  border-radius: 20px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #ffcc00;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #ffbb00;
}

.results {
  margin-top: 20px;
  height: 400px; /* 고정된 높이 설정 */
  overflow-y: auto; /* 스크롤바 추가 */
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

.address-item {
  display: flex;
  flex-direction: column;
}

.address-header {
  display: flex;
  justify-content: space-between;
}

.place-name {
  font-weight: bold;
}

.category-name {
  color: #888;
}

.address-body {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
}

.road-name, .address-name {
  color: #666;
}

p {
  margin: 0;
  padding: 10px;
  color: #888;
  text-align: center;
}
</style>
