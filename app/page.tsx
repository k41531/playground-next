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
						await new Promise((resolve) => setTimeout(resolve, 2000));
						login(username, password)
							.then((response) => response.json())
							.then((data) => {
								console.log("ログイン成功");
								localStorage.setItem("token", data.token);
								router.push("/home");
							});
						setIsLoading(false);
					}}
					disabled={username === "" || password === "" || isLoading}
				/>
				{isLoading && <p>ローディング...</p>}
			</div>
		</main>
	);
}
