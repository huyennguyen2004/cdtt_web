import httpAxios from "../services/httpAxios";

const TopicService = {
  index: async () => {
    return await httpAxios.get('topic');
  },
  trash: async (id) => {
    return await httpAxios.get(`topic/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`topic/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post('topic/store', data);
  },
  update: async (data, id) => {
    return await httpAxios.put(`topic/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`topic/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`topic/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`topic/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`topic/destroy/${id}`);
  }
};

export default TopicService;