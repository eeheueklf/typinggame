// app/layout.tsx
import "./globals.css";
import NavHeader from "@/components/NavHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <NavHeader />
        <div className="flex-1 flex items-center justify-center w-full">
          {children}
        </div>
      </body>
    </html>
  );
}