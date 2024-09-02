import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password } = await request.json();

	if (email === "validuser" && password === "password123") {
		return NextResponse.json({
			token: "fake-jwt-token",
		});
	}

	return NextResponse.json(
		{
			error: "Invalid email or password",
		},
		{ status: 401 },
	);
}
