"use client";
import React, { Suspense } from "react";
import QuoteSkeleton from "@/components/Skeleton/QuoteSkeleton";
import KeyboardSkeleton from "@/components/Skeleton/KeyboardSkeleton";

interface TypingLayoutProps {
  title: string;
  subTitle?: string;
  sidebar?: React.ReactNode;
  children: React.ReactNode; 
  keyboard: React.ReactNode; 
}

const TypingLayout = ({ title, subTitle, sidebar, children, keyboard }: TypingLayoutProps) => {
  return (
    <div className="relative flex items-center h-full w-full overflow-hidden justify-center">
      {sidebar && <div className="absolute left-0 top-0 h-full z-20">{sidebar}</div>}

      <div className="flex flex-col w-[--tpg-basic-width]">
        <div className="flex justify-between w-full px-[2px] text-header font-medium font-nanum">
          <h1 className="mb-2">{title}</h1>
          <h1 className="mb-2">{subTitle}</h1>
        </div>

        <div className="w-full">
          <Suspense fallback={<QuoteSkeleton />}>
            {children}
          </Suspense>
        </div>

        <div className="mt-auto">
          <Suspense fallback={<KeyboardSkeleton />}>
            {keyboard}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TypingLayout;