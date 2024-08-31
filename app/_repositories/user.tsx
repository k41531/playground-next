
const BASE_URL = 'https://api.example.com';

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
    return fetchWithHeaders('/user', {
        method: 'GET'
    });
};

export const login = async (email: string, password: string) => {
    return fetchWithHeaders('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
};