import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import {setStore,getStore,removeStore} from '../utils'

Vue.use(Vuex)
const state = {
	bz:[],//币种
	ssdw:[],//诉讼地位
	ajjzjd:[],//案件进展阶段
	ajlx:[],//案件类型
	jffs:[],//计费方式
	gwmj:[],//公文密级
	gwhj:[],//公文缓急
	lslspj:[],// 律师、律所评价等级
	tzbt:[],// 台账表头
	lsxl:[],// 律师学历
	txtqsj:[],// 提醒提前时间
	blackOutPutList:[],
	casedata:{},//案件数据
	simpleCaseInfo:null,//简单的案件数据
	myToDoList:[],//我的待办列表
	finishedTaskList:[],//我的已办列表
	doneTaskList:[],//已结束列表
	allLawyers:[],//律师库内所有的律师
	userInfo:null,//用户信息（包含token等）
	scajlx:[],//擅长案件类型
	ay:[]//获取案由
};
export default new Vuex.Store({
	state,
  	actions,
  	getters,
  	mutations
})