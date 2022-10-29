<template>
  <transition name="alert">
  <div v-if="message"
       :class="['alert', message.type]"
  >
    <h3 v-if="title" class="alert-title">{{ title }}</h3>

    <p>{{ message.value }}</p>

    <span class="alert-close" @click="close">&times;</span>
  </div>
  </transition>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: 'VAlert',

  setup() {
    const store = useStore();
    const TITLE_MAP = {
      primary: 'Успешно',
      warning: 'Внимание',
      danger: 'Ошибка',
    };

    const message = computed(() => store.getters.getMessage);
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : '')

    return {
      title,
      message,
      close: () => store.commit('clearMessage'),
    }
  }
}
</script>

<style lang="scss">
.alert {
  padding: 1rem 1.5rem;
  border-left-width: .5rem;
  border-left-style: solid;
  margin: 1rem 0;
  position: relative;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;

  &.primary {
    border-color: #42b983;
    background-color: #f8f8f8;
  }

  &.danger {
    border-color: $red;
    background-color: #f8f8f8;
  }

  &.warning {
    border-color: $orange;
    background-color: #f8f8f8;
  }

  p {
    color: #222;
    line-height: 1.7;
  }
}

.alert-title {
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: -.4rem;
  color: #222;
}

.alert-close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>

