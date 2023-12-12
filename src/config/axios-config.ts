import axios from "axios";

const baseURL = "https://api.github.com";
const Request = axios.create({
  baseURL,
});

export default Request;
