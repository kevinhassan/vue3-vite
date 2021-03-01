import { ref } from 'vue'

export default function useApi(getResult) {
  const query = ref('')
  const result = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function callAPI() {
    loading.value = true
    error.value = null
    try {
      result.value = await getResult(query.value)
    } catch (catchedError){
      error.value = catchedError
    } finally {
      loading.value = false
    }
  }

  return { query, result, loading, error, callAPI }
}
