import axios from "axios";
import { base_url } from "../helper/config";

const generateCode = () => {
  return axios
    .get(`${base_url}/generator`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

const getReport = () => {
  return axios
    .get(`${base_url}/report`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export { generateCode, getReport };
