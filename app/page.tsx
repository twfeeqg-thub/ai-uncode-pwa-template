// File: app/page.tsx (النسخة النهائية والمحسنة)

"use client";

import config from "../config.json";
import dynamic from 'next/dynamic';

// استيراد ديناميكي للأقسام المشتركة
// سيتم تحميل كود كل قسم فقط إذا كانت قيمته `show: true` في config.json
const Header = dynamic(() => import('@/components/common/Header'));
const HeroSection = dynamic(() => import('@/components/common/HeroSection'));
const QrCodeSection = dynamic(() => import('@/components/common/QrCodeSection'));
const ContactSection = dynamic(() => import('@/components/common/ContactSection'));
const Footer = dynamic(() => import('@/components/common/Footer'));

// استيراد المساعد الموجه (نفترض أنه موجود في ui كما في الكود الأصلي)
const SmartAmbassadorGuided = dynamic(() => 
  import('@/components/ui/SmartAmbassadorGuided').then(mod => mod.SmartAmbassadorGuided)
);

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
  );
}
