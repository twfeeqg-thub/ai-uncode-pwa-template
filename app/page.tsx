// File: app/page.tsx (النسخة النهائية والمحسنة)

"use client";

import config from "../config.json";
import dynamic from 'next/dynamic';

// استيراد ديناميكي للأقسام المشتركة
const Header = dynamic(() => import('@/components/common/Header'));
const HeroSection = dynamic(() => import('@/components/common/HeroSection'));
const QrCodeSection = dynamic(() => import('@/components/common/QrCodeSection'));
const ContactSection = dynamic(() => import('@/components/common/ContactSection'));
const Footer = dynamic(() => import('@/components/common/Footer'));

// --- جديد: استيراد ديناميكي لقسم الخدمات ---
const ServicesSection = dynamic(() => import('@/components/sectors/Clinics/ServicesSection'));

// استيراد المساعد الموجه
const SmartAmbassadorGuided = dynamic(() => 
  import('@/components/ui/SmartAmbassadorGuided').then(mod => mod.SmartAmbassadorGuided)
);

export default function LandingPage() {
  return (
    <main className="w-full" dir="rtl">
      {config.sections.header.show && <Header data={config.site} />}
      {config.sections.hero.show && <HeroSection data={config.content.hero} />}
      
      {/* --- جديد: عرض قسم الخدمات --- */}
      {config.sections.services.show && <ServicesSection data={config.content.servicesSection} />}
      
      {config.sections.qrCode.show && <QrCodeSection data={config.content.qrCode} />}
      {config.sections.contact.show && <ContactSection data={config.content.contactForm} />}
      {config.sections.footer.show && <Footer data={config.site} />}
      {config.sections.guidedAssistant.show && <SmartAmbassadorGuided config={config.guidedAssistant} />}
    </main>
  );
}
