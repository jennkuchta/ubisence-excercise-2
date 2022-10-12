import { axiosRequest } from "../helpers";

export default {
  namespaced: true,
  actions: {
    async getEngines() {
      return axiosRequest({
        url: "https://ubi-engines.azurewebsites.net/api/orchestrators/Engines",
      });
    },
  },
};
