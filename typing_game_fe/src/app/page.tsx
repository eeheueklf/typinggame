import keys from '@/components/keyboard/keys'
import Keyboard from '@/components/keyboard/Keyboard';
import { QUOTES } from '@/constant/quotes'
import TypingLayout from '@/components/typing/layout';
import Typing from '@/components/typing/index'
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