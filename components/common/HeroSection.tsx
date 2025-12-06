// File: components/common/HeroSection.tsx

import { Button } from "@/components/ui/button";

const HeroSection = ({ data }: { data: any }) => (
  <section className="w-full bg-gray-900 dark:bg-gray-800 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-bold tracking-tighter text-white mb-6">{data.title}</h1>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{data.subtitle}</p>
      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        {data.ctaButton}
      </Button>
    </div>
  </section>
);

export default HeroSection;
