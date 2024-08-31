'use client';
import { useState } from "react";
import Button from "./_components/button";
import InputField from "./_components/input-field";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <main >
      <InputField label="ユーザー名" value={username} onChange={(value: string): void => {
        setUsername(value);
      } } />
      <InputField label="パスワード" type="password" value={password} onChange={(value: string): void => {
        setPassword(value)
      } } />
     <Button label="ログイン" onClick={() => {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }}
       disabled={username === "" || password === "" || isLoading} />
       {isLoading && <p>ローディング...</p>}
    </main>
  );
}
