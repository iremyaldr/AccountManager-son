import axios from "axios";

// Backend API URL
const baseUrl = "http://localhost:5000/api"; // Adjust to your API base URL

const api = {
  AccountInfo(url = baseUrl + "/accountInfo/") {
    return {
      fetchAll: () => axios.get(url),
      //fetchById: (id) => axios.get(url + id),
      fetchShared: () => axios.get(url + "shared"), 
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
      share: (shareData) => axios.post(url + "share", shareData), // Add this line
    };
  },
};

export default api;
