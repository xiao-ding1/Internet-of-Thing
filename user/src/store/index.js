import { createStore } from "vuex";

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

export default createStore({
  modules: {
    appointInfo,
    classInfo
  },
});
