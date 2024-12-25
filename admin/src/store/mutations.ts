function setLoginInfo(state,{
    username,
    token,
    roleId
}){
    state.username = username;
    state.token = token;
    state.roleId = roleId;
}

function setLogoutInfo(state,{
    username,
    token,
    roleId
}){
    state.username = null;
    state.token = null;
    state.roleId = null;
}

export default {
    setLoginInfo,
    setLogoutInfo
}