// login
export const login = async (email: string, password: string) => {
    // Fetch API を使用してログインAPIにリクエストを送信
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    
    return response
};