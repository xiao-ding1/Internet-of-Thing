import { request } from "../request";

const listuserboard = async() => {
    const res = request.get('/user/info')
    return res
}

export default listuserboard;