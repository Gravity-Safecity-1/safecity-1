import axios from 'axios';
import {getToken} from '../utils'

const apiUrl = "http://45.153.184.154:9010/api";
const token = getToken();

const api = axios.create({
	baseURL: apiUrl,
	headers: {
		Authorization: `Bearer ${token}`
	}
})
export default api