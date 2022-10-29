<template>
  <nav :class="$style.navbar">
    <h3>Crm system</h3>

    <ul :class="$style.item">
      <li>
        <router-link to="/">Заявки</router-link>
      </li>

      <li>
        <router-link to="/help">Помощь</router-link>
      </li>

      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
  name: 'TheNavbar',

  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout');
        router.push('/auth');
      },
    }
  },
}
</script>

<style lang="scss" module>
  .navbar {
    display: flex;
    padding: 0 2rem;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
  }

  .item {
    list-style: none;
    display: flex;

    li {
      margin-right: 2rem;

      a {
        border-bottom: 2px solid transparent;
        color: #2c3e50;
        text-decoration: none;
        transition: border-color .3s ease;

        &:hover,
        &.active {
          border-color: $primary;
        }
      }
    }
  }
</style>
