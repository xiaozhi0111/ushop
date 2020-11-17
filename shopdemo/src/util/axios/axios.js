
//引入axios核心库。
import axios from 'axios';

import router from '../../router'
//创建一个http实例
const http = axios.create({
    baseURL: '/api'
});
//拦截器
// 请求拦截(一般用于请求头添加信息)
http.interceptors.request.use(req => {
    // console.log(req);
    const userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
    //给请求头添加信息。
    // req.headers.authorization=111
    req.headers.authorization = userInfo.token;
    //返回添加之后的信息。没有return一直被拦截。
    return req;
});
// 响应拦截（一般用于返回部分数据。）
http.interceptors.response.use(res => {
    // console.log(res, '响应拦截');    
    //全局拦截错误之后，跳转到登录。
    if (res.data.code == 302) {
        alert(res.data.msg);
        router.push('/login');
    } else if (res.data.code == 500) {
        alert(res.data.msg);
        router.push('/login');
    } else {
        return res;
    }
})

export default http;