// File: app/home/page.tsx (النسخة النهائية)

import config from '../../config.json'; // استيراد ملف الإعدادات الرئيسي
import OffersSection from '@/components/sectors/Clinics/OffersSection'; // استيراد مكون العروض

export default function HomePage() {
  return (
    <div dir="rtl" className="w-full bg-background">
      {/* 
        هنا يمكننا إضافة مكونات أخرى في المستقبل، مثل لوحة تحكم المستخدم أو رسالة ترحيب.
        حالياً، سنعرض قسم العروض مباشرة.
      */}

      {/* التحقق من وجود بيانات القسم قبل محاولة عرضه لزيادة أمان الكود */}
      {config.content.offersSection && (
        <OffersSection data={config.content.offersSection} />
      )}

      {/* يمكنك إضافة أقسام أخرى هنا في المستقبل */}
      {/* مثال: <MyUpcomingAppointments /> */}
      
    </div>
  );
}
