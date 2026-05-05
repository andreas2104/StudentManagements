export const useAuth = () => {
  const token = useCookie<string | null>('auth_token');
  const user = useState<{ email: string; name: string; roles?: string[] } | null>('auth_user', () => null);

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const setUser = (userData: { email: string; name: string; roles?: string[] }) => {
    user.value = userData;
  };

  const fetchUser = async () => {
    if (!token.value) return;
    try {
      const { get } = useApi();
      const userData = await get('/api/users/me');
      setUser(userData);
    } catch (e) {
      console.error('Failed to fetch user:', e);
    }
  };

  const isAdmin = computed(() => {
    return user.value?.roles?.includes('ROLE_ADMIN') ?? false;
  });

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
    fetchUser,
    isAdmin,
    clearAuth,
    isAuthenticated,
  };
};