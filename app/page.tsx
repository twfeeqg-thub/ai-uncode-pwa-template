// File: app/page.tsx (النسخة المنظفة بعد النقل)

"use client"

// --- بداية التعديلات ---
// 1. استيراد الأيقونات والمكونات الجديدة المطلوبة
import type React from "react"
// هذه الاستيرادات لم تعد ضرورية هنا مباشرة، ولكن سنتركها مؤقتًا
import { useState, useRef, useEffect } from "react"
import { MountainIcon, Download, Copy, Share2, Loader2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QRCodeCanvas } from "qrcode.react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import PhoneInput, { type Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import '../phone-input.css'

// 2. استيراد ملف الاتصال بـ Supabase
import { supabase } from "@/lib/supabaseClient"
// --- نهاية التعديلات ---

// استيراد لوحة التحكم والمساعد الموجه
import config from "../config.json"
import { SmartAmbassadorGuided } from "@/components/ui/SmartAmbassadorGuided"

// =================================================================
// تم نقل جميع مكونات الأقسام إلى مجلد components/common
// =================================================================


// =================================================================
// المحرك الديناميكي
// =================================================================

export default function LandingPage() {
  return (
    <main className="w-full" dir="rtl">
      {config.sections.header.show && <Header data={config.site} />}
      {config.sections.hero.show && <HeroSection data={config.content.hero} />}
      {config.sections.qrCode.show && <QrCodeSection data={config.content.qrCode} />}
      {config.sections.contact.show && <ContactSection data={config.content.contactForm} />}
      {config.sections.footer.show && <Footer data={config.site} />}
      {config.sections.guidedAssistant.show && <SmartAmbassadorGuided config={config.guidedAssistant} />}
    </main>
  )
}
