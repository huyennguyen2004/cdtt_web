import httpAxios from "../services/httpAxios";

const ProductSaleService = {
  index: async () => {
    return await httpAxios.get('product_sale');
  },
  trash: async () => {
    return await httpAxios.get('product_sale/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`product_sale/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post('product_sale/store', data);
  },
  update: async (data, id) => {
    return await httpAxios.post(`product_sale/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`product_sale/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`product_sale/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`product_sale/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`product_sale/destroy/${id}`);
  }
};

export default ProductSaleService;