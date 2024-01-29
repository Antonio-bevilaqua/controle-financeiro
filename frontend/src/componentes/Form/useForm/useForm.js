import { useState } from "react";
import useApiFetcher from "../../../hooks/useApiFetcher";
import { messages } from "../messages/messages";



const extractObjectFromArray = (array) => {
    let obj = {};
    array.map((val) => {
        obj[val.name] = val.value;
    })
    return obj;
}

const useForm = (initialValues) => {
    const [values, setValues] = useState(extractObjectFromArray(initialValues));
    const [rawValues, setRawValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const fetcher = useApiFetcher();

    const setValueByEvent = (event) => {
        setValueByName(event.target.name, event.target.value);
    }

    const setValueByName = (name, value) => {
        if (undefined === values[name]) return;
        let newErrors = JSON.parse(JSON.stringify(errors));
        let newValues = JSON.parse(JSON.stringify(values));
        let index = rawValues.findIndex((val) => val.name === name);

        if (typeof rawValues[index].mask === "function") {
            value = rawValues[index].mask(value);
        }

        newValues[name] = value;
        validate(name, index, value, newErrors);

        setValues(newValues);
        setErrors(newErrors);
    }

    const submit = async (api, route, method) => {
        if (!validateAll()) {
            console.log("return null");
            return null;
        }

        const response = await fetcher[method.toLowerCase()](
            api,
            route,
            values
        );

        return response;
    }

    const validateAll = () => {
        let newErrors = {};
        let hasError = false;
        rawValues.forEach((value, index) => {
            if (!validate(value.name, index, values[value.name], newErrors)) {
                hasError = true;
            }
        });
        setErrors(newErrors);
        return !hasError;
    }

    const validate = (name, index, value, newErrors = {}) => {
        if (typeof rawValues[index].validation === "function") {
            if (!rawValues[index].validation(value, name)) {
                newErrors[name] = undefined !== rawValues[index].errorMessage ? messages[rawValues[index].errorMessage] : "Campo Inválido";
                return false;
            }

            delete newErrors[name];
        }

        return true;
    }

    return {
        values,
        setValueByEvent,
        setValueByName,
        submit,
        errors
    }

}

export default useForm;