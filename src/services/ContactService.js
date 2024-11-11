import httpAxios from "../services/httpAxios";

const ContactService = {
  index: async () => {
    return await httpAxios.get('contact');
  },
  create: async (data) => {
    return await httpAxios.post('contact/store', data); 
  },
  trash: async () => {
    return await httpAxios.get('contact/trash');
  },
  show: async (id) => {
    return await httpAxios.get(`contact/show/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`contact/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`contact/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`contact/destroy/${id}`);
  }
};

export default ContactService;