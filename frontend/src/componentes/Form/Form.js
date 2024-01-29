import React, { useContext, useState } from 'react'
import "./css/form.css";
import FormContextProvider, { FormContext } from './context/FormContextProvider';
import useForm from './useForm/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Form = ({ api, action, method = "POST", children, values, ...props }) => {
    const onSubmit = (evt) => {
        evt.preventDefault();
    }

    return (
        <form action={action} method={method} onSubmit={onSubmit} {...props} >
            <FormContextProvider initialValues={values} api={api} action={action} method={method} >
                {children}
            </FormContextProvider>
        </form>
    )
}

const Input = ({ name, type = "text", className = "", ...props }) => {
    const { values, setValueByEvent, errors } = useContext(FormContext);

    return (
        <>
            <input
                type={type}
                name={name}
                value={values[name]}
                onChange={setValueByEvent}
                className={`form-input ${undefined !== errors[name] && "has-error"} ${className}`}
                {...props}
            />
            <small className="text-red-600">{errors[name]}</small>
        </>
    )
}

const InputPrepend = ({ type, name, className = "", prependClassName = "", children, ...props }) => {
    const { values, setValueByEvent, errors } = useContext(FormContext);

    return (
        <>
            <div className="flex items-center">
                <div className={"form-input-prepend " + prependClassName}>
                    {children}
                </div>
                <input type={type} name={name} value={values[name]} onChange={setValueByEvent} className={`form-input-append ${undefined !== errors[name] && "has-error"} ${className}`} {...props} />
            </div>
            <small className="text-red-600">{errors[name]}</small>
        </>
    )
}

const Select = ({ name, className = "", children, ...props }) => {
    const { values, setValueByEvent, errors } = useContext(FormContext);

    return (
        <>
            <select name={name} value={values[name]} onChange={setValueByEvent} className={`form-input ${undefined !== errors[name] && "has-error"} ${className}`} {...props} >
                {children}
            </select>
            <small className="text-red-600">{errors[name]}</small>
        </>
    )
}

const Submit = ({ className = "", children, onSuccess, ...props }) => {
    const { apiData, submit } = useContext(FormContext);
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        setSending(true);
        const response = await submit(apiData.api, apiData.action, apiData.method);
        if (!response) {
            setSending(false);
            return;
        }

        setSending(false);
        onSuccess(response);
    }

    return (
        <button type="button" disabled={sending} onClick={onSubmit} className={"botaoRegister " + className} {...props}>
            {sending ? (
                <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Enviando...
                </>
            ) : (
                <>{children}</>
            )}
        </button>
    )
}

Form.Input = Input;
Form.InputPrepend = InputPrepend;
Form.Select = Select;
Form.Submit = Submit;

export default Form