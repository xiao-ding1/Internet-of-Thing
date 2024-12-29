import { request } from "../request";

const Login = async(username:string,password:string) => {
    const res = request.post('/user/login',{username:username,password:password});
    return res;
}

export default Login