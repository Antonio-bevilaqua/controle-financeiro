import axios from 'axios';
import { useContext } from 'react';
import { MessagesContext } from '../contexts/MessagesContextProvider';

const useApiFetcher = () => {
  const { showMessage } = useContext(MessagesContext);
  const apis = {
    'php': "http://localhost:8000",
    'node': "http://localhost:3000"
  };

  const post = async (api, endpoint, data) => {
    apiValidation(api);
    endpoint = endpoint[0] !== '/' ? "/" + endpoint : endpoint;
    try {
      const response = await axios.post(apis[api] + endpoint, data);
      return formatResponse(response);
    } catch (error) {
      showMessage(formatErrors(error));
      return null;
    }
  }

  const get = async (api, endpoint) => {
    apiValidation(api);
    endpoint = endpoint[0] !== '/' ? "/" + endpoint : endpoint;
    try {
      const response = await axios.get(apis[api] + endpoint);
      return formatResponse(response);
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
    return error.response.data.data;
  }

  const formatResponse = (response) => {
    const values = response.data;
    if (values.type !== 'success') {
      showMessage(formatErrors(values.data));
      return null;
    }

    return values.data;
  }

  return { post, get };
}

export default useApiFetcher