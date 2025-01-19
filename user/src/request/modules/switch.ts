import { request } from "../request"
//硬件开关状态
const getSwitch = (type) => request(`/board/status/${type}`)
export default getSwitch