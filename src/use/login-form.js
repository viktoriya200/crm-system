import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export function useLoginForm() {
    const store = useStore();
    const router = useRouter();
    const PASSWORD_LENGTG = 6;
    const {handleSubmit, isSubmitting, submitCount} = useForm();

    const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Email не может быть пустым')
            .email('Email введен неверно')
    );
    const {value: password, errorMessage: passwordError, handleBlur: passwordBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пароль не может быть пустым')
            .min(PASSWORD_LENGTG, `Длина пароля не может быть короче ${PASSWORD_LENGTG} символов`)
    );

    const manyAttempt = computed(() => submitCount.value >= 3)

    watch(manyAttempt, value => {
        if (value) {
            setTimeout(() => {
                submitCount.value = 0;
            }, 5000)
        }
    })

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values);
            router.push('/');
        } catch (e) {
            //
        }

    });

    return {
        email,
        emailError,
        emailBlur,
        password,
        passwordError,
        passwordBlur,
        onSubmit,
        isSubmitting,
        manyAttempt,
    }
}
