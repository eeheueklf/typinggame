import keys from '@/features/keyboard/keys'
import QuoteTyping from "@/components/QuoteTyping";
import Keyboard from '@/features/keyboard/Keyboard';
import {QUOTES} from '@/constant/quotes'
export default function Home() {

  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = dateSeed % QUOTES.length;
  const quote = QUOTES[index];

  return (
    <div className="flex flex-col ">

      <div className="header">
        <h1 className="title">오늘의 문장</h1>
        <h1 className="title">- {quote.author}</h1>
      </div>
      <div className="mainWrapper">
        <QuoteTyping lyrics={quote.content} />
      </div>
      <Keyboard keys={keys} />
    </div>
  );
}