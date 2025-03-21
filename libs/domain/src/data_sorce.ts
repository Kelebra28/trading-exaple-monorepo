import { HttpClient } from '@monorepo/utils';
import axios from 'axios';

export const axiosClient: HttpClient = {
  get: async <T>(url: string) => {
    const response = await axios.get<T>(url);
    return { data: response.data };
  },
};