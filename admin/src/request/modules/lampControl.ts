import { request } from "../request";
export function controlLamp(status: number) {
    const url = `/led/${status}`
    console.log(1111)
    return request.get(url)
}