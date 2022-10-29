<template>
  <div ref="expander"
       :class="[$style.expander, {'_hidden': !isOpen ,'_changing': changing}]"
  >
    <slot></slot>
  </div>
</template>

<script>
import gsap from 'gsap';
import {onMounted, ref, watch} from "vue";

export default {
  name: 'VExpander',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },

    duration: {
      type: Number,
      default: 0.3
    },

    enterDelay: {
      type: Number,
      default: 0
    },

    leaveDelay: {
      type: Number,
      default: 0
    },

    ease: {
      type: String,
      default: 'power1.out',
    }
  },

  setup(props) {
    const expander = ref(null);
    const changing = ref(false);

    onMounted(() => {
      expander.value.style.height = props.isOpen ? 'auto' : 0;
    })

    watch(() => props.isOpen, (value) => {
      changing.value = true;

      if (value) {
        gsap.to(expander.value, {
          duration: props.duration,
          delay: props.enterDelay,
          height: 'auto',
          ease: props.ease,
          onComplete: () => {
            changing.value = false;
          }
        });
      } else {
        gsap.to(expander.value, {
          duration: props.duration,
          delay: props.leaveDelay,
          height: 0,
          ease: props.ease,
          onComplete: () => {
            changing.value = false;
          }
        });
      }
    });

    return {
      changing,
      expander,
    };
  },
}
</script>

<style lang="scss" module>
.expander {
  &:global(._changing),
  &:global(._hidden) {
    overflow: hidden;
  }
}
</style>
