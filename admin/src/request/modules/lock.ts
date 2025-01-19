import { request } from "../request"

const getReservation = ()=>request.get('/reservation')
const pass = () => request.get("/reservation/pass")

export default {
  pass,
  getReservation
}