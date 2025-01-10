import { request } from "../request";
export function getinfo() {
    return request.get('/commodity')
}
export function getininfo() {
    return request.get('/store')
}
export function sendinfo(data: any) {
    return request.post('/commodity',data)
}
export function getcount(){
    return request.get('/store/count')
}