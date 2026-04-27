export const useAuth = () => {
  const token = useCookie<string | null>('auth_token');
  const user = useState<{ email: string; name: string } | null>('auth_user', () => null);

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const setUser = (userData: { email: string; name: string }) => {
    user.value = userData;
  };

  const clearAuth = () => {
    token.value = null;
    user.value = null;
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    token,
    user,
    setToken,
    setUser,
    clearAuth,
    isAuthenticated,
  };
};