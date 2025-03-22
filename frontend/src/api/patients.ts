import axios, { AxiosResponse } from 'axios';
import { Patient, PaginatedResponse } from '../types/patient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPatients = async (
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<Patient>> => {
  const response: AxiosResponse<PaginatedResponse<Patient>> = await api.get(
    `/patients/paginated?page=${page}&per_page=${perPage}`
  );
  return response.data;
};

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export const createPatient = async (formData: FormData): Promise<Patient> => {

  const newFormData = new FormData();
  formData.forEach((value, key) => {
    newFormData.append(camelToSnake(key), value);
  });
  const response = await api.post('/patients', newFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getPatientPhoto = async (patientId: number): Promise<string> => {
  const response = await api.get(`/patients/${patientId}/photo`);
  return response.data.url;
};