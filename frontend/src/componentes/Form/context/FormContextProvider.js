import React, { useState } from 'react'
import useForm from '../useForm/useForm';

export const FormContext = React.createContext({
  values: null,
  setValueByEvent: () => { },
  setValueByName: () => { },
  submit: async () => { },
  errors: null,
  apiData: {
    api: null,
    action: null,
    method: null,
  },
  setApiData: () => { }
});

const FormContextProvider = ({ initialValues, api, action, method, children }) => {
  const [apiData, setApiData] = useState({
    api: api,
    action: action,
    method: method
  })
  const {
    values,
    setValueByEvent,
    setValueByName,
    submit,
    errors
  } = useForm(initialValues);

  return (
    <FormContext.Provider value={{
      values,
      setValueByEvent,
      setValueByName,
      submit,
      errors,
      apiData,
      setApiData
    }} >
      {children}
    </FormContext.Provider>
  )
}

export default FormContextProvider