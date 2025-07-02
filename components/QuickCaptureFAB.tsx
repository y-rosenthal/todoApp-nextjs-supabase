"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";

interface QuickCaptureFABProps {
  onClick: () => void;
}

export function QuickCaptureFAB({ onClick }: QuickCaptureFABProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Quick Capture"
    >
      <LightningBoltIcon className="h-8 w-8" />
    </Button>
  );
}