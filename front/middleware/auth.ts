export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    console.log("[AUTH_CHECK] Not authenticated, redirecting to login", { path: to.path });
    return navigateTo('/login');
  }
});
