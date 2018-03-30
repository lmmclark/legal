import * as types from './mutation-types';

const mutations = {
  [types.GET_BZ](state, bz) {
    state.bz = bz
  },
  [types.GET_SSDW](state, res) {
    state.ssdw = res
  },
  [types.GET_AJJZJD](state, res) {
    state.ajjzjd = res
  },
  [types.GET_ANLX](state, res) {
    state.ajlx = res
  },
  [types.GET_JFFS](state, res) {
    state.jffs = res
  },
  [types.GET_GWMJ](state, res) {
    state.gwmj = res
  },
  [types.GET_GWHJ](state, res) {
    state.gwhj = res
  },
  [types.GET_LSLSPJ](state, res) {
    state.lslspj = res
  },
  [types.GET_TZBT](state, res) {
    state.tzbt = res
  },
  [types.GET_LSXL](state, res) {
    state.lsxl = res
  },
  [types.GET_TXTQSJ](state, res) {
    state.txtqsj = res
  },
  [types.SET_BLACKOUTPUTLIST](state, res) {
    state.blackOutPutList = res
  },
  [types.GET_CASEDATA](state, casedata) {
    state.casedata = casedata
  },
  [types.GET_SIMPLECASEINFO](state, res) {
    state.simpleCaseInfo = res
  },
  [types.GET_MYTODOLIST](state, res) {
    state.myToDoList = res
  },
  [types.GET_ALLLAWYERS](state, res) {
    state.allLawyers = res
  },
  [types.SET_USERINFO](state, res) {
    state.userInfo = res
  },
  [types.GET_SCAJLX](state, res) {
    state.scajlx = res
  },
  [types.GET_AY](state, res) {
    state.ay = res
  },
  [types.GET_FINISHEDTASKLIST](state, res) {
    state.finishedTaskList = res
  },
  [types.GET_DONETASKLIST](state, res) {
    state.doneTaskList = res;
  }
}

export default mutations