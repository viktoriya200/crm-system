<template>
  <h3 v-if="requests.length === 0"
      :class="$style.empty"
      class="text-center"
  >
    Заявок пока нет
  </h3>

  <table v-else :class="$style.table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, index) in requests"
          :key="request.id"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ request.fio }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ currency(request.summ) }}</td>
        <td>
          <VStatus
              :status="request.status"
          />
        </td>
        <td>
            <VButton
                :link="{name: 'Request', params: {id: request.id}}"
            >
              Открыть
            </VButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {currency} from "../../utils/currency";
import VStatus from "../ui/VStatus";

export default {
  name: 'RequestTable',

  components: {
    VStatus,
  },

  props: {
    requests: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    return {currency}
  }
}
</script>

<style lang="scss" module>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
}

.table {
  width: 100%;
  border-collapse: collapse;

  th {
    padding: .5rem 1rem;
  }

  td {
    padding: 1rem;
  }

  tbody td {
    text-align: center;
  }

  tbody tr {
    transition: background-color .3s ease;

    &:hover {
      background: #eee;
    }
  }
}
</style>
