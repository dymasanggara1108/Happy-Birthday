# Website Ucapan Ulang Tahun Interaktif

Website ini berisi:
1. Amplop yang dapat diklik.
2. Tampilan ucapan ulang tahun ke-22 dan tanggal ulang tahun.
3. Gerbang password sebelum membuka surat.
4. Surat ucapan manis.
5. Album foto kenangan.
6. Kue ulang tahun dengan lilin interaktif.
7. Kolom permintaan.
8. Lagu dan slideshow foto penutup.

## Cara menjalankan

1. Ekstrak file ZIP.
2. Buka folder `website_ulang_tahun`.
3. Klik dua kali file `index.html`.
4. Website akan terbuka di browser.

## Mengganti nama penerima dan pengirim

Buka file `script.js`, lalu ubah bagian paling atas:

```js
const CONFIG = {
  recipientName: "Nama Dia",
  senderName: "Nama Kamu",
  birthdayDateText: "15 Agustus 2026",
  birthdayAge: 22,
  accessPassword: "15082004",
  romanticInterval: 4700
};
```

## Mengganti foto

Masuk ke folder:

`assets/photos`

Ganti file:
- photo1.png
- photo2.png
- photo3.png
- photo4.png
- photo5.png
- photo6.png
- photo7.png
- photo8.png

Gunakan nama file yang sama agar tidak perlu mengubah kode. Foto landscape dengan rasio 4:3 atau 16:9 akan terlihat paling baik.

## Menambahkan lagu

Siapkan file MP3 yang memang boleh kamu gunakan, lalu ubah namanya menjadi:

`shape-of-my-heart.mp3`

Masukkan ke folder:

`assets/music`

Catatan: file musik tidak disertakan dalam paket karena hak cipta. Browser juga dapat membatasi autoplay, tetapi musik akan dicoba diputar setelah tombol “Permintaanku sudah selesai” ditekan.

## Mengubah isi surat

Buka `index.html`, cari bagian:

`<div class="letter-body">`

Kemudian ubah paragraf di dalam tag `<p>...</p>`.

## Mengunggah ke internet gratis

Pilihan sederhana:
- GitHub Pages
- Netlify
- Cloudflare Pages
- Vercel

Unggah seluruh isi folder, bukan hanya file `index.html`.


## Update tambahan
Versi ini sudah diperbarui:
- Saat musik diputar di halaman akhir, foto-foto kenangan akan berterbangan.
- Banyak bunga mawar akan jatuh/bertebaran agar tampil lebih romantis dan menarik.


## Versi romantis premium

Pembaruan pada halaman lagu:
- Kalimat romantis muncul satu per satu ketika musik benar-benar diputar.
- Ketika musik dijeda, pergantian kalimat dan animasi ikut berhenti.
- Foto kenangan tetap bergerak lembut.
- Kelopak mawar menggunakan animasi 3D, beberapa warna mawar, bunga utuh, dan kilauan.
- Disertakan musik demo original agar website dapat langsung diuji tanpa error.

### Mengganti musik demo

Ganti file berikut dengan lagu MP3 legal milikmu:

`assets/music/shape-of-my-heart.mp3`

Pertahankan nama file tersebut agar tidak perlu mengubah kode.


## Gerbang password sebelum surat

Versi ini memiliki dua tampilan tambahan setelah amplop dibuka:
- Ucapan ulang tahun ke-22 dengan tanggal 15 Agustus 2026.
- Halaman password sebelum masuk ke surat.

Password saat ini: `15082004`.
Setelah pengguna salah lebih dari 3 kali, sistem menampilkan petunjuk: `hari ulang tahunmu`.

Karena website ini bersifat statis dan password disimpan di JavaScript sisi browser, fitur ini berfungsi sebagai gerbang interaktif/personal, bukan sistem keamanan untuk data rahasia.


## Musik pembuka

Versi ini menggunakan musik pembuka `assets/music/abtu.mp3`. Musik dicoba diputar sejak website dibuka dan akan mulai pada interaksi pertama apabila browser memblokir autoplay bersuara. Musik pembuka berhenti dan kembali ke awal ketika lagu utama pada halaman finale mulai diputar.

Pastikan file `abtu.mp3` ditempatkan di folder `assets/music`.
