import { createClient } from '@supabase/supabase-js'

// قراءة المتغيرات من بيئة العمل (Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// التحقق من وجود المتغيرات لضمان عدم حدوث أخطاء
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are not defined in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
