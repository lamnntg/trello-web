import axios from 'axios';
import { API_ROOT } from 'utilities/constants';

export const fetchApi = async (id) => {
  const req = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  return req.data;
};
