
const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';

const fetchWithHeaders = async (url: string, options: RequestInit = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    });
    
    return response;
};

export const getUser = async () => {
    return fetchWithHeaders('/api/user', {
        method: 'GET'
    });
};

export const login = async (email: string, password: string) => {
    return fetchWithHeaders('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
};