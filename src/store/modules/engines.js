import axios from "axios";

export default {
  namespaced: true,
  actions: {
    async getEngines() {
      return Promise.resolve()
        .then(() => {
          return axios
            .get(
              "https://ubi-engines.azurewebsites.net/api/orchestrators/Engines"
            )
            .then((resp) => {
              if (resp.status === 200) {
                console.warn("ENGINE DATA", resp.data);
                return resp.data;
              } else {
                return Promise.reject(
                  new Error({
                    message: `Request to engines rejected with response code ${resp.status}`
                  })
                );
              }
            });
        })
        .catch((err) => {
          console.warn("Failed to retreive engine data", err);
          return Promise.reject(err);
        });
    }
  }
};
