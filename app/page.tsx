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
const FaqSection = dynamic(() => import('@/components/common/FaqSection')); // --- جديد

// استيراد ديناميكي للأقسام المتخصصة
const ServicesSection = dynamic(() => import('@/components/sectors/Clinics/ServicesSection'));
const DoctorsSection = dynamic(() => import('@/components/sectors/Clinics/DoctorsSection'));

// استيراد المساعد الموجه
const SmartAmbassadorGuided = dynamic(() => 
  import('@/components/ui/SmartAmbassadorGuided').then(mod => mod.SmartAmbassadorGuided)
);

export default function LandingPage() {
  return (
    <main className="w-full" dir="rtl">
      {config.sections.header.show && <Header data={config.site} />}
      {config.sections.hero.show && <HeroSection data={config.content.hero} />}
      
      {config.sections.services.show && <ServicesSection data={config.content.servicesSection} />}
      {config.sections.doctors.show && <DoctorsSection data={config.content.doctorsSection} />}
      {config.sections.faq.show && <FaqSection data={config.content.faqSection} />} {/* --- جديد */}
      
      {config.sections.qrCode.show && <QrCodeSection data={config.content.qrCode} />}
      {config.sections.contact.show && <ContactSection data={config.content.contactForm} />}
      {config.sections.footer.show && <Footer data={config.site} />}
      {config.sections.guidedAssistant.show && <SmartAmbassadorGuided config={config.guidedAssistant} />}
    </main>
  );
}
