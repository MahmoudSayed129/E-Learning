import axios from 'axios';


axios.interceptors.response.use(null, error => {

})

const http = {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    delete : axios.delete,
}

export default http;