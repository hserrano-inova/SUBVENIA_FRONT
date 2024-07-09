import { ref } from 'vue'
import axios from '@/authreq/axios'

const settings = ref(null)

export function useSettings() {
  const fetchSettings = async () => {
    try {
      const response = await axios.get('/getsettings')
      settings.value = response.data
    } catch (err) {
      console.log(err)
    }
  }

  return { settings, fetchSettings }
}
