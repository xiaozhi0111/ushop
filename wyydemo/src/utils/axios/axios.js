import axios from 'axios';

const http = axios.create({
    baseURL:'http://localhost:3000'
});

//拦截
//请求拦截
http.interceptors.request.use(req=>{
    
    return req;
});
//响应拦截
http.interceptors.response.use(res=>{
    return res;
})

export default http;