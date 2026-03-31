// app/layout.tsx
import "./globals.css";
import NavHeader from "@/components/NavHeader";

import localFont from 'next/font/local';

const montserrat = localFont({
  src: '../../public/font/Montserrat-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-mont',
});

const nanumHuman = localFont({
  src: '../../public/font/NanumHumanRegular.woff',
  display: 'swap',
  variable: '--font-nanum',
});

const libertinus = localFont({
  src: '../../public/font/LibertinusKeyboard-Regular.ttf',
  display: 'swap',
  variable: '--font-liber',
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${montserrat.variable} ${nanumHuman.variable} ${libertinus.variable}`}>
      <body className="flex flex-col h-screen overflow-hidden">
        <NavHeader />
        <main className="flex-1 flex items-center justify-center w-full relative">
          {children}
        </main>
      </body>
    </html>
  );
}