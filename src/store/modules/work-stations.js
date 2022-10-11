import { axiosRequest } from "../helpers";

export default {
  namespaced: true,
  actions: {
    async getWorkStations() {
      return axiosRequest({
        url: "https://ubi-interview.azurewebsites.net/api/orchestrators/workstations",
      });
    },
  },
};
