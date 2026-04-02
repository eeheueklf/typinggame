import keys from '@/features/keyboard/keys'
import QuoteTyping from "@/components/QuoteTyping";
import Keyboard from '@/features/keyboard/Keyboard';
import { QUOTES } from '@/constant/quotes'
import { Suspense } from "react";
import QuoteSkeleton from "@/components/Skeleton/QuoteSkeleton";
import KeyboardSkeleton from "@/components/Skeleton/KeyboardSkeleton";

export default function Home() {

  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = dateSeed % QUOTES.length;
  const quote = QUOTES[index];

  return (
    <div className="flex flex-col ">

      <div className="flex justify-between w-full px-[2px] text-header">
        <h1 className="font-nanum mb-2">
        오늘의 문장
        </h1>
        <h1 className="font-nanum mb-2">
          - {quote.author}
        </h1>
      </div>
      <Suspense fallback={<QuoteSkeleton />}>
        <QuoteTyping lyrics={quote.content} />
      </Suspense>
      <Suspense fallback={<KeyboardSkeleton />}>
        <Keyboard keys={keys} />
      </Suspense>
    </div>
  );
}