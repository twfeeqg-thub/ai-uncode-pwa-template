"use client"

// --- بداية التعديلات ---
// 1. استيراد الأيقونات والمكونات الجديدة المطلوبة للنموذج الشامل
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MountainIcon, Download, Copy, Share2, Phone, Mail, MessageSquare, Calendar, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QRCodeCanvas } from "qrcode.react"
import { Textarea } from "@/components/ui/textarea" // حقل الرسالة
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // القائمة المنسدلة
import { Checkbox } from "@/components/ui/checkbox" // مربع الموافقة
import Link from "next/link" // للروابط
// --- نهاية التعديلات ---

// استيراد لوحة التحكم والمساعد الموجه
import config from "../config.json"
import { SmartAmbassadorGuided } from "@/components/ui/SmartAmbassadorGuided"

// =================================================================
// مكونات الأقسام المستقلة (Header, Hero, Footer تبقى كما هي)
// =================================================================

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

// مكون QR Code (يبقى كما هو)
const QrCodeSection = ({ data }: { data: any }) => {
  const [pageUrl, setPageUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

// --- بداية إعادة كتابة مكون ContactSection بالكامل ---
const ContactSection = ({ data }: { data: any }) => {
  // حالة لتخزين بيانات النموذج بالكامل
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  // حالة لتتبع الموافقة على الخصوصية
  const [consent, setConsent] = useState(false);

  // دالة عامة لتحديث بيانات النموذج
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // دالة خاصة لتحديث القائمة المنسدلة
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // دالة الإرسال
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert("يجب الموافقة على سياسة الخصوصية أولاً.");
      return;
    }
    // هنا سنضيف لاحقاً الكود لإرسال البيانات إلى Supabase
    console.log("البيانات التي سيتم إرسالها:", {
      form_data: formData,
      consent_given: consent,
      consent_timestamp: new Date().toISOString(),
    });
    alert("تم إرسال النموذج بنجاح (محاكاة).");
  };

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{data.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              {/* عرض حقل الاسم */}
              {data.fields.name.show && (
                <div className="space-y-2">
                  <Label htmlFor="name">{data.fields.name.label}</Label>
                  <Input id="name" name="name" placeholder={data.fields.name.placeholder} onChange={handleInputChange} required={data.fields.name.required} />
                </div>
              )}

              {/* عرض حقل البريد الإلكتروني */}
              {data.fields.email.show && (
                <div className="space-y-2">
                  <Label htmlFor="email">{data.fields.email.label}</Label>
                  <Input id="email" name="email" type="email" placeholder={data.fields.email.placeholder} onChange={handleInputChange} required={data.fields.email.required} />
                </div>
              )}

              {/* عرض حقل رقم الهاتف */}
              {data.fields.phone.show && (
                <div className="space-y-2">
                  <Label htmlFor="phone">{data.fields.phone.label}</Label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-gray-200 border border-r-0 rounded-r-none rounded-l-md text-sm">+966</span>
                    <Input id="phone" name="phone" type="tel" className="rounded-l-none" placeholder={data.fields.phone.placeholder} onChange={handleInputChange} required={data.fields.phone.required} />
                  </div>
                </div>
              )}

              {/* عرض حقل الرسالة */}
              {data.fields.message.show && (
                <div className="space-y-2">
                  <Label htmlFor="message">{data.fields.message.label}</Label>
                  <Textarea id="message" name="message" placeholder={data.fields.message.placeholder} onChange={handleInputChange} required={data.fields.message.required} />
                </div>
              )}

              {/* عرض حقل الخدمة (قائمة منسدلة) */}
              {data.fields.service.show && (
                <div className="space-y-2">
                  <Label htmlFor="service">{data.fields.service.label}</Label>
                  <Select name="service" onValueChange={(value) => handleSelectChange("service", value)}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="اختر خدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.fields.service.options.map((option: string) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* عرض حقل الموعد (كمثال، يمكن تطويره لاحقاً) */}
              {data.fields.appointment.show && (
                <div className="space-y-2">
                  <Label htmlFor="appointment">{data.fields.appointment.label}</Label>
                  <Input id="appointment" name="appointment" type="datetime-local" onChange={handleInputChange} required={data.fields.appointment.required} />
                </div>
              )}

              {/* مربع الموافقة على الخصوصية */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="consent" onCheckedChange={(checked) => setConsent(checked as boolean)} />
                <Label htmlFor="consent" className="text-sm font-normal text-gray-600">
                  {data.consentText.split('[')[0]}
                  <Link href={config.site.privacyPolicyLink} className="underline hover:text-primary">
                    {data.consentText.match(/\[(.*?)\]/)?.[1]}
                  </Link>
                  {data.consentText.split(']')[1]}
                </Label>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full" disabled={!consent}>
              {data.submitButton}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
// --- نهاية إعادة كتابة مكون ContactSection ---

const Footer = ({ data }: { data: any }) => (
  <footer className="w-full bg-gray-900 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-gray-400">{data.copyright}</p>
      <nav className="flex gap-4">
        <Link href={config.site.privacyPolicyLink} passHref>
          <Button variant="link" className="text-white hover:text-gray-200">سياسة الخصوصية</Button>
        </Link>
        <Link href={config.site.termsOfServiceLink} passHref>
          <Button variant="link" className="text-white hover:text-gray-200">شروط الخدمة</Button>
        </Link>
      </nav>
    </div>
  </footer>
)

// =================================================================
// المحرك الديناميكي
// =================================================================

export default function LandingPage() {
  return (
    <main className="w-full" dir="rtl">
      {config.sections.header.show && <Header data={config.site} />}
      {config.sections.hero.show && <HeroSection data={config.content.hero} />}
      {config.sections.qrCode.show && <QrCodeSection data={config.content.qrCode} />}
      
      {/* --- تعديل بسيط هنا لاستخدام `contactForm` بدلاً من `contact` --- */}
      {config.sections.contact.show && <ContactSection data={config.content.contactForm} />}
      
      {config.sections.footer.show && <Footer data={config.site} />}
      {config.sections.guidedAssistant.show && <SmartAmbassadorGuided config={config.guidedAssistant} />}
    </main>
  )
}
