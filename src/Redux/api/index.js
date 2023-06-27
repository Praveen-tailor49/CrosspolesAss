import axios from "axios";
const API = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export const get_User = async () => {
    return await API.get("/users");
}
