import axios from "axios";

const PORT = process.env.PORT || 7000;
const URL = `http://localhost:${PORT}`;

export default axios.create({
  baseURL: URL
});
