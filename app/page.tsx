'use client';
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
    </main>
  );
}
