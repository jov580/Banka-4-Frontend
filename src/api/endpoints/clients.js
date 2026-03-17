import api from '../client';

export const clientsApi = {
  getAll: (params) => api.get('/clients', { params }),
  getById: (id)    => api.get(`/clients/${id}`),
};
