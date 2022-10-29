<template>
  <VPage
      title="Популярные вопросы"
      back
  >

    <QuestionItem
        v-for="question in questions"
        :key="question.id"
        :question="question"
        :active-question="activeQuestion"
        :is-open="question.id === activeQuestion"
        @toggle="onQuestionClick"
    />
  </VPage>
</template>

<script>
import {ref} from "vue";

  import VPage from "../components/ui/VPage";
  import QuestionItem from "../components/questions/QuestionItem";

  export default {
    name: 'Help',

    components: {
      VPage,
      QuestionItem,
    },

    setup() {
      const activeQuestion = ref(0);
      const questions = [
        {
          id: 1,
          question: 'Могу ли я вручную добавить заявку?',
          answer: 'Да, вы можете это сделать, нажав кнопку "Создать" на странице заявок',
        },
        {
          id: 2,
          question: 'Могу ли я удалить заявку',
          answer: 'Да, можете. Для этого вам нужно открыть детальную старницу заявки и нажать кнопку "Удалить"',
        },
        {
          id: 3,
          question: 'Куда можно обратиться если возникла проблема в системе',
          answer: 'Вы можете написать нам на почту: test_email@mail.ru',
        },
      ];

      const onQuestionClick = (id) => {
        activeQuestion.value = activeQuestion.value === id ? 0 : id;
      }

      return {
        questions,
        activeQuestion,
        onQuestionClick,
      }
    }
  }
</script>
