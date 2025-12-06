// File: components/common/Header.tsx

import { MountainIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = ({ data }: { data: any }) => (
  <header className="sticky top-0 z-50 bg-background border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{data.name}</span>
        <MountainIcon className="w-6 h-6 text-primary" />
      </div>
      <Button variant="ghost">{data.contactButton}</Button>
    </div>
  </header>
);

export default Header;
