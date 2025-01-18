import { request } from "../request"
export function controllWet(status: number) {
    return request.get(`/frame/faucet/${status}`)
}
export function controllFan(status: number) {
    return request.get(`/frame/fan/${status}`)
}
export function controllRay(status: number) {
    return request.get(`/frame/led/${status}`)
}