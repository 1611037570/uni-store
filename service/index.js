import XyRequest from "./request";

const request = new XyRequest({
    baseURL: "https://api-hmugo-web.itheima.net/api/public/v1",
    timeout: 10000,
    headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
    },
    interceptors: {
        requestInterceptor: (config) => {
            // if (token) {
            // }
            // console.log("请求成功")
            return config;
        },
        requestInterceptorCatch: (err) => {
            console.log("请求失败", err);
            return err;
        },
        responseInterceptor: (res) => {
            console.log("响应成功");
            return res.data;
        },
        responseInterceptorCatch: (err) => {
            console.log("响应失败", err);
            return err;
        },
    },
});
export default request;
