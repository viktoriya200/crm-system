import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export function useRequestForm(submitFunction) {
    const {handleSubmit, isSubmitting} = useForm({
        initialValues: {
            status: 'active',
        }
    });

    const {value: fio, errorMessage: fioError, handleBlur: fioBlur} = useField(
        'fio',
        yup
            .string()
            .trim()
            .required('Имя не может быть пустым')
    );
    const {value: phone, errorMessage: phoneError, handleBlur: phoneBlur} = useField(
        'phone',
        yup
            .string()
            .trim()
            .required('Телефон не может быть пустым')
            .matches(/^((\+7|7|8)+([0-9]){10})$/, 'Телефон введен неверно')
            .max(11, 'Телефон введен неверно max')
    );
    const {value: summ, errorMessage: summError, handleBlur: summBlur} = useField(
        'summ',
        yup
            .number()
            .required('Сумма не может быть пустой')
            .min(0, 'Сумма не может быть меньше 0')
    );
    const {value: status} = useField('status');

    const onSubmit = handleSubmit(submitFunction);

    return {
        fio,
        fioError,
        fioBlur,
        phone,
        phoneError,
        phoneBlur,
        summ,
        summError,
        summBlur,
        status,
        onSubmit,
        isSubmitting,
    }
}
