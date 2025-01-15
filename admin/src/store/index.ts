import {createStore} from 'vuex'

const blueInfo = {
  namespaced:true,
  state: {
    isConnect: false,
    isLock:true
  },
  mutations: {
    setIsConnect: (state,isConnect) => {
      state.isConnect = isConnect
    },
    setIsLock: (state,isLock) => {
      state.isLock = isLock
    }
  }
}

const smartOpeningInfo = {
  namespaced:true,
  state: {
    tableInfo: []
  },
  mutations: {
    //收到信息
    addTableInfo: (state, newInfo) => {
      state.tableInfo.push(newInfo)
    },
    //删除信息
    clearTableInfo: (state) => {
      state.tableInfo = []
    }
  }
}

const classInfo = {
  namespaced:true,
  state: {
    isSignIn: true,
    rayNum: 10,
    curtainStatus: false,
    temNum: 10,
    fanStatus:false
  },
  mutations: {
    setSignInInfo: (state,isSignIn) => {
      state.isSignIn = isSignIn
    },
    setRayNum: (state,rayNum) => {
      state.rayNum = rayNum
    },
    setCurtainStatus: (state, curtainStatus) => {
      state.curtainStatus = curtainStatus
    },
    setTemNum: (state,temNum) => {
      state.temNum = temNum
    },
    setFanStatus: (state,fanStatus) => {
      state.fanStatus = fanStatus
    }
  }
}

const loginInfo = {
  namespaced:true,
  state: () => ({
    username: null,
    token: null,
    roleId: null,
  }),
  mutations: {
    setLoginInfo:(state,{username,token,roleId})=>{
      state.username = username;
      state.token = token;
      state.roleId = roleId;
    },
    setLogoutInfo:(state,{username,token,roleId})=>{
      state.username = null;
      state.token = null;
      state.roleId = null;
    }
  }
}

const lampInfo = {
  namespaced: true,
  state: {
    lampDeviceStatus:false
  },
  mutations: {
    setLampStatus: (state, lampDeviceStatus) => {
      state.lampDeviceStatus = lampDeviceStatus
    }
  }
}

export default createStore({
  modules: {
    loginInfo,
    blueInfo,
    smartOpeningInfo,
    classInfo,
    lampInfo
 }})