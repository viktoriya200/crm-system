<template>
  <transition name="fade"
              duration="500"
              @before-enter="lockBody"
              @after-leave="unlockBody">
    <div v-if="open">
      <div :class="$style.backdrop" @click="$emit('close')"></div>
      <div :class="$style.modal">
        <h3 v-if="title" :class="$style.title">{{ title }}</h3>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import {lockBody, unlockBody} from '@/assets/js/utils';

export default {
  name: 'VModal',

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: '',
    },
  },

  emits: ['close'],

  setup() {
    return {
      lockBody,
      unlockBody,
    }
  }
}
</script>

<style lang="scss" module>
.modal {
  position: fixed;
  top: 60px;
  left: 50%;
  z-index: 1000;
  width: 600px;
  padding: 1rem;
  border-radius: 10px;
  background: #fff;
  transform: translateX(-50%);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
}

.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, .35);
}

.title {
  margin-bottom: 1rem;
}
</style>
