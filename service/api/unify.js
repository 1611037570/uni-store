import request from "../index";

export function getSwiper(params) {
    return request.get({
        url: "/home/swiperdata",
        params,
    });
}
export function getNav(params) {
    return request.get({
        url: "/home/catitems",
        params,
    });
}
export function getFloor(params) {
    return request.get({
        url: "/home/floordata",
        params,
    });
}
