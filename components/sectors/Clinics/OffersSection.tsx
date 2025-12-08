// File: components/sectors/Clinics/OffersSection.tsx

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- تعريف الأنواع لضمان سلامة الكود ---
// هذا يضمن أن البيانات القادمة من config.json لها نفس البنية المتوقعة

interface Offer {
  id: string;
  title: string;
  description: string;
  newPrice: string;
  oldPrice?: string; // اختياري
  validUntil: string;
  ctaText: string;
  isFeatured: boolean;
  complianceText?: string; // اختياري
}

interface OffersConfig {
  title: string;
  subtitle: string;
  offers: Offer[];
}

interface OffersSectionProps {
  data: OffersConfig;
}

// --- المكون الرئيسي ---

export default function OffersSection({ data }: OffersSectionProps) {
  // دالة صغيرة للمساعدة في تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        {/* عنوان ووصف القسم */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{data.title}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* شبكة عرض البطاقات */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.offers.map((offer) => (
            <Card key={offer.id} className="flex flex-col relative overflow-hidden">
              {/* شريط "العرض المميز" */}
              {offer.isFeatured && (
                <Badge className="absolute top-4 right-4">عرض مميز</Badge>
              )}
              
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{offer.newPrice}</span>
                  {offer.oldPrice && (
                    <span className="text-lg font-medium text-muted-foreground line-through">
                      {offer.oldPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  صالح حتى: {formatDate(offer.validUntil)}
                </p>
              </CardContent>
              
              <CardFooter className="flex flex-col items-start gap-4">
                <Button className="w-full">{offer.ctaText}</Button>
                {offer.complianceText && (
                  <p className="text-xs text-center w-full text-muted-foreground">
                    {offer.complianceText}
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
