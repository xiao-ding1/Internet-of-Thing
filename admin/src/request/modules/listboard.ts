import {request} from "../request";

const listboard = async() => {
    const res = request.get('/board/allBoard');
    return res;
}

export default listboard;