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
    // Dapatkan user yang sedang login
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('activities').insert([
      { 
        step_name: stepName, 
        input_data: data,
        user_name: user?.user_metadata?.full_name || user?.email || 'Ahmad'
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

// ============ FUNGSI AUTENTIKASI ============

/**
 * Mendaftar user baru dengan email dan password
 */
export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error('Gagal mendaftar:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Login user dengan email dan password
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error('Gagal login:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Logout user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Gagal logout:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Reset password - mengirim email reset
 */
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Gagal mengirim email reset:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Update password baru setelah reset
 */
export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Gagal update password:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Mendapatkan user yang sedang login
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (err) {
    console.error('Gagal mendapatkan user:', err);
    return null;
  }
};

/**
 * Listener untuk perubahan status auth
 */
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};