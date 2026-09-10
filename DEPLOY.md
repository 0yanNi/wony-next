# Deploy cepat

1. Buat repository GitHub baru bernama `wony-next`.
2. Upload seluruh isi folder proyek ini ke root repository, bukan ZIP-nya.
3. Di Supabase SQL Editor, jalankan `supabase/schema.sql`, lalu `supabase/seed.sql`.
4. Di Supabase Authentication > Providers > Email: aktifkan Email dan matikan Confirm email.
5. Di Vercel pilih Add New > Project > import `wony-next`.
6. Framework akan terdeteksi sebagai Next.js.
7. Tambahkan Environment Variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
8. Deploy.
9. Daftar melalui `/register`, lalu promosikan owner memakai SQL dari README.

Jangan unggah `.env.local`, database password, atau service-role key ke GitHub.
