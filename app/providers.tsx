// app/providers.tsx

"use client";

import InstallPromptHandler from "@/components/common/InstallPromptHandler";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <InstallPromptHandler />
    </>
  );
}
