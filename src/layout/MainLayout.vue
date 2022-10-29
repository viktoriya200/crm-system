<template>
  <TheNavbar />

  <div class="container with-nav">
    <VAlert />

    <router-view />
  </div>
</template>

<script>
import TheNavbar from './../components/TheNavbar';
import VAlert from '../components/ui/VAlert';

export default {
  name: 'MainLayout',

  components: {
    TheNavbar,
    VAlert,
  },
}
</script>

<style scoped>

</style>
