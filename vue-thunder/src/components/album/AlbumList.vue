<template>
  <div class="album-container">
    <h1>사진첩</h1>
    <div class="photo-gallery">
      <AlbumItem v-for="photo in albumStore.albums" :key="photo.id" :photo="photo" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAlbumStore } from '@/stores/album.js';
import { useMyThunderStore } from '@/stores/mythunder.js';
import AlbumItem from './AlbumItem.vue';

const albumStore = useAlbumStore();
const thunderStore = useMyThunderStore();

onMounted(async () => {
  await thunderStore.fetchPastThunders();
  await albumStore.fetchAlbum();
  console.log(albumStore.albums);
});
</script>

<style scoped>
.album-container {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.photo-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.photo-item {
  /* width: calc(33.333% - 20px); */
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
