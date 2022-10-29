<template>
  <div class="container">
    <VAlert />

    <router-view />
  </div>
</template>

<script>
import VAlert from '../components/ui/VAlert';

export default {
  name: 'AuthLayout',

  components: {
    VAlert,
  },
}
</script>
