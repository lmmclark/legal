import * as types from './mutation-types';
import axios from 'axios'
const baseUrl = 'http://10.71.202.132:8658'
// 获取币种
export const getBz = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/bz',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_BZ, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}
export const getSSDW = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/ssdw',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_SSDW, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}
export const getAJJZJD = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/ajjzjd',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_AJJZJD, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

// 案件类型
export const getAJLX = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/ajlx',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_ANLX, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

// 计费方式
export const getJFFS = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/jffs',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_JFFS, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

// 公文密级
export const getGWMJ = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/gwmj',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_GWMJ, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

// 公文缓急
export const getGWHJ = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/gwhj',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_GWHJ, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

// 律师、律所评价等级
export const getLSPJ = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/lslspjdj',
      method: 'get'
    })
    .then(res => {
      console.log(res.data.content)
      commit(types.GET_LSLSPJ, res.data.content)

    })
    .catch(err => {
      throw Error(err);
    })
}

// 台账表头
export const getTZBT = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/tzbt',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_TZBT, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

// 律师学历
export const getLSXL = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/lsxl',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_LSXL, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

// 提醒提前时间
export const getTXTQSJ = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/txtqsj',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_TXTQSJ, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}
//获取黑名单出库列表
export const setBalckList = function({ commit, state }, list) {
  commit(types.SET_BLACKOUTPUTLIST, list)
}

// 案件数据
export const getCASEDATA = function({ commit, state }, id) {
  if(!id) {
    commit(types.GET_CASEDATA, {})
    return
  }
  axios.request({
      url: baseUrl + '/cases/' + id,
      method: 'get'
    })
    .then(res => {
      commit(types.GET_CASEDATA, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}
//简单的案件信息
export const getSimpleCaseInfo = function({ commit, state }, id) {
  axios.request({
      url: baseUrl + '/ecm/getCaseId/' + id,
      method: 'get'
    })
    .then(res => {
      commit(types.GET_SIMPLECASEINFO, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}
//获取我的待办
export const getMyToDoList = function({ commit, state }, id) {
  axios.request({
      url: baseUrl + '/MyNotProcess/' + id,
      method: 'get'
    })
    .then(res => {
      commit(types.GET_MYTODOLIST, res.data.content || [])
    })
    .catch(err => {
      throw Error(err);
    })
}
//获取已结束列表
export const getDoneList = function({ commit, state }, id) {
  axios.request({
      url: baseUrl + '/queryFinishedByAssigne/' + id,
      method: 'get'
    })
    .then(res => {
      commit(types.GET_DONETASKLIST, res.data.content || [])
    })
    .catch(err => {
      throw Error(err);
    })
}
//获取我的已办
export const getFinishedTaskList = function({ commit, state }, id) {
  axios.request({
      url: baseUrl + '/MyCompletedProcess/' + id,
      method: 'get'
    })
    .then(res => {
      commit(types.GET_FINISHEDTASKLIST, res.data.content || [])
    })
    .catch(err => {
      throw Error(err);
    })
}
//获取律师库内所有律师
export const getAllLaywers = function({ commit, state }, res) {
//commit(types.SET_USERINFO, res)
  axios.request({
      url: baseUrl + '/lawyer/getAllLawyerNoPage',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_ALLLAWYERS, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}
export const lawyerSearch =function({ commit, state },lawyerSearchTxt){ //不涉密库内选择律师搜索
    let _this = this;
    axios.request( {
            url: baseUrl + '/lawyer/lawyersByNameOrLawOffceName?queryName=' +
              lawyerSearchTxt,
            method: 'get',
        } )
        .then( res => {
					commit(types.GET_ALLLAWYERS, res.data.content)
        } )
        .catch( err => {
            throw Error( err );
        } )
};
//存入用户信息
export const setUserInfo = function({ commit, state }, res) {
  commit(types.SET_USERINFO, res)
}
//擅长案件类型
export const getScajlx = function({ commit, state }) {
  axios.request({
      url: baseUrl + '/dictKind/findByDictKindCode/scajlx',
      method: 'get'
    })
    .then(res => {
      commit(types.GET_SCAJLX, res.data.content)
    })
    .catch(err => {
      throw Error(err);
    })
}

//获取案由 改为树形结构 暂时不用单选
//export const getAy = function({ commit, state }) {
//axios.request({
//    url: baseUrl + '/dictKind/findByDictKindCode/ay',
//    method: 'get'
//  })
//  .then(res => {
//    commit(types.GET_AY, res.data.content)
//  })
//  .catch(err => {
//    throw Error(err);
//  })
//}