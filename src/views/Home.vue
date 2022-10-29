<template>
  <VLoader v-if="loading" />

  <VPage
      v-else
      title="Список заявок"
  >
    <template #header>
      <VButton
          @click="showModal = true"
      >
        Создать
      </VButton>
    </template>

    <RequestFilter v-model="filter" />

    <RequestTable :requests="requests" />

    <teleport to="body">
      <VModal
          :open="showModal"
          title="Создать заявку"
          @close="showModal = false"
      >
        <RequestForm @created="showModal = false" />
      </VModal>
    </teleport>
  </VPage>
</template>

<script>
import {computed, ref, onMounted} from 'vue';
import {useStore} from 'vuex';

import VModal from '../components/ui/VModal'
import VPage from '../components/ui/VPage';
import RequestTable from '../components/request/RequestTable';
import RequestForm from '../components/request/RequestForm'
import VLoader from "../components/ui/VLoader";
import RequestFilter from "../components/request/RequestFilter";

export default {
  name: 'Home',

  components: {
    VPage,
    RequestTable,
    VModal,
    RequestForm,
    VLoader,
    RequestFilter,
  },

  setup() {
    const showModal = ref(false);
    const store = useStore();
    const loading = ref(false);
    const filter = ref({})

    const requests = computed(() => store.getters['request/getRequests']
        .filter(request => {
          if(filter.value.name) {
            return request.fio.toLowerCase().includes(filter.value.name.toLowerCase());
          }

          return request;
        })
        .filter(request => {
          if(filter.value.status) {
            return request.status === filter.value.status;
          }

          return request;
        })
    )

    onMounted(async () => {
      loading.value = true;
      await store.dispatch('request/loadRequests');
      loading.value = false;
    })

    return {
      showModal,
      close: () => showModal.value = false,
      requests,
      loading,
      filter,
    }
  }
}
</script>
