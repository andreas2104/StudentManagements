export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated.value) {
    console.log("[AUTH_CHECK] Already authenticated, redirecting to dashboard", { path: to.path });
    return navigateTo('/dashboard');
  }
});
