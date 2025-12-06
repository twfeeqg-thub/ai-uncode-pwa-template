// components/common/FaqSection.tsx

"use client"; // هذا المكون تفاعلي، لذا يحتاج أن يكون Client Component

import React, { useState } from 'react';

// تعريف أنواع البيانات (Types)
interface Cta {
  text: string;
  href: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  data: {
    title: string;
    subtitle: string;
    contactCta?: Cta | null;
    faqs: FaqItem[];
  };
}

// مكون فرعي لكل سؤال وجواب (الأكورديون الداخلي)
const FaqAccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-right"
      >
        <span className="text-lg font-semibold text-gray-800">{item.question}</span>
        {/* أيقونة السهم تتغير حسب الحالة */}
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* محتوى الجواب يظهر ويختفي بسلاسة */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}
      >
        <p className="text-base text-gray-600 pr-2">{item.answer}</p>
      </div>
    </div>
   );
};


// المكون الرئيسي للقسم (الأكورديون الخارجي)
const FaqSection: React.FC<FaqSectionProps> = ({ data }) => {
  const [isSectionOpen, setSectionOpen] = useState(false); // حالة فتح وإغلاق القسم كاملاً

  if (!data || !data.faqs || data.faqs.length === 0) {
    return null;
  }

  const { title, subtitle, faqs, contactCta } = data;

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-3xl sm:px-6 lg:px-8">
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
          {/* الشريط العلوي القابل للنقر لفتح وإغلاق القسم */}
          <button
            onClick={() => setSectionOpen(!isSectionOpen)}
            className="flex items-center justify-between w-full p-6 cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
            <svg
              className={`w-6 h-6 text-blue-600 transform transition-transform duration-300 ${isSectionOpen ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* المحتوى القابل للطي (قائمة الأسئلة ) */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isSectionOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="px-6 pb-6">
              <p className="text-lg text-gray-600 border-t border-gray-200 pt-4">{subtitle}</p>
              
              <div className="mt-6 space-y-2">
                {faqs.map((faq, index) => (
                  <FaqAccordionItem key={index} item={faq} />
                ))}
              </div>

              {contactCta && (
                <div className="mt-8 text-center">
                  <a
                    href={contactCta.href}
                    title={contactCta.text}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {contactCta.text}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
