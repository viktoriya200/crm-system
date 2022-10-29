<template>
<div class="filter">
  <div class="form-control">
    <input v-model="name"
           type="text"
           placeholder="Начните вводить имя"
    >
  </div>

  <div class="form-control">
    <select v-model="status">
      <option disabled selected>Выберите статус</option>
      <option value="done">Завершен</option>
      <option value="cancelled">Отклонен</option>
      <option value="active">Активен</option>
      <option value="pending">Выполняется</option>
    </select>
  </div>

  <VButton
      v-if="isActive"
      color="warning"
      @click="reset"
  >
    Сбросить
  </VButton>
</div>
</template>

<script>
import {computed, ref, watch} from "vue";

export default {
  name: 'RequestFilter',

  props: ['modelValue'],

  emits: ['update:modelValue'],

  setup(_, {emit}) {
    const name = ref();
    const status = ref();

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1],
      })
    });

    const isActive = computed(() => name.value || status.value)

    return {
      name,
      status,
      isActive,
      reset: () => {
        name.value = '';
        status.value = '';
      }
    }
  }
}
</script>

<style lang="scss">
.filter {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  & > div {
    margin-right: 2rem;
    width: 30%;
    margin-bottom: 0;
  }
}
</style>
