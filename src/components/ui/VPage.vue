<template>
<div class="card">
  <div v-if="back" class="breadcrumbs">
    <router-link to="/">Вернуться к списку заявок</router-link>
  </div>

  <h1 class="card-title">
    {{ title }}
    <slot name="header"></slot>
  </h1>

  <slot />
</div>
</template>

<script>
export default {
  name: 'VPage',

  props: {
    title: {
      type: String,
      required: true,
    },

    back: {
      type: Boolean,
      default: false,
    }
  },

  setup(props) {
    document.title = `${props.title} | Crm system`;
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  margin-bottom: .5rem;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
