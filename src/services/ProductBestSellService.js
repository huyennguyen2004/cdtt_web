import httpAxios from "../services/httpAxios";

const ProductBestSellService = {
  index: async () => {
    return await httpAxios.get('product_bestseller');
  },
  trash: async () => {
    return await httpAxios.get('product_bestseller/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`product_bestseller/show/${id}`);
  },
  create: async (data) => {
    return await httpAxios.post('product_bestseller/store', data);
  },
  update: async (data, id) => {
    return await httpAxios.post(`product_bestseller/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`product_bestseller/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`product_bestseller/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`product_bestseller/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`product_bestseller/destroy/${id}`);
  }
};

export default ProductBestSellService;