import axios from 'axios';
import { useContext } from 'react';
import { MessagesContext } from '../contexts/MessagesContextProvider';

const useApiFetcher = () => {
  const { showMessage } = useContext(MessagesContext);
  const apis = {
    'php': "http://localhost:8000",
    'node': "http://localhost:3333"
  };

  const post = async (api, endpoint, data, returnErrors = false) => {
    apiValidation(api);
    endpoint = endpoint[0] !== '/' ? "/" + endpoint : endpoint;
    try {
      const response = await axios.post(apis[api] + endpoint, data);
      return formatResponse(response, returnErrors);
    } catch (error) {
      showMessage(formatErrors(error));
      return null;
    }
  }

  const get = async (api, endpoint, returnErrors = false) => {
    apiValidation(api);
    endpoint = endpoint[0] !== '/' ? "/" + endpoint : endpoint;
    try {
      const response = await axios.get(apis[api] + endpoint);
      return formatResponse(response, returnErrors);
    } catch (error) {
      showMessage(formatErrors(error));
      return null;
    }
  }

  const apiValidation = (api) => {
    if (api !== 'php' && api !== 'node') {
      throw Error("Api deve ser um dos valores: 'php', 'node'");
    }
  }


  const formatErrors = (error) => {
    
    return error.response?.data?.data ?? error;
  }

  const formatResponse = (response, returnErrors = false) => {
    const values = response.data;
    if (values.type !== 'success') {
      if (returnErrors) return values;
      showMessage(formatErrors(values.data));
      return null;
    }

    return values.data;
  }

  return { post, get };
}

export default useApiFetcher