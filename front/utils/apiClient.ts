const apiUrl = process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost/api";

let isRefreshing = false;
let refreshWaiters: Array<() => void> = [];

const waitForRefresh = () =>
  new Promise<void>((resolve) => refreshWaiters.push(resolve));

const notifyRefreshDone = () => {
  refreshWaiters.forEach((r) => r());
  refreshWaiters = [];
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = options.body
    ? { 'Content-Type': 'application/json', ...(options.headers || {}) }
    : { ...(options.headers || {}) };

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    console.log('401 detected on', endpoint);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  return apiClient<{ token: string }>('/api/login_check', {
    method: 'POST',
    body: JSON.stringify({ username: email, password }),
  });
};