const TOKEN_KEY = 'auth_token';

export const useAuth = () => {
  const token = useState<string | null>('auth_token', () => null);
  const user = useState<{ email: string; name: string } | null>('auth_user', () => null);

  const setToken = (newToken: string) => {
    if (import.meta.client) {
      localStorage.setItem(TOKEN_KEY, newToken);
    }
    token.value = newToken;
  };

  const setUser = (userData: { email: string; name: string }) => {
    user.value = userData;
  };

  const clearAuth = () => {
    if (import.meta.client) {
      localStorage.removeItem(TOKEN_KEY);
    }
    token.value = null;
    user.value = null;
  };

  const isAuthenticated = computed(() => !!token.value);

  if (import.meta.client) {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      token.value = stored;
    }
  }

  return {
    token,
    user,
    setToken,
    setUser,
    clearAuth,
    isAuthenticated,
  };
};