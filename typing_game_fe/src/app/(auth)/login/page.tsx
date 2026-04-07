import React from "react";
import LoginForm from '@/components/auth/login/LoginForm';
import { TyleKeyLogo } from "@/app/(typing)/game/page";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-pretendard bg-gray-50/30">
      <div className="relative w-[400px] flex flex-col items-center p-12">
        
        <TyleKeyLogo />
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-black tracking-tighter mb-2">
            계정 로그인
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            로그인하고 더 많은 기능을 이용해 보세요.
          </p>
        </div>

        <div className="w-full">
          <LoginForm />
          
          <div className="mt-6 text-center">
            <a 
              href="/signup" 
              className="text-[0.85rem] text-gray-400 hover:text-black transition-colors duration-200 font-medium underline underline-offset-4"
            >
              새 계정 만들기
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};