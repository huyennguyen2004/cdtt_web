import httpAxios from "../services/httpAxios";

const UsersService = {
  index: async () => {
    return await httpAxios.get('users');
  },
  trash: async () => {
    return await httpAxios.get('users/trash');
  },
  store: async (data) => {
    return await httpAxios.post('users/store',data);
  },
  show: async (id) => { 
    return await httpAxios.get(`users/show/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`users/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`users/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`users/destroy/${id}`);
  }
};

export default UsersService;