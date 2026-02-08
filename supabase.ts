
import { createClient } from '@supabase/supabase-js';

/**
 * PENTING:
 * Ganti URL dan ANON_KEY di bawah ini dengan kredensial dari dashboard Supabase Anda.
 * Detail lengkap lihat di file SETUP.md
 */
const SUPABASE_URL = 'https://hjuwnofbrwqszffwxktr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdXdub2Zicndxc3pmZnd4a3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDQyMDEsImV4cCI6MjA4NjEyMDIwMX0.qed_XuBuQJN9tuIrBNdBMmTAwxRcc8gXYaREiuE54pc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fungsi untuk menyimpan semua data input dari website ke tabel 'activities'
 */
export const saveActivity = async (stepName: string, data: any) => {
  try {
    const { error } = await supabase.from('activities').insert([
      { 
        step_name: stepName, 
        input_data: data,
        user_name: 'Ahmad' // Placeholder, bisa diganti dengan sistem login jika ada
      }
    ]);
    if (error) throw error;
    console.log(`Berhasil menyimpan data untuk tahap: ${stepName}`);
    return { success: true };
  } catch (err) {
    console.error('Gagal menyimpan ke Supabase:', err);
    return { success: false, error: err };
  }
};

/**
 * Fungsi untuk mengambil konten materi yang bisa diubah secara dinamis dari tabel 'materials'
 */
export const fetchMaterial = async (stepKey: string) => {
  try {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .eq('step_key', stepKey)
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn(`Gagal mengambil materi '${stepKey}' dari Supabase. Menggunakan data default lokal.`);
    return null;
  }
};
