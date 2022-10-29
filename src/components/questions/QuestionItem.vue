<template>
  <div :class="$style.question"
       @click="$emit('toggle', question.id)"
  >
    <div :class="$style.header">
      <h3 :class="$style.title">
        {{ question.question }}
      </h3>

      <div :class="[$style.icon, {[$style._opened]: isOpen}]">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6L8.15385 11L14 6" stroke="black"/>
        </svg>
      </div>
    </div>

    <VExpander :is-open="isOpen">
      <div :class="$style.body"
      >
        {{ question.answer }}
      </div>
    </VExpander>
  </div>
</template>

<script>
import VExpander from "../ui/VExpander";

export default {
  name: 'QuestionItem',

  components: {
    VExpander,
  },

  emits: ['toggle'],

  props: {
    question: {
      type: Object,
      default: () => {},
    },

    isOpen: {
      type: Boolean,
      default: false,
    },

    activeQuestion: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" module>
.question {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  transition: background .3s ease;

  &:hover {
    cursor: pointer;
    background: #eee;
  }
}

.header {
  display: flex;
  justify-content: space-between;
}

.title {
  margin-right: 1rem;
  font-weight: bold;
}

.icon {
  transition: transform .3s ease;

  &._opened {
    transform: rotate(180deg);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
}

.body {
  padding-top: 1.2rem;
}
</style>
