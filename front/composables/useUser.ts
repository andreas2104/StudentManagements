export const useUser = () => {
  const me = useState<any>('me', () => null)
  const loading = ref(false);
  const error = ref<any>(null);


  const fetchMe = async () => {
    loading.value = true
    try {
      const data = await $fetch('/api/me')
      me.value = data
    } catch (err) {
      error.value = err
      me.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    me,
    loading,
    error,
    fetchMe
  }
}