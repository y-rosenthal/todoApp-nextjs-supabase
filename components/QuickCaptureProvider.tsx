"use client";

import * as React from "react";
import { QuickCapture } from "./QuickCapture";
import { QuickCaptureFAB } from "./QuickCaptureFAB";

export function QuickCaptureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {children}
      <QuickCapture isOpen={isOpen} onOpenChange={setIsOpen} />
      <QuickCaptureFAB onClick={() => setIsOpen(true)} />
    </>
  );
}