import axios from 'axios';

const API = async (urlObject, payload, type = '') => {
  const { endpoint, method } = urlObject;
  const url = `${endpoint}${type ? '/' + type : ''}`;
  
  const response = await axios({
    method,
    url,
    data: payload,
  });

  return response;
};

export default API;
