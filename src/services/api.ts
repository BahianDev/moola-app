import axios from "axios";

const api = axios.create({
  baseURL: "https://moola-api-af585bc6e073.herokuapp.com/",
});

export { api };
