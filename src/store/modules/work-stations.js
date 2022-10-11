import axios from "axios";

export default {
  namespaced: true,
  actions: {
    async getWorkStations() {
      return Promise.resolve()
        .then(() => {
          return axios
            .get(
              "https://ubi-interview.azurewebsites.net/api/orchestrators/workstations"
            )
            .then((resp) => {
              if (resp.status === 200) {
                return resp.data;
              } else {
                return Promise.reject(
                  new Error({
                    message: `Request to workstations rejected with response code ${resp.status}`
                  })
                );
              }
            });
        })
        .catch((err) => {
          console.warn("Failed to retreive workstation data", err);
          return Promise.reject(err);
        });
    }
  }
};
