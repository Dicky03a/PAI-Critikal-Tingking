# Panduan Setup Database Supabase - PAI Critical Thinking

Ikuti langkah-langkah di bawah ini untuk menghubungkan aplikasi dengan database Supabase Anda sendiri.

## 1. Buat Proyek Supabase
1. Buka [Supabase Dashboard](https://supabase.com/).
2. Buat proyek baru (*New Project*).
3. Beri nama proyek (misal: `PAI-Learning`) dan tentukan password database.

## 2. Konfigurasi Tabel Database
Buka menu **SQL Editor** di dashboard Supabase Anda, lalu salin dan jalankan (Run) query berikut untuk membuat tabel yang dibutuhkan:

```sql
-- 1. Tabel untuk menyimpan konten materi dinamis
CREATE TABLE materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  step_key TEXT UNIQUE NOT NULL, -- Contoh: 'competency', 'definition'
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabel untuk menyimpan semua input dari pengguna
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT DEFAULT 'Ahmad',
  step_name TEXT NOT NULL, -- analysis, design, implementation, evaluation
  input_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Masukkan data awal (Seed Data) untuk materi Kompetensi
INSERT INTO materials (step_key, title, content, image_url) VALUES 
('competency', 'Kompetensi Dasar', 
'{"body": "Memahami dan menerapkan konsep berpikir kritis dalam perspektif Pendidikan Agama Islam (PAI) untuk membentuk akhlak terpuji."}', 
'https://lh3.googleusercontent.com/aida-public/AB6AXuDlu-yoCAFmEOzvMTEGCOlJxrgqQhs8wxugwDCitNHfPiMZthOWFc7PjsOu7TB09-o-k_7e3uQTgm5gh17ubifYG6u0fKUyBHa337k_BXYHdgSBAceFhik_nyH8Q970qEy37aNF7i7rG-dltdQtIzxccaUqcWFyIhU_PaFzYhU0Rc5yBUhVHspj5DNHlRgzuVJmTRqBCWnBh-9EaLXhxQLCItlysOK_Y1j6ftsUeye89zhpxHelBvDWZHnHFrPQ0P6G3bLP73go_Ug');
```

## 3. Hubungkan API Keys ke Aplikasi
1. Di dashboard Supabase, buka menu **Project Settings** > **API**.
2. Salin **Project URL** dan **anon public key**.
3. Buka file `supabase.ts` di proyek ini.
4. Perbarui variabel berikut dengan data yang Anda salin:

```typescript
const SUPABASE_URL = 'URL_PROYEK_ANDA_DI_SINI';
const SUPABASE_ANON_KEY = 'ANON_KEY_ANDA_DI_SINI';
```

## 4. Keamanan (Optional tapi Disarankan)
Untuk produksi, pastikan Anda mengatur **Row Level Security (RLS)** pada tabel:
- Untuk tabel `activities`, izinkan `INSERT` untuk publik jika tidak menggunakan autentikasi.
- Untuk tabel `materials`, izinkan `SELECT` untuk publik agar materi bisa dibaca.

## 5. Cek Data Input Pengguna
Setiap kali Anda menyelesaikan kuis atau pengisian jurnal di aplikasi, data akan otomatis tersimpan di tabel `activities`. Anda bisa mengeceknya di menu **Table Editor** pada dashboard Supabase Anda.
