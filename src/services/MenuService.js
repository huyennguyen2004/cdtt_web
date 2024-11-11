import httpAxios from "../services/httpAxios";

const MenuService = {
  index: async (position) => {
    return await httpAxios.get(`menu`);
  },
  trash: async () => {
    return await httpAxios.get('menu/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`menu/show/${id}`);
  },
  insert: async (data) => {
    return await httpAxios.post('menu/insert', data);
  },
  update: async (data, id) => {
    return await httpAxios.post(`menu/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`menu/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`menu/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`menu/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`menu/destroy/${id}`);
  }
};

export default MenuService;