import axios from "axios";
const URL = `${process.env.REACT_APP_API_BASE_URL}`

export function getAllProducts(page, search, limit, category){
	return axios.get(`${URL}/products?page=${page}&limit=${limit}&search=${search}&category=${category}`)
}