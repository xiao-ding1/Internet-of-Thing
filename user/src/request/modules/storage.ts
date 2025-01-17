import { request } from "../request";
export function getInfo() {
    return request.get('/store')
}
export function getcount() {
    return request.get('/store/count')
}