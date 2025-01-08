import { request } from "../request";
export function sendTemperature(min: number,max: number) {
    const url = `/frame/temperature/${min}/${max}`
    return request.get(url)
}
export function sendWet(min: number,max: number){
    const url = `/frame/humidity/${min}/${max}`
    return request.get(url)
}
export function sendSunray(min: number){
    const url = `/frame/ray/${min}`
    return request.get(url)
}
export function sendCloseTime(data:string){
    const requestData = {
        closeTime: data 
    }
    const res = request.post('/frame/ray',requestData)
    return res
}