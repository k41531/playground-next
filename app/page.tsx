'use client';
import { useState } from "react";
import Button from "./_components/button";
import InputField from "./_components/input-field";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <main >
      <InputField label="ユーザー名" value={username} onChange={(value: string): void => {
        setUsername(value);
      } } />
      <InputField label="パスワード" type="password" value={password} onChange={(value: string): void => {
        setPassword(value)
      } } />
     <Button label="ログイン" onClick={() => {
        throw new Error("Function not implemented.");
      }}
       disabled={username === "" || password === ""} />
    </main>
  );
}
