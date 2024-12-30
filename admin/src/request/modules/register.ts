import { request } from "../request";

const register = async(
    username:string,
    userPassword:string,
    adminName:string,
    adminPassword:string,
    boardId:string) => {
    const requestData = {
        username,
        userPassword,
        adminName,
        adminPassword,
        boardId
        };
    
        console.log('Request data:', requestData);  // 输出请求数据，确认其正确性
    const res = await request.post('/user/register',{
        username:username,
        userPassword:userPassword,
        adminName:adminName,
        adminPassword:adminPassword,
        boardId:boardId
    })

    return res;
}

export default register;