<template>
  <div v-if="['login', 'error'].includes($route.name)">
    <router-view />
  </div>

  <div v-else>
    <NavBar @logout="logout" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>


<script>
import { provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/navbar/NavBar.vue'
import AuthService from '@/authreq/auth';
import { useSettings } from './initLoader.js'

export default {
  name: 'App',
  components: { NavBar },
  setup() {
    const router = useRouter();
    const { settings, fetchSettings } = useSettings();

    const logout = () => {
      AuthService.logout();
      router.push('/login');
    }

    onMounted(() => {
      fetchSettings();
    });

    provide('settings', settings);

    return {
      logout
    };
  }
}
</script>