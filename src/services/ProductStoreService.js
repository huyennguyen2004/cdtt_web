import httpAxios from "../services/httpAxios";

const product_storeService = {
  index: async () => {
    return await httpAxios.get('product_store');
  },
  trash: async () => {
    return await httpAxios.get('product_store/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`product_store/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post('product_store/store', data);
  },
  update: async (data, id) => {
    return await httpAxios.post(`product_store/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`product_store/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`product_store/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`product_store/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`product_store/destroy/${id}`);
  }
};

export default product_storeService;