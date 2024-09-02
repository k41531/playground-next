"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Score from "../_components/score";
import { getUser } from "../_repositories/user";
import ButtonIcon from "../_components/button-icon";

export default function HomePage() {
	const router = useRouter();
	const [username, setUsername] = useState<string>("");
	const [score, setScore] = useState(100); // Add state for score

	const minusIcon = (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 11"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>minus</title>
			<rect
				x="40"
				y="0.415253"
				width="10.1695"
				height="40"
				rx="5.08475"
				transform="rotate(90 40 0.415253)"
				fill="currentColor"
			/>
		</svg>
	);
	const plusIcon = (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>plus</title>
			<rect
				x="14.9152"
				y="0.5"
				width="10.1695"
				height="40"
				rx="5.08475"
				fill="currentColor"
			/>
			<rect
				x="40"
				y="15.4153"
				width="10.1695"
				height="40"
				rx="5.08475"
				transform="rotate(90 40 15.4153)"
				fill="currentColor"
			/>
		</svg>
	);

	useEffect(() => {
		// Check if the user is logged in
		const token = localStorage.getItem("token");
		if (!token) {
			// If not logged in, redirect to the login page
			router.push("/");
		}
		// Fetch the user data
		getUser()
			.then((response) => response.json())
			.then((data) => {
				setUsername(data.nickname);
				setScore(data.score);
			})
			.catch((error) => {
				console.error("Failed to fetch user data:", error);
				// If there is an error, redirect to the login page
				router.push("/");
			});
	}, [router]);

	const handleLogout = () => {
		// Clear the token from localStorage
		localStorage.removeItem("token");
		// Redirect to the login page
		router.push("/");
	};

	return (
		<div className="container mx-auto p-4">
			<header className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">ホーム</h1>
				<button
					type="button"
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					ログアウト
				</button>
			</header>
			<p>
				<span className="mb-4">ようこそ！</span>
				<span data-testid="username">{username}</span> <span>さん</span>
			</p>
			<p>
				<span className="mb-4">ログインに成功しました。</span>
			</p>
			<div className="flex flex-col items-center mt-20">
				<Score score={score} /> {/* Use state score */}
				<div className="flex gap-4 mt-4">
					<ButtonIcon
						label="マイナス"
						onClick={() => setScore(score - 1)}
						icon={minusIcon}
					/>
					<ButtonIcon
						label="プラス"
						onClick={() => setScore(score + 1)}
						icon={plusIcon}
					/>
				</div>
			</div>
		</div>
	);
}
