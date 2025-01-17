import { request } from "../request"
export function controlLamp(status: number) {
    const url = `/led/${status}`
    return request.get(url)
}