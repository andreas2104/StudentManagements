export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl || 'http://localhost:8080';

  const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = useState<string | null>('auth_token').value;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as any,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Impossible de se connecter au serveur. Veuillez vérifier que le backend est actif.');
      }
      throw err;
    }
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