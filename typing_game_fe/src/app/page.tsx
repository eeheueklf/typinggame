import keys from '@/features/keyboard/keys'
import QuoteTyping from "@/features/typing/QuoteTyping";
import Keyboard from '@/features/keyboard/Keyboard';
import { QUOTES } from '@/constant/quotes'
import { Suspense } from "react";
import QuoteSkeleton from "@/features/Skeleton/QuoteSkeleton";
import KeyboardSkeleton from "@/features/Skeleton/KeyboardSkeleton";
import TypingLayout from '@/features/typing/layout';
import Typing from '@/features/typing/index'
export default function Home() {

  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = dateSeed % QUOTES.length;
  const quote = QUOTES[index];

  return (
    <TypingLayout
      title="오늘의 문장"
      subTitle={`- ${quote.author}`}
      keyboard={<Keyboard keys={keys} />}
    >
      <Typing 
        mode="short" 
        data={[quote.content]} 
      />
    </TypingLayout>
  );
}