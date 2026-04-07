import "@/app/globals.css";
import NavHeader from "@/components/NavHeader";
import config from "../../typinggame.config.js";

import localFont from 'next/font/local';
const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

const montserrat = localFont({
  src: '../../public/font/Montserrat-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-mont',
});


const libertinus = localFont({
  src: '../../public/font/LibertinusKeyboard-Regular.ttf',
  display: 'swap',
  variable: '--font-liber',
});


export const metadata = {
  title: config.title,      
  description: config.tagline, 
  icons: {
    icon: config.favicon,   
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${montserrat.variable} ${libertinus.variable}`}>
      <body className="font-pretendard flex flex-col h-screen overflow-hidden">
        <NavHeader />
        <main className="flex-1 flex items-center justify-center w-full relative">
          {children}
        </main>
      </body>
    </html>
  );
}