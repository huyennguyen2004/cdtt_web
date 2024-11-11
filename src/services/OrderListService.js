import httpAxios from "../services/httpAxios";

const OrderListService = {
  index: async () => {
    return await httpAxios.get('order');
  },
  trash: async () => {
    return await httpAxios.get('order/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`order/show/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`order/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`order/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`order/destroy/${id}`);
  }
};

export default OrderListService;
