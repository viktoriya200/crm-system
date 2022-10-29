<template>
  <span :class="['badge', className]">{{ statusText }}</span>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: 'VStatus',

  props: {
    status: {
      type: String,
      required: true,
      validator(val) {
        return ['active', 'cancelled', 'done', 'pending'].includes(val);
      }
    },
  },

  setup(props) {
    const classMap = {
      active: 'primary',
      cancelled: 'danger',
      done: 'primary',
      pending: 'warning',
    }

    const textMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняется',
    }

    const className = ref(classMap[props.status]);
    const statusText = ref(textMap[props.status]);

    watch(props, value => {
      className.value = classMap[value.status];
      statusText.value = textMap[value.status];
    })

    return {
      className,
      statusText,
    }
  }
}
</script>

<style lang="scss">
.badge {
  font-size: 0.8rem;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 0 .5rem;

  &.primary {
    border-color: $primary;
    color: $primary;
  }

  &.danger {
    border-color: $red;
    color: $red;
  }

  &.warning {
    border-color: $orange;
    color: $orange;
  }
}
</style>
