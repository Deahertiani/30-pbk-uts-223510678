<template>
    <div class="home">
      <h1>Selamat Datang</h1>
      <p>Ini adalah halaman utama aplikasi Anda. Aplikasi ini dibuat untuk membantu Anda mengelola kegiatan sehari-hari dan membaca postingan terbaru dari pengguna lain.</p>
  
      <h2>Fitur Aplikasi</h2>
      <ul>
        <li>Manajemen Kegiatan: Tambahkan, edit, dan hapus kegiatan Anda.</li>
        <li>Filter Kegiatan: Sembunyikan atau tampilkan kegiatan yang sudah diselesaikan.</li>
        <li>Postingan Pengguna: Baca postingan dari pengguna lain.</li>
        <li>Pengguna: Pilih pengguna untuk melihat postingan mereka.</li>
        <li>Album Foto: Pilih dan lihat Rincian album foto.</li>
      </ul>
  
      <h2>Cara Menggunakan</h2>
      <p>Untuk memulai, pilih salah satu menu di atas:</p>
      <ul>
        <li><strong>Todos</strong>: Halaman ini memungkinkan Anda untuk menambahkan kegiatan baru, menandai kegiatan yang sudah selesai, mengedit, dan menghapus kegiatan.</li>
        <li><strong>Posts</strong>: Di sini Anda dapat melihat postingan dari berbagai pengguna. Pilih pengguna dari daftar untuk melihat postingan mereka.</li>
        <li><strong>Albums</strong>: Halaman ini memungkinkan Anda memilih album dan melihat Rincian album foto.</li>
      </ul>
  
      <h2>Kontak Kami</h2>
      <p>Jika Anda memiliki pertanyaan atau masukan, silakan hubungi kami melalui email di <a href="mailto:deahertiani@gmail.com">deahertiani@gmail.com</a>.</p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .home {
    text-align: left;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  h1, h2 {
    color: #f5f1f1;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    color: #fff;
    text-decoration: none;
  }
  
  a:hover {
    color: #e32e52;
    text-decoration: underline;
  }
  </style>
  