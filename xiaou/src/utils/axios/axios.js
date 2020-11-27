import axios from 'axios';

const http = axios.create({
    baseURL: '/api/api'
});
http.interceptors.request.use(req => {
    const userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
    //给请求头添加信息。
    // req.headers.authorization=111
    req.headers.authorization = userInfo.token;
    //返回添加之后的信息。没有return一直被拦截。
    return req;
});
http.interceptors.response.use(res => {
    //全局拦截错误之后，跳转到登录。
    if (res.data.code == 403) {
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