'use client';
import InputField from "./_components/input-field";

export default function Home() {
  return (
    <main >
      <label htmlFor="username">ユーザー名</label>
      <input id="username" type="text" />
      <InputField value="" onChange={() => {}} />
    </main>
  );
}
