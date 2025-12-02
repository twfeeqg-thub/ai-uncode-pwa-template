"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react" // 1. إضافة useRef و useEffect
import { MountainIcon, Download, Copy, Share2 } from "lucide-react" // 2. استبدال أيقونة QR بأيقونات الأزرار
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QRCodeCanvas } from "qrcode.react" // 3. استيراد مكتبة QR Code

// استيراد لوحة التحكم والمساعد الموجه
import config from "../config.json"
import { SmartAmbassadorGuided } from "@/components/ui/SmartAmbassadorGuided"

// =================================================================
// مكونات الأقسام المستقلة
// =================================================================

// مكون الهيدر (يبقى كما هو)
const Header = ({ data }: { data: any }) => (
  <header className="sticky top-0 z-50 bg-background border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{data.name}</span>
        <MountainIcon className="w-6 h-6 text-primary" />
      </div>
      <Button variant="ghost">{data.contactButton}</Button>
    </div>
  </header>
)

// مكون قسم الهيرو (يبقى كما هو)
const HeroSection = ({ data }: { data: any }) => (
  <section className="w-full bg-gray-900 dark:bg-gray-800 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-bold tracking-tighter text-white mb-6">{data.title}</h1>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{data.subtitle}</p>
      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        {data.ctaButton}
      </Button>
    </div>
  </section>
)

// --- بداية التعديل الجذري على مكون QR Code ---
const QrCodeSection = ({ data }: { data: any }) => {
  const [pageUrl, setPageUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // التأكد من أن الكود يعمل فقط في المتصفح
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  const copyQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        canvas.toBlob(function(blob) {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]).then(() => alert("تم نسخ صورة الـ QR!"));
          }
        });
      }
    }
  };
  
  const shareQRCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'رمز QR',
        text: 'امسح هذا الرمز لتثبيت التطبيق',
        url: pageUrl,
      })
    } else {
      alert("المشاركة غير مدعومة في هذا المتصفح.");
    }
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{data.title}</h2>
            <p className="text-foreground/70 leading-relaxed">{data.description}</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div ref={qrRef} className="border-2 border-border rounded-lg p-4 bg-card">
              {pageUrl ? (
                <QRCodeCanvas
                  value={pageUrl}
                  size={192}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-md" />
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={downloadQRCode} aria-label="تنزيل الرمز">
                <Download className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={copyQRCode} aria-label="نسخ الرمز">
                <Copy className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={shareQRCode} aria-label="مشاركة الرمز">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// --- نهاية التعديل الجذري ---


// مكون قسم التواصل (يبقى كما هو)
const ContactSection = ({ data }: { data: any }) => {
  const [formData, setFormData] = useState({ name: "", email: "" })
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
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{data.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{data.nameLabel}</Label>
                <Input id="name" name="name" placeholder={data.namePlaceholder} value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{data.emailLabel}</Label>
                <Input id="email" name="email" type="email" placeholder={data.emailPlaceholder} value={formData.email} onChange={handleInputChange} required />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">{data.submitButton}</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

// مكون التذييل (يبقى كما هو)
const Footer = ({ data }: { data: any }) => (
  <footer className="w-full bg-gray-900 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-gray-400">{data.copyright}</p>
      <nav className="flex gap-4">
        <Button variant="link" className="text-white hover:text-gray-200">سياسة الخصوصية</Button>
        <Button variant="link" className="text-white hover:text-gray-200">شروط الخدمة</Button>
      </nav>
    </div>
  </footer>
)

// =================================================================
// المحرك الديناميكي (يبقى كما هو)
// =================================================================

export default function LandingPage() {
  return (
    <main className="w-full" dir="rtl">
      {config.sections.header.show && <Header data={config.site} />}
      {config.sections.hero.show && <HeroSection data={config.content.hero} />}
      {config.sections.qrCode.show && <QrCodeSection data={config.content.qrCode} />}
      {config.sections.contact.show && <ContactSection data={config.content.contact} />}
      {config.sections.footer.show && <Footer data={config.site} />}
      
      {config.sections.guidedAssistant.show && <SmartAmbassadorGuided config={config.guidedAssistant} />}
    </main>
  )
}
