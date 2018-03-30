import {setStore,getStore,removeStore} from '../utils'
//获取token
export const Token = function (state) {
	if(state.userInfo!=null&&state.userInfo!=undefined){
		return state.userInfo.token
	}else{
		let userInfo = JSON.parse(getStore('userInfo'))
		let token = userInfo.token
		return token
	}
}
//获取用户信息
export const userInfo = function (state) {
	if(state.userInfo!=null&&state.userInfo!=undefined){
		return state.userInfo
	}else{
		let userInfo = JSON.parse(getStore('userInfo'))
		return userInfo
	}
}














export const blackOutPutList = function (state) {
	if (state.blackOutPutList.length!=0) {
		return state.blackOutPutList
	}else{
		JSON.parse(getStore('blackOutPutList')) ;
	}
}








