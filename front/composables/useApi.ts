const config = useRuntimeConfig();

export const useApi = () => {
  const baseURL = config.public.apiBaseUrl || 'http://localhost:5000';

  const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = useState<string | null>('auth_token').value;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  };

  return {
    get: (endpoint: string) => request(endpoint, { method: 'GET' }),
    post: (endpoint: string, data?: any) => request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    put: (endpoint: string, data?: any) => request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
    delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
  };
};