<template>
  <component :is="component"
             :class="classes"
             :to="link || null"
             :type="!link ? type : null"
             :disabled="disabled"
             class="btn"
  >
    <slot></slot>
  </component>
</template>

<script>
import {computed} from "vue";

export default {
  name: 'VButton',

  props: {
    /**
     * Для внутренних ссылок (тег router-link)
     */
    link: {
      type: [String, Object],
      default: '',
    },

    /**
     * Меняет тип кнопки
     */
    type: {
      type: String,
      default: 'button',
    },

    /**
     * Определяет классы, которые будут модифицировать цвет
     */
    color: {
      type: String,
      default: 'primary',
      validator(val) {
        return ['primary', 'danger', 'warning'].includes(val);
      }
    },

    /**
     * Очевидно, что это свойство задизейблет кнопку
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const component = computed(() => {
      return props.link ? 'router-link' : 'button';
    })

    const classes = computed(() => {
      return [
        `btn--${props.color}`,
        {
          'is-disabled': props.disabled,
        }
      ];
    })

    return {
      component,
      classes,
    };
  }
}
</script>

<style lang="scss">
.btn {
  position: relative;
  place-content: center;
  place-items: center;
  width: fit-content;
  border-radius: 99px;
  letter-spacing: .05em;
  border: 1px solid transparent;
  text-decoration: none;
  text-transform: uppercase;
  margin-right: 10px;
  padding: 0.5rem 1.5rem;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  transition: all 0.22s;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }

  &:active {
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, .3);
  }

  /* Colors */
  &--primary {
    background: #42b983;
    color: #fff;
    border-color: #42b983;
  }

  &--danger {
    background: $red;
    color: #fff;
    border-color: $red;
  }

  &--warning {
    background: $orange;
    color: #fff;
    border-color: $orange;
  }
  /* End colors */

  &.is-disabled {
    cursor: not-allowed;
    opacity: 1!important;
    background: #eee!important;
    border-color: #ddd!important;
    color: #999!important;
  }
}
</style>
