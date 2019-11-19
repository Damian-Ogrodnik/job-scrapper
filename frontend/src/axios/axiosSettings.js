import axios from "axios";

const URL = `https://job-scrapper-dogrodnik.herokuapp.com`;

export default axios.create({
  baseURL: URL
});
