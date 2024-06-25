<template>
    <div class="album-rincian">
      <h1 class="title">Album Rincian</h1>
      <button @click="keAlbum" class="kembali"> Kembali</button>
      <div v-if="album">
        <h2 style="color:#fff;" class="album-title">{{ album.title }}</h2>
        <div class="photo-thumbnails">
          <div class="photo-thumbnail" v-for="photo in album.photos" :key="photo.id" @click="showFullukuran(photo)">
            <img :src="photo.thumbnailUrl" :alt="photo.title" class="thumbnail-img">
          </div>
        </div>
        <div v-if="isFullukuran" class="full-ukuran-modal">
          <div class="full-ukuran-photo">
            <img :src="fullukuranPhoto.url" :alt="fullukuranPhoto.title" @click="hideFullukuran" class="full-photo-img">
            <button @click="hideFullukuran" class="close-button">X</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  const album = ref(null);
  const isFullukuran = ref(false);
  const fullukuranPhoto = ref(null);
  const route = useRoute();
  const router = useRouter();
  
  const fetchAlbumrincian = async () => {
    try {
      const albumId = route.params.albumId;
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
      const albumData = response.data;
  
      const photoResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      const photos = photoResponse.data.map(photo => ({
        id: photo.id,
        title: photo.title,
        thumbnailUrl: photo.thumbnailUrl,
        url: photo.url  // Include the full-ukuran URL for each photo
      }));
  
      albumData.photos = photos;
      album.value = albumData;
    } catch (error) {
      console.error('Error fetching album rincian:', error);
    }
  };
  
  const showFullukuran = (photo) => {
    isFullukuran.value = true;
    fullukuranPhoto.value = photo;
  };
  
  const hideFullukuran = () => {
    isFullukuran.value = false;
    fullukuranPhoto.value = null;
  };
  
  const keAlbum = () => {
    router.push('/albums');
  };
  
  const getAlbumArtist = (userId) => {
    return `Artist ${userId}`;
  };
  
  onMounted(() => {
    fetchAlbumrincian();
  });
  </script>
  
  <style scoped>
.album-rincian {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-ukuran: 2.5rem;
  color: #f0e1e4;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: rgba(24, 194, 33, 0.1);
  border: 2px solid #e32e52;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.kembali {
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #e32e52;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-ukuran: 1rem;
  transition: background-color 0.3s ease;
}

.kembali:hover {
  background-color: #540716;
}

.album-title {
  font-ukuran: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #e32e52;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.photo-thumbnails {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.photo-thumbnail {
  margin: 5px;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photo-thumbnail:hover {
  transform: translateY(-5px);
}

.thumbnail-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.full-ukuran-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(38, 2, 2, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-ukuran-photo img {
  max-width: 80%;
  max-height: 80%;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(223, 206, 206, 0.5);
}

.close-button {

  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 15px;
  background-color: #c03652;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #eb4365;
}
</style>
