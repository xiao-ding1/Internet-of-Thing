import { request } from "../request";
const appoint = () => request.get('/reservation/book')
const getAppointInfo = () => request.get('/reservation')
const open = ()=>request.get('/smartDoor/open')
export default {
  appoint,
  getAppointInfo,
  open
}