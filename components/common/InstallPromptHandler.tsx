// components/common/InstallPromptHandler.tsx

"use client";

import React, { useState, useEffect } from 'react';

// تعريف نوع مخصص لحدث التثبيت لإرضاء TypeScript
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPromptHandler = () => {
  // حالة لتخزين حدث التثبيت
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  // حالة للتحكم في إظهار وإخفاء اللافتة
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // منع النافذة المنبثقة التلقائية
      event.preventDefault();
      // تخزين الحدث في الحالة لنتمكن من استخدامه لاحقًا
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
      // إظهار اللافتة المخصصة التي صممناها
      setShowBanner(true);
    };

    // إضافة المستمع للحدث
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // تنظيف المستمع عند إزالة المكون من الشاشة (ممارسة جيدة)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []); // المصفوفة الفارغة تضمن أن هذا التأثير يعمل مرة واحدة فقط

  const handleInstallClick = () => {
    if (!installPromptEvent) {
      return;
    }
    // استدعاء نافذة التثبيت الرسمية
    installPromptEvent.prompt();
    // إخفاء اللافتة بعد محاولة التثبيت
    setShowBanner(false);
  };

  const handleDismissClick = () => {
    // إخفاء اللافتة عند الرفض
    setShowBanner(false);
  };

  // إذا لم تكن اللافتة ظاهرة، لا تعرض أي شيء
  if (!showBanner) {
    return null;
  }

  // عرض اللافتة في أسفل الشاشة
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50 flex items-center justify-between animate-slide-up">
      <div className="flex items-center">
        <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        <p className="text-sm md:text-base">تجربة أفضل؟ ثبّت التطبيق على جهازك!</p>
      </div>
      <div className="flex space-x-3" dir="ltr">
        <button
          onClick={handleInstallClick}
          className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          تثبيت
        </button>
        <button
          onClick={handleDismissClick}
          className="px-4 py-2 text-sm font-semibold text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
        >
          لاحقًا
        </button>
      </div>
    </div>
  );
};

// نحتاج إلى تصدير المكون كـ default
export default InstallPromptHandler;
