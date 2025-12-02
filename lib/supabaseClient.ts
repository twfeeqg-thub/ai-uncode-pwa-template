import { createClient } from '@supabase/supabase-js'

// استبدل القيم التالية بالقيم الحقيقية من مشروعك في Supabase
const supabaseUrl = https://yjelvixvgnkadjwfmsuj.supabase.co
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZWx2aXh2Z25rYWRqd2Ztc3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NzcyMjEsImV4cCI6MjA4MDE1MzIyMX0.UQu1YqHD-FiJlZuhc8XyPX_CQ6-1XRftY6hb6smIqp4

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
