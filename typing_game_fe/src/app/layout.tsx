// app/layout.tsx
import "./globals.css";
import NavHeader from "@/components/NavHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col h-screen overflow-hidden">
        <NavHeader />
        <main className="flex-1 flex items-center justify-center w-full relative">
          {children}
        </main>
      </body>
    </html>
  );
}