import axios from "axios";

const axiosRequest = async ({ url }) => {
  return Promise.resolve()
    .then(async () => {
      return axios.get(url).then((resp) => {
        if (resp.status === 200) {
          if (!Array.isArray(resp.data)) {
            return Promise.reject(
              new Error({
                message: `Received invalid data from ${url}`,
              })
            );
          }
          return resp.data;
        } else {
          return Promise.reject(
            new Error({
              message: `Request to ${url} rejected with response code ${resp.status}`,
            })
          );
        }
      });
    })
    .catch((err) => {
      console.warn(`Failed to retreive data from ${url}`, err);
      return Promise.reject(err);
    });
};

export { axiosRequest };
