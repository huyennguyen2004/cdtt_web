import httpAxios from "../services/httpAxios";

const BannerService = {
  index: async () => {
    return await httpAxios.get(`banner`);
  },
  trash: async () => {
    return await httpAxios.get('banner/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`banner/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post('banner/store', data);
  },
  update: async (data, id) => {
    return await httpAxios.put(`banner/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`banner/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`banner/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`banner/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`banner/destroy/${id}`);
  }
};

export default BannerService;