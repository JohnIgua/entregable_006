import axios from "axios";

const axiosEcommerce = axios.create({
    baseURL: "https://e-commerce-api-v2.academlo.tech/api/v1"
})

export const getConfig = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`,
        /*encad opcional por se vacia userInfo*/
      },
    };
    return config
  }

export default axiosEcommerce