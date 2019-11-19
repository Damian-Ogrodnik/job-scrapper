import axios from "axios";

const URL = "http://localhost:7000";

export default axios.create({
  baseURL: URL
});
