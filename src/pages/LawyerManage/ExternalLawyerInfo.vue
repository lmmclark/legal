<template>
	<div id="externalLawyerInfo" class="lg-wrapper">
		<div>
			<lg-breadcrumb v-bind:path="path"></lg-breadcrumb>
		</div>
		<ApprovalHistory :data='historyInfoData'/>
		<div class="CaseBaseInfo_div">
			<CaseBaseInfo :caseInfo="casedata" />
		</div>
		<OperatingInfo :operatingInfo='operatingInfo'/>
		<div style="background: #fff;">
			<div class="final-evaluate">
	            <IconTitle title='终审评价' left='-102' top='-30'></IconTitle>
	            <Table border stripe :columns="lawyers" :data="lawyerArray"></Table>
	        </div>
	   </div>
	   <div style="background: #fff;">
			<div class="final-evaluate">
	            <IconTitle title='聘用律师相关' left='-121' top='-30'></IconTitle>
	            <div class="content-caseInfo-div flex">
	            	<div class="content-caseInfo flex">
			            <label class="case-label">是否外聘律师：</label>
			            <div class="case-detail">
							<div>
			            		{{casedata!=null&&casedata.isExternal==1?'是':'否'}}
			            	</div>
			            </div>
			        </div>
					<div class="content-caseInfo flex" v-if="casedata!=null&&casedata.isExternal==1&&casedata.lawyers.length>0">
			            <label class="case-label">外聘律师姓名：</label>
			            <div class="case-detail">
							<div >{{casedata.lawyers[0].lawyerName}}</div>
			            </div>
			        </div>
			        <div class="content-caseInfo flex" v-if="casedata!=null&&casedata.isExternal==1&&casedata.lawyers.length>0">
			            <label class="case-label">外聘律所名称：</label>
			            <div class="case-detail">
							<div >{{casedata.lawyers[0].lawOfficeDTO.lawOfficeName}}</div>
			            </div>
			        </div>
					<!--<div class="content-caseInfo flex"  v-if="casedata!=null&&casedata.isExternal==1&&casedata.lawyers.length>0">
			            <label class="case-label">计费方式：</label>
			            <div class="case-detail">
							<div>{{casedata.externalBillingWayName}}</div>
			            </div>
			        </div>-->
					<div class="content-caseInfo flex"  v-if="casedata!=null&&casedata.isExternal==1&&casedata.lawyers.length>0">
			            <label class="case-label">花费：</label>
			            <div class="case-detail">
							<div>10000元</div>
							<!--<div>{{casedata.externalCost}} {{casedata.externalCostCurrencyName}}</div>-->
			            </div>
			        </div>
	            </div>
	        </div>
	   </div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapState } from 'vuex'
	import ApprovalHistory from "../../components/ApprovalHistory";
	import CaseBaseInfo from "../../components/CaseBaseInfo";
	import OperatingInfo from "../../components/OperatingInfo";
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue';
	import IconTitle from '../../components/IconTitle';
	export default {
		name: 'externalLawyerInfo',
		components: {
			ApprovalHistory,
			CaseBaseInfo,
			OperatingInfo,
			lgBreadcrumb,
			IconTitle
		},
		computed: {
			...mapState([
				'casedata',
			]),
			...mapGetters([
				"userInfo"
			]),
			operatingInfo(){
				console.log(this.applyInfo.cases)
            	let obj;
            	if(this.applyInfo){
            		obj = {
	            		creator:this.userInfo.userName,
	            		createTime:this.applyInfo.cases.createTime,
	            		externalReason:this.applyInfo.cases.externalReason,
//	            		externalReasonFirst:this.applyInfo.externalReasonFirst,
//	            		externalReasonFinalJudgment: this.applyInfo.externalReasonFinalJudgment
	            	}
            	}else{
            		obj = null
            	}
            	return obj
            },
            lawyerArray() {
//          	console.log(this.caseInfo)
//return []
                return this.caseInfo == null ? [] : this.caseInfo.externalCounselManage[0].externalPersonnelDTO
            }
		},
		data() {
			return {
				historyInfoData: [],
				caseInfo: {},
				path:[
					{'name':'律师库管理','path':''},
					{'name':'外聘流程信息','path':'/main/lawyerManage/externalLawyerInfo'},
				],
				 lawyers: [ 
                    {
                        title: '律师姓名',
                        key: 'lawyerName',
                        align: 'center',
                        width: 70,
                        render: ( h, params ) => {
                          return params.row.lawyerInfoDTO.lawyerName
                        }
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align: 'center',
                        render: ( h, params ) => {
                        	return params.row.lawyerInfoDTO.lawOfficeName
                        }
                    },
                    {
                        title: '地区',
                        key: 'area',
                        align: 'center',
                        width: 80,
                        render: ( h, params ) => {
                         return params.row.lawyerInfoDTO.area
                        }
                    },
                    {
                        title: '擅长案件类型',
                        key: 'goodAtName',
                        align: 'center',
                        width: 80,
                        render: ( h, params ) => {
                        	return params.row.lawyerInfoDTO.goodAtName
                        }
                    },
                    {
                        title: '毕业院校',
                        key: 'school',
                        width: 100,
                        align: 'center',
                        render: ( h, params ) => {
                        	return params.row.lawyerInfoDTO.school
                        }
                    },
                    {
                        title: '律师评级',
                        key: 'level',
                        align: 'center',
                        width: 70,
                        render: ( h, params ) => {
                            return '--'
                        }

                    },
                    {
                        title: '法务部评分',
                        key: 'totalFee',
                        align: 'center',
                        render: ( h, params ) => {
                            return params.row.lawyerInfoDTO.businessGrade
                        }
                    },
                    {
                        title: '财务部评分',
                        key: 'quoteAmount',
                        align: 'center',
                        width: 90,
                        render: ( h, params ) => {
                            return params.row.lawyerInfoDTO.financeGrade
                        }

                    },
                    {
                        title: '风控部评分',
                        key: 'appraisalContent',
                        align: 'center',
                        width: 90,
                        render: ( h, params ) => {
                            return params.row.lawyerInfoDTO.legalGrade
                        }
                    },
                    {
                        title: '总得分',
                        key: 'appraisalContentEnd',
                        align: 'center',
                        render: ( h, params ) => {
                            return params.row.lawyerInfoDTO.totalGrade
                        }
                    },

//                  {
//                      title: '操作',
//                      key: 'address',
//                      align: 'center',
//                      render: ( h, params ) => {
//                          return h( 'div', [
//                              h( 'Button', {
//                                  props: {
//                                      type: 'primary',
//                                      size: 'small'
//                                  },
//                                  on: {
//                                      click: () => {
//                                          this.showquetoModal( params.index )
//                                      }
//                                  }
//                              }, '填写评价' )
//                          ] );
//                      }
//                  },
                ],
				applyInfo:null
			}
		},
		mounted() {
			this.getCaseInfo( this.$route.query.id )
			this.getCASEDATA( this.$route.query.id )
		},
		methods: {
			...mapActions([
				"getCASEDATA"
			]),
			getCaseInfo( id ) {
                let _this = this
                this.$http.request( {
                        url: '/ecm/findExternalCounsel/' + id,
                        method: 'get',
                    } )
                    .then( res => {
                    	console.log(res)
                       _this.historyInfoData = res.data.content.hisTask;
                        if ( res.data.code == 1 ) {
                            _this.caseInfo = res.data.content
                            _this.applyInfo = res.data.content
                        }
                    } )
                    .catch( err => {
                        throw Error( err );
                    } )
            }
		}
	}
</script>

<style lang="less">
	@txtColor:#1A1A1A;
	#externalLawyerInfo{
		.CaseBaseInfo_div{
			margin-top: 20px;
		}
		.final-evaluate {
            p.all {
                margin: 20px 0;
                color: #1A1A1A;
                font-size: 14px;
                font-weight: 600;
            }
            background: #ffffff;
            padding: 10px 20px;
            margin-top: 20px;
            .form-item {
                width: 50%;
                padding-right: 150px;
            }
            .form-item-content {
                flex-wrap: wrap;
                justify-content: space-between;
                .ivu-input-group-append {
                    background-color: #eee;
                    border: 1px solid #d6d6d6;
                }
                .ivu-form-item-label {
                    font-size: 14px;
                    color: #1A1A1A;
                }
            }
            .content-caseInfo-div{
            	flex-wrap: wrap;
            	.content-caseInfo {
		            width: 50%;
		            justify-content: flex-start;
		            align-items: flex-start;
		            color: @txtColor;
		            padding:10px 0;
		            font-family: "微软雅黑";
		            font-size:14px;
		        }
            }
        }
	}
</style>