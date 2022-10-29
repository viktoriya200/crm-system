<template>
  <form
      @submit.prevent="onSubmit"
      class="card"
  >
    <h1>Войти в систему</h1>

    <div :class="['form-control', {'invalid': emailError}]">
      <label for="email">Email</label>
      <input id="email"
             type="email"
             v-model="email"
             @blur="emailBlur"
      />

      <small v-if="emailError">{{ emailError }}</small>
    </div>

    <div :class="['form-control', {'invalid': passwordError}]">
      <label for="password">Пароль</label>
      <input id="password"
             type="password"
             autocomplete="on"
             v-model="password"
             @blur="passwordBlur"
      />

      <small v-if="passwordError">{{ passwordError }}</small>
    </div>

    <VButton
        type="submit"
        :disabled="isSubmitting || manyAttempt"
    >
      Войти
    </VButton>

    <p v-if="manyAttempt"
          class="text-danger"
    >
      Слишком много попыток входа
      Попробуйте позже
    </p>
  </form>
</template>

<script>
import {useLoginForm} from '../use/login-form';
import {useRoute} from 'vue-router';
import {useStore} from "vuex";
import {error} from "../utils/error";

export default {
  name: 'Auth',

  setup() {
    const route = useRoute();
    const store = useStore();

    if(route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning',
      })
    }

    return {...useLoginForm()}
  }
}
</script>
