import axios from "axios";

const instance = axios.create({
  baseURL: "http://18.221.51.168:8080/",
});

export default instance;
