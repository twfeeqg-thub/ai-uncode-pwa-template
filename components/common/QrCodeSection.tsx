// File: components/common/QrCodeSection.tsx

"use client"; // <-- مهم جدًا لأن المكون يستخدم hooks

import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Share2 } from "lucide-react";

const QrCodeSection = ({ data }: { data: any }) => {
  const [pageUrl, setPageUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  const copyQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        canvas.toBlob(function(blob) {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]).then(() => alert("تم نسخ صورة الـ QR!"));
          }
        });
      }
    }
  };
  
  const shareQRCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'رمز QR',
        text: 'امسح هذا الرمز لتثبيت التطبيق',
        url: pageUrl,
      })
    } else {
      alert("المشاركة غير مدعومة في هذا المتصفح.");
    }
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{data.title}</h2>
            <p className="text-foreground/70 leading-relaxed">{data.description}</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div ref={qrRef} className="border-2 border-border rounded-lg p-4 bg-card">
              {pageUrl ? (
                <QRCodeCanvas
                  value={pageUrl}
                  size={192}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-md" />
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={downloadQRCode} aria-label="تنزيل الرمز">
                <Download className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={copyQRCode} aria-label="نسخ الرمز">
                <Copy className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={shareQRCode} aria-label="مشاركة الرمز">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrCodeSection;
