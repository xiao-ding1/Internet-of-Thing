import { request } from "../request"

export const pass = () => request.get("/reservation/pass")