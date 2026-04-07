"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage: React.FC = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      await axios.post(
        `${baseUrl}/user`,
        { username, loginId: id, password },
        { withCredentials: true }
      );
      router.push("/login");
    } catch (err) {
      setMessage("회원가입 실패: 서버 에러");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-72 flex items-start gap-5">
        <div className="flex-1 min-w-0">
          <h1 className="mb-5 text-center text-2xl font-nanum">새 계정 만들기</h1>
          
          <form onSubmit={handleSignup}>
            <div className="border border-[#ccc] rounded-[15px] p-2.5 text-sm">
              <input
                className="bg-transparent p-1.5 w-full outline-none border-b border-[#dadada7a] placeholder:text-[#6b6b6bd0] placeholder:text-sm"
                placeholder="닉네임"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="bg-transparent p-1.5 w-full outline-none border-b border-[#dadada7a] placeholder:text-[#6b6b6bd0] placeholder:text-sm"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                className="bg-transparent p-1.5 w-full outline-none placeholder:text-[#6b6b6bd0] placeholder:text-sm"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-5 py-1 w-full border border-black rounded-[9px] cursor-pointer transition-colors duration-200 hover:bg-[--key-fill-red]"
            >
              Sign
            </button>
          </form>

          {message && (
            <p className="mt-2 text-center text-[0.8rem] text-[--auth-beigie-title]">
              {message}
            </p>
          )}

          <div className="mt-3 text-right text-[0.8rem] text-[--typing-line-sub]">
            <a href="/login" className="hover:underline">이미 계정이 있으신가요?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;