import { createStore } from "vuex";
const loginInfo = {
  namespaced:true,
  state: () => ({
    username: null,
    token: null,
    // roleId: null,
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

const appointInfo = {
  state: {
    isPass: false,
  },
  mutations: {
    setIsPass: (state, isPass) => {
      state.isPass = isPass;
    },
  },
}

const classInfo = {
  namespaced: true,
  state: {
    isSignIn: true,
    rayNum: 10,
    curtainStatus: false,
    temNum: 10,
    fanStatus: false,
  },
  mutations: {
    setSignInInfo: (state, isSignIn) => {
      state.isSignIn = isSignIn;
    },
    setRayNum: (state, rayNum) => {
      state.rayNum = rayNum;
    },
    setCurtainStatus: (state, curtainStatus) => {
      state.curtainStatus = curtainStatus;
    },
    setTemNum: (state, temNum) => {
      state.temNum = temNum;
    },
    setFanStatus: (state, fanStatus) => {
      state.fanStatus = fanStatus;
    },
  },
};
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

const farmInfo = {
  namespaced:true,
  state: {
    rayStatus: false,
    temStatus: false,
    wetStatus: false
  },
  mutations: {
    setRayStatus: (state, rayStatus) => {
      state.rayStatus =  rayStatus
    },
    setTemStatus: (state,temStatus) => {
      state.temStatus = temStatus
    },
    setWetStatus: (state, wetStatus) => {
      state.wetStatus = wetStatus
    }
  }
}

export default createStore({
  modules: {
    appointInfo,
    classInfo,
    loginInfo,
    lampInfo,
    farmInfo
  },
});
