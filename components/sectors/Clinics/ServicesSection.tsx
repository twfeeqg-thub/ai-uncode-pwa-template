// components/sectors/Clinics/ServicesSection.tsx

import React from 'react';
import Image from 'next/image';

// أولاً: نُعرّف أنواع البيانات (Types) باستخدام TypeScript
// هذا يضمن أن البيانات التي ستأتي من ملف config.json ستكون بالشكل الصحيح
// ويساعد في تجنب الأخطاء أثناء البرمجة.

interface Cta {
  text: string;
  href: string;
}

interface Service {
  name: string;
  description: string;
  imageUrl: string;
  cta: Cta;
}

interface Category {
  categoryName: string;
  services: Service[];
}

interface ServicesSectionProps {
  data: {
    title: string;
    subtitle: string;
    categories: Category[];
  };
}

// ثانياً: هذا هو المكون الفعلي
const ServicesSection: React.FC<ServicesSectionProps> = ({ data }) => {
  // إذا لم تكن هناك بيانات، لا تعرض أي شيء
  if (!data) {
    return null;
  }

  const { title, subtitle, categories } = data;

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* عنوان القسم الرئيسي */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:mt-6">
            {subtitle}
          </p>
        </div>

        {/* حاوية الفئات والخدمات */}
        <div className="mt-12 space-y-16 sm:mt-16">
          {categories.map((category, index) => (
            <div key={index}>
              {/* عنوان الفئة (مثل: خدمات طب الأسنان) */}
              <h3 className="text-2xl font-semibold text-center text-gray-800 md:text-left">
                {category.categoryName}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service, serviceIndex) => (
                  <div key={serviceIndex} className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                    {/* صورة الخدمة */}
                    <div className="relative h-56 w-full">
                      <Image
                        src={service.imageUrl}
                        alt={service.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex flex-col flex-1 p-6">
                      {/* اسم ووصف الخدمة */}
                      <h4 className="text-xl font-bold text-gray-900">{service.name}</h4>
                      <p className="mt-3 text-base text-gray-600 flex-1">{service.description}</p>
                      
                      {/* زر الحجز */}
                      <a
                        href={service.cta.href}
                        title={service.cta.text}
                        className="inline-flex items-center justify-center px-6 py-3 mt-6 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                        role="button"
                      >
                        {service.cta.text}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
