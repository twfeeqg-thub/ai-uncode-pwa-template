// File: app/home/page.tsx (النسخة النهائية والمحدثة)

import config from '../../config.json'; // استيراد ملف الإعدادات الرئيسي
import OffersSection from '@/components/sectors/Clinics/OffersSection'; // استيراد مكون العروض
import ProfileSection from '@/components/sectors/Clinics/ProfileSection'; // <-- 1. استيراد المكون الجديد

export default function HomePage() {
  return (
    // 2. تحديث التنسيق لتكديس المكونات بشكل منظم
    <div dir="rtl" className="w-full bg-background flex flex-col items-center gap-12 py-12">
      
      {/* 3. عرض مكون الملف الشخصي أولاً */}
      {/* التحقق من وجود بيانات القسم قبل محاولة عرضه لزيادة أمان الكود */}
      {config.content.profileSection && (
        <ProfileSection data={config.content.profileSection} />
      )}

      {/* عرض مكون العروض الموجود مسبقًا */}
      {config.content.offersSection && (
        <OffersSection data={config.content.offersSection} />
      )}
      
    </div>
  );
}

