// File: app/home/page.tsx (العودة للحالة المستقرة)

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen bg-background p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">أهلاً بك في تطبيقك</h1>
      <p className="text-lg text-muted-foreground mb-8">هذه هي لوحة التحكم الخاصة بك. هنا ستجد حجوزاتك وعروضك الخاصة.</p>
      <Button>عرض حجوزاتي</Button>
    </div>
  );
}
