"use client"

import type React from "react"

import { useState } from "react"
import { MountainIcon, QrCodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "" })
  }

  return (
    <main className="w-full" dir="rtl">
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* الشعار */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">أيكود</span>
            <MountainIcon className="w-6 h-6 text-primary" />
          </div>

          {/* زر التواصل */}
          <Button variant="ghost">تواصل معنا</Button>
        </div>
      </header>

      <section className="w-full bg-gray-900 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tighter text-white mb-6">حوّل عملك مع حزمتنا الرقمية المتكاملة</h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            من موقع ويب مذهل إلى مساعد ذكي، احصل على كل ما تحتاجه للانتقال إلى العالم الرقمي بسرعة.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            احصل على الحزمة الآن
          </Button>
        </div>
      </section>

      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* العمود الأيمن - نص */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">تثبيت تطبيقنا الويب التقدمي</h2>
              <p className="text-foreground/70 leading-relaxed">
                امسح الكود برمز الاستجابة السريعة من خلال كاميرا هاتفك لتثبيت تطبيقنا الخفيف. احصل على إشعارات فورية،
                وأدِر الحجوزات، والوصول إلى العروض الحصرية مباشرة من شاشتك الرئيسية. لا حاجة لمتجر التطبيقات.
              </p>
            </div>

            {/* العمود الأيسر - رمز الاستجابة السريعة */}
            <div className="flex justify-center md:justify-end">
              <div className="border-2 border-border rounded-lg p-6 flex items-center justify-center w-48 h-48 bg-card">
                <QrCodeIcon className="w-24 h-24 text-foreground/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-2xl">هل لديك سؤال؟</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* حقل الاسم */}
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="أدخل اسمك"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* حقل البريد الإلكتروني */}
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full">
                إرسال الرسالة
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <footer className="w-full bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* حقوق الطبع */}
          <p className="text-gray-400">© 2025 أيكود. جميع الحقوق محفوظة.</p>

          {/* روابط التنقل */}
          <nav className="flex gap-4">
            <Button variant="link" className="text-white hover:text-gray-200">
              سياسة الخصوصية
            </Button>
            <Button variant="link" className="text-white hover:text-gray-200">
              شروط الخدمة
            </Button>
          </nav>
        </div>
      </footer>
    </main>
  )
}
