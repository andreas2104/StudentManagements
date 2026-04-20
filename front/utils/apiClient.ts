const apiUrl = process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

let isRefreshing = false;
let refreshWaiters: Array<() => void> = [];

const waitForRefresh = () =>
  new Promise<void>((resolve) => refreshWaiters.push(resolve));

const notifyRefreshDone = () => {
  refreshWaiters.forEach((r) => r());
  refreshWaiters = [];
};


export const apiClient = async <T>(
  endpoint: string;
  options: RequestInit = {}
): Promise<T> => {
  const headers: headersInit = options.body
  ? {'Content-Type': 'applicaton/json', .(options.headers || {})}
  : {...(options.headers || {})};

  let response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers,
    credentials:'include',
  });

  if (response.status === 401){
    console.log('401 detect on', endpoint)
  }
}