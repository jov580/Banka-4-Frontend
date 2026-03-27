import { bankingApi as api } from '../client';

export const companiesApi = {
  getAll: (params) => api.get('/companies', { params }),
  create: (data) => api.post('/companies', data),
  getById: (id) => api.get(`/companies/${id}`),
  getWorkCodes: () => api.get('/companies/work-codes'),
};
