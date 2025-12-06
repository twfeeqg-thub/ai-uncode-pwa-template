// components/sectors/Clinics/DoctorsSection.tsx

import React from 'react';
import Image from 'next/image';

// أولاً: تعريف أنواع البيانات (Types) باستخدام TypeScript
// هذا يضمن تطابق البيانات القادمة من config.json مع ما يتوقعه المكون.

interface Cta {
  text: string;
  href: string;
}

interface Doctor {
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  experience?: string | null;
  profileUrl?: Cta | null;
  bookingCta?: Cta | null;
}

interface DoctorsSectionProps {
  data: {
    title: string;
    subtitle: string;
    doctors: Doctor[];
  };
}

// ثانياً: هذا هو المكون الفعلي
const DoctorsSection: React.FC<DoctorsSectionProps> = ({ data }) => {
  // إذا لم تكن هناك بيانات، لا تعرض أي شيء
  if (!data || !data.doctors || data.doctors.length === 0) {
    return null;
  }

  const { title, subtitle, doctors } = data;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* عنوان القسم الرئيسي */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:mt-6 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* حاوية بطاقات الأطباء */}
        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
          {doctors.map((doctor, index) => (
            <div key={index} className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              {/* صورة الطبيب */}
              <div className="relative h-64 w-full">
                <Image
                  src={doctor.imageUrl}
                  alt={`صورة الدكتور ${doctor.name}`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top" // للتركيز على الوجه
                />
              </div>
              
              <div className="flex flex-col flex-1 p-6">
                {/* الاسم والتخصص */}
                <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                <p className="mt-1 text-md font-semibold text-blue-600">{doctor.specialty}</p>
                
                {/* سنوات الخبرة (إن وجدت) */}
                {doctor.experience && (
                  <p className="mt-3 text-sm text-gray-500">{doctor.experience}</p>
                )}

                {/* النبذة التعريفية */}
                <p className="mt-4 text-base text-gray-700 flex-1">{doctor.bio}</p>
                
                {/* الأزرار */}
                <div className="mt-6 space-y-3">
                  {doctor.bookingCta && (
                    <a
                      href={doctor.bookingCta.href}
                      title={doctor.bookingCta.text}
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                      role="button"
                    >
                      {doctor.bookingCta.text}
                    </a>
                  )}
                  {doctor.profileUrl && (
                     <a
                      href={doctor.profileUrl.href}
                      title={doctor.profileUrl.text}
                      target="_blank" // لفتح الرابط في نافذة جديدة
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-gray-800 bg-transparent border border-gray-300 rounded-md hover:bg-gray-100 transition-all"
                      role="button"
                    >
                      {doctor.profileUrl.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
