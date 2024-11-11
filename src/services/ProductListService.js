import httpAxios from "../services/httpAxios";

const ProductListService = {
  index: async () => {
    return await httpAxios.get('product');
  },
  trash: async () => {
    return await httpAxios.get('product/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`product/show/${id}`);
  },
 store: async (data) => {
    return await httpAxios.post('product/store', data);
  },
  update: async (data, id) => {
    return await httpAxios.put(`product/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`product/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`product/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`product/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`product/destroy/${id}`);
  }
};

export default ProductListService;
