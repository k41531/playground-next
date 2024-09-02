"use client";
import { useState } from "react";
import Button from "./_components/button";
import InputField from "./_components/input-field";
import { useRouter } from "next/navigation";
import { login } from "./_repositories/user";

export default function Home() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState< string | null >(null);
	const router = useRouter();
	return (
		<main className="flex flex-col items-center justify-center min-h-screen">
			<div className="grid gap-4">
				<InputField
					label="ユーザー名"
					value={username}
					onChange={(value: string): void => {
						setUsername(value);
					}}
				/>
				<InputField
					label="パスワード"
					type="password"
					value={password}
					onChange={(value: string): void => {
						setPassword(value);
					}}
				/>
			</div>
			<div className="pt-8">
				<Button
					label="ログイン"
					onClick={async () => {
						setIsLoading(true);
						setErrorMessage(null);
						await new Promise((resolve) => setTimeout(resolve, 0));
						login(username, password)
							.then((response) => response.json())
							.then((data) => {
								if (data.error) {
									setErrorMessage(data.error);
								} else {
								  localStorage.setItem("token", data.token);
									router.push("/home");
								}
							})
							.catch((error) => {
								setErrorMessage("サーバーエラーが発生しました。");
							});
						setIsLoading(false);
					}}
					disabled={username === "" || password === "" || isLoading}
				/>
				{isLoading && <p>ローディング...</p>}
				{errorMessage && < p className="text-red-500">{errorMessage}</p >}
			</div>
		</main>
	);
}
