import {request} from "../request"

const resetpassword = async(username:string,defaultpassword:string) => {
    const res = await request.post('/user/modify',{
        username: username,
        password: defaultpassword,
    }, )
    return res;
}

export default resetpassword