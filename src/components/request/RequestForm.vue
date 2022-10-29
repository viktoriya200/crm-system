<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', {invalid: fioError}]">
      <label for="fio">ФИО</label>
      <input
          id="fio"
          v-model="fio"
          type="text"
          @blur="fioBlur"
      >
      <small v-if="fioError">{{ fioError }}</small>
    </div>

    <div :class="['form-control', {invalid: phoneError}]">
      <label for="phone">Телефон</label>
      <input
          id="phone"
          v-model="phone"
          type="number"
          placeholder="+79999999999"
      >
      <small v-if="phoneError">{{ phoneError }}</small>
    </div>

    <div :class="['form-control', {invalid: summError}]">
      <label for="summ">Сумма заявки</label>
      <input
          id="summ"
          v-model.number="summ"
          type="number"
          @blur="summBlur"
      >
      <small v-if="summError">{{ summError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select
          id="status"
          v-model="status"
      >
        <option value="done">Завершен</option>
        <option value="cancelled">Отклонен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <VButton
        :disabled="isSubmitting"
        type="submit"
    >
      Создать
    </VButton>
  </form>
</template>

<script>
import {useRequestForm} from "../../use/request-form";
import {useStore} from "vuex";

export default {
  name: 'RequestForm',

  emits: ['created'],

  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      await store.dispatch('request/create', values);
      emit('created')
    }

    return {
      ...useRequestForm(submit),
    }
  },
}
</script>
