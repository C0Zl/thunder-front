<template>
    <div class="thunder-container">
        <div class="thunder-list">
            <div v-for="thunder in thunders" :key="thunder.id" class="thunder-item">
                <img :src="thunder.imageUrl" alt="thunder image" class="thunder-image" />
                <div class="thunder-info">
                <h4>{{ thunder.name }}</h4>
                <p>{{ thunder.location }}</p>
                <p>{{ thunder.description }}</p>
                </div>
                <RouterLink :to="{ name: 'thunderDetail', params: { id: thunder.id } }" class="thunder-detail-link">
                <img src="@/assets/detail-arrow.png" alt="상세 보기" />
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const thunders = ref([]);

const fetchThunders = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/thunders/upcoming');
    thunders.value = response.data;
  } catch (error) {
    console.error('Error fetching upcoming thunders:', error);
  }
};

onMounted(fetchThunders);
</script>

<style scoped>
.thunder-container {
  padding: 20px;
}

.thunder-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.thunder-item {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.thunder-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 20px;
}

.thunder-info {
  flex-grow: 1;
}

.thunder-info h4 {
  margin: 0;
  font-size: 18px;
}

.thunder-info p {
  margin: 5px 0;
}

.thunder-detail-link {
  width: 20px;
  height: 20px;
}
</style>