<template>
  <div>
    <header class="header">
      <div class="header-title">
        <h1>나의 사진첩</h1>
        <div class="upload-section" @click="triggerFileUpload">
          <img src="../icons/common/upload.png" alt="upload icon" class="upload-icon">
          <label class="upload-label" for="file-upload">사진 등록</label>
        </div>
      </div>
      <div class="header-controls">
        <select v-model="selectedThunderId" @change="updateSelectedThunder">
          <option v-for="thunder in myThunderStore.thunders" :key="thunder.id" :value="thunder.id">
            {{ thunder.title }} - {{ thunder.dateTime }}
          </option>
        </select>
        <input id="file-upload" accept="image/*" type="file" @change="onFileChange" style="display: none;">
        <input type="text" placeholder="파일을 등록하세요" class="file-name" readonly>
        <button @click="registerPhoto">사진 등록하기</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMyThunderStore } from '@/stores/mythunder';
import { useAlbumStore } from '@/stores/album';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedThunderId = ref('');
const selectedThunder = ref(null); // 선택된 일정 객체
const selectedFile = ref(null);

const myThunderStore = useMyThunderStore();
const albumStore = useAlbumStore();

onMounted(() => {
  const userSession = sessionStorage.getItem('loginUser');
  // 로그인 되지 않은 경우
  if (!userSession) {
    alert('로그인이 필요합니다.');
    router.push({ name: 'home' });
  }

  myThunderStore.fetchPastThunders();
});

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  document.querySelector('.file-name').value = event.target.files[0].name;
};

const updateSelectedThunder = () => {
  selectedThunder.value = myThunderStore.thunders.find(thunder => thunder.id === selectedThunderId.value);
};

const registerPhoto = async () => {
  if (!selectedThunderId.value || !selectedFile.value) {
    alert('일정과 사진을 선택하세요.');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await albumStore.createPhoto(formData, selectedThunderId.value);
    window.location.reload();
    // alert('사진이 성공적으로 등록되었습니다!');
  } catch (error) {
    alert('사진 등록에 실패했습니다.');
  }
};

const triggerFileUpload = () => {
  document.getElementById('file-upload').click();
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.header-title h1 {
  font-size: 1.2rem; 
  color: #333;
}

.upload-section {
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ddd; 
  padding: 5px 10px; 
  border-radius: 5px; 
  background-color: #f9f9f9; 
  transition: background-color 0.3s ease; 
}

.upload-section:hover {
  background-color: #f1f1f1; 
}

.upload-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.upload-label {
  font-size: 1rem;
  color: #007bff;
  cursor: pointer;
}

.header-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px; 
}

.header-controls select,
.header-controls .file-name,
.header-controls button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.header-controls select {
  flex: 2;
}

.header-controls .file-name {
  flex: 2;
}

.header-controls button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
}

.header-controls button:hover {
  background-color: #0056b3;
}
</style>
