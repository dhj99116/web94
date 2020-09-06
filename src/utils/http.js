import axios from 'axios'
import qs from 'qs'
const http=axios.create()
http.interceptors.request.use(function(config){
  let token=localStorage.getItem('token')
  config.data.token=token
    if(!(config.data instanceof FormData)&&config.method==='post'){
        config.data=qs.stringify(config.data)
    }
    return config;
},function(error){
    return Promise.reject(error)
});
http.interceptors.response.use(function(response){
    return response
},function(error){
    return Promise.reject(error)
});
export default http;