import axios from 'axios';
import { API_ROOT } from 'utilities/constants';

export const fetchBoard = async (id) => {
  const req = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  return req.data;
};

export const updateBoard = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/v1/boards/update/${id}`, data);
  return req.data;
};

export const createColumn = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/columns/create`, data);
  return req.data;
};

export const updateColumn = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/v1/columns/update/${id}`, data);
  return req.data;
};

export const createCard = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/cards/create`, data);
  return req.data;
};
