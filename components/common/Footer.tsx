// File: components/common/Footer.tsx (النسخة المصححة)

import Link from "next/link";
import { Button } from "@/components/ui/button";
import config from "@/config.json"; // <-- هذا هو السطر الذي تم إصلاحه

const Footer = ({ data }: { data: any }) => (
  <footer className="w-full bg-gray-900 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-gray-400">{data.copyright}</p>
      <nav className="flex gap-4">
        <Link href={config.site.privacyPolicyLink} passHref>
          <Button variant="link" className="text-white hover:text-gray-200">سياسة الخصوصية</Button>
        </Link>
        <Link href={config.site.termsOfServiceLink} passHref>
          <Button variant="link" className="text-white hover:text-gray-200">شروط الخدمة</Button>
        </Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
