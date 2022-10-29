<template>
  <VLoader v-if="loading" />

  <VPage
      v-else-if="request"
      title="Заявка"
      back
  >
    <p><strong>Имя клиента</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.summ) }}</p>
    <p><strong>Статус</strong>: <VStatus :status="request.status" /></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select
          id="status"
          v-model="status"
          class="_w40"
      >
        <option value="done">Завершен</option>
        <option value="cancelled">Отклонен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <VButton
        color="danger"
        @click="remove"
    >
      Удалить
    </VButton>

    <VButton
        v-if="isStatusChanged"
        @click="update"
    >
      Обновить
    </VButton>
  </VPage>

  <h3 v-else class="text-center text-white">
    Заявка с ID = {{ $route.params.id }} не найдена
  </h3>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted, computed} from "vue";
import {useStore} from "vuex";

import {currency} from "../utils/currency";

import VPage from "../components/ui/VPage";
import VLoader from "../components/ui/VLoader";
import VStatus from "../components/ui/VStatus";

export default {
  name: 'Request',

  components: {
    VPage,
    VLoader,
    VStatus,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loading = ref(true);
    const request = ref({});
    const status = ref()

    onMounted(async () => {
      request.value = await store.dispatch('request/loadById', route.params.id);
      status.value = request.value?.status;
      loading.value = false;
    })

    const isStatusChanged = computed(() => status.value !== request.value?.status)

    const remove = async () => {
      await store.dispatch('request/removeRequest', route.params.id);
      router.push('/');
    }

    const update = async () => {
      const data = {
        ...request.value,
        id: route.params.id,
        status: status.value,
      }

      await store.dispatch('request/updateRequest', data);

      request.value.status = status.value;
    }

    return {
      loading,
      request,
      status,
      isStatusChanged,
      currency,
      remove,
      update,
    }
  }
}
</script>

<style scoped>

</style>
