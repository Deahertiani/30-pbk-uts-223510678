<template>
    <div class="album-Lihat">
      <h1 class="judul">Pilih Album</h1>
      <div class="album-list">
        <div class="album-item" v-for="album in albums" :key="album.id" @click="handleAlbumClick(album.id)">
          <div class="album-thumbnail">
            <img :src="getAlbumThumbnail(album.id)" alt="Album Thumbnail">
          </div>
          <div class="album-rincian">
            <h2 class="album-judul">{{ album.judul }}</h2>
            <p class="album-keterangan"><strong>Artist:</strong> {{ getAlbumArtist(album.userId) }}</p>
            <p class="album-keterangan"><strong>Tracks:</strong> {{ getAlbumTrackCount(album.id) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const albums = ref([]);
  const router = useRouter();
  
  const fetchAlbums = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      albums.value = response.data;
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };
  
  const handleAlbumClick = (albumId) => {
    router.push({ name: 'album-detail', params: { albumId } });
  };
  
  const getAlbumThumbnail = (albumId) => {
    return `https://via.placeholder.com/150/000000/FFFFFF?text=Album+${albumId}`;
  };
  
  const getAlbumArtist = (userId) => {
    return `Artist ${userId}`;
  };
  
  const getAlbumTrackCount = (albumId) => {
    return Math.floor(Math.random() * 15) + 5; // Example random track count
  };
  
  onMounted(() => {
    fetchAlbums();
  });
  </script>
  
  <style scoped>
  .album-Lihat {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .judul {
    text-align: center;
    font-size: 28px;
    color: #f7ebeb;
    margin-bottom: 20px;
  }
  
  .album-list {
    display: grid;
    gap: 20px;
  }
  
  .album-item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .album-item:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
  
  .album-thumbnail {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 8px;
  }
  
  .album-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .album-rincian {
    display: flex;
    flex-direction: column;
  }
  
  .album-judul {
    font-size: 20px;
    margin-bottom: 8px;
    color: #e32e52;
  }
  
  .album-keterangan {
    font-size: 16px;
    color: #664343;
    margin-bottom: 4px;
  }
  </style>
  