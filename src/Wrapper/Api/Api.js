import axios from 'axios';

const getToken = () => {
    const token = localStorage.getItem('_3reFd5-tk780')
    return token
}

const apiUrl = "http://45.153.184.154:9010/api";
const token = getToken();

const authAxios = axios.create({
	baseURL: apiUrl,
	headers: {
		Authorization: `Bearer ${token}`
	}
})
export default authAxios

