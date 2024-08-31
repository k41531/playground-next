'use client';
import Button from "./_components/button";
import InputField from "./_components/input-field";

export default function Home() {
  return (
    <main >
      <InputField label="ユーザー名" value={""} onChange={(value: string): void => {
        throw new Error("Function not implemented.");
      } } />
      <InputField label="パスワード" type="password" value={""} onChange={(value: string): void => {
        throw new Error("Function not implemented.");
      } } />
     <Button label="ログイン" onClick={() => {
        throw new Error("Function not implemented.");
      }} />
    </main>
  );
}
