<template>
    <div id="choose-lawyer" class="content-container">
        <LgBreadcrumb :path='path'>
            <div class="btnGroup flex">
                <!--<Button type="primary" @click="submit">保存</Button>-->
                <Button type="primary" style="margin-left: 5px;" :disabled="true" @click="submit">提交</Button>
                <Button type="primary" style="margin-left: 5px;" :disabled="$route.query.taskId==undefined" @click="showFlowchart">查看流程图</Button>
            </div>
        </LgBreadcrumb>
        <div class="table-container">
            <ApprovalHistory :data='caseInfo!=null?caseInfo.hisTask:[]'></ApprovalHistory>
            <div class="flex icon-container">
            	<CaseBaseInfo :caseInfo='caseBaseInfo'></CaseBaseInfo>
            </div>
        	<OperatingInfo :operatingInfo='operatingInfo'></OperatingInfo>
            <div class="flex icon-container" style="padding:20px;">
                <IconTitle title='终审评价' left='-102' top='-30'></IconTitle>
                <Table border stripe :columns="lawyers" :data="lawyerArray"></Table>
            </div>
            <div class="final-evaluate">
                <IconTitle title='相关附件' left='-121' top='-30'></IconTitle>
            	<div class="attachmentFileContainer clearfix" v-if="DefaultFileList&&DefaultFileList.length>0">
                    <span>
                    	<AttachmentList v-if="DefaultFileList.length>0" :deletable='false'  :data='DefaultFileList' ></AttachmentList>
                    </span>
                </div>
                <!--<IconTitle title='聘用律师相关' left='-121' top='-30'></IconTitle>-->
                <!--<Form ref="relativeForm" :model="relativeForm" :rules="relativeFormRule" :label-width='130'>
                    <div class="form-item-content flex">
                        <div class="form-item">
                            <FormItem label='聘用律师:'>
                                <Input readonly="" type="text" v-model="relativeForm.lawyer" placeholder="请输入律师名称">
                                </Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                            <FormItem label='所属律所:'>
                                <Input readonly type="text" v-model="relativeForm.lawoffice" placeholder="请输入律师所属律所">
                                </Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                            <FormItem prop='feeType' label='计费方式:'>
                                <RadioGroup v-model="relativeForm.feeType">
                                    <Radio v-for='item in jffs' :label="item.dictCode" :key="item.id">{{item.dictName}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </div>
                        <div class="form-item">
                            <FormItem prop="fee" label='律师费用:'>
                                <Input type="text" v-model="relativeForm.fee" placeholder="请输入律师费用">
                                <Select v-model="relativeForm.currency" slot="append" style="width: 70px">
                                    <Option v-for="item in bz" :key="item.id" :value="item.dictCode">{{item.dictName}}</Option>
                                </Select>
                                </Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                            <FormItem prop="contractNo" label='签订合同编号:'>
                                <Input type="text" v-model="relativeForm.contractNo" placeholder="请输入聘用律师签订合同编号">
                                </Input>
                            </FormItem>
                        </div>
                        <div class="form-item" style="width:100%">
                            <FormItem prop="comment" label='聘用意见:'>
                                <Input type="textarea" :rows="4" v-model="relativeForm.comment" placeholder="请输入聘用律师意见">
                                </Input>
                            </FormItem>
                        </div>
                    </div>

                </Form>-->
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex'
    import LgBreadcrumb from '../../components/LgBreadcrumb'
    import CaseBaseInfo from '../../components/CaseBaseInfo'
    import ApprovalHistory from '../../components/ApprovalHistory'
    import IconTitle from '../../components/IconTitle'
    import { gotoLawyerDetail,gotoFlowChart } from '../../utils'
    import AttachmentList from '../../components/AttachmentList'
    import OperatingInfo from '../../components/OperatingInfo'
    
    export default {
        name: 'employlawyer',
        components: {
            LgBreadcrumb,
            CaseBaseInfo,
            IconTitle,
            ApprovalHistory,
            OperatingInfo,
            AttachmentList
        },
        computed: {
            ...mapGetters( [] ),
            ...mapState( [
                'bz',
                'jffs'
            ] ),
            operatingInfo(){
            	let obj;
            	if(this.applyInfo){
            		obj = {
	            		creator:this.applyInfo.creator,
	            		createTime:this.applyInfo.createTime,
	            		externalReason:this.applyInfo.externalReason,
	            		externalReasonFirst:this.applyInfo.externalReasonFirst,
	            		externalReasonFinalJudgment:this.applyInfo.externalReasonFinalJudgment,
	            	}
            	}else{
            		obj = null
            	}
            	return obj
            }
            
        },
        data() {
            //      	/^(0|[1-9][0-9]*)$/;
            const bzValue = ( rule, value, callback ) => {
                if ( value === '' ) {
                    callback( new Error( '律师费用不能为空' ) );
                } else {
                    let reg = /^([1-9][0-9]*)$/;
                    if ( reg.test( value ) ) {
                        callback();
                    } else {
                        callback( new Error( '请输入正确的律师费用' ) );
                    }

                }
            };
            return {
                path: [
                    { 'name': '律师管理', 'path': '/main/lawyerManage' },
                    { 'name': '聘用律师', 'path': '/main/lawyerManage/employLawyer' },
                ],
                caseInfo: null,
                lawyerArray:[],
                caseBaseInfo:null,
                relativeForm: {
                    id: '',
                    lawyer: '',
                    lawoffice: '',
                    contractNo: '',
                    fee: '',
                    feeType: '',
                    currency: 'bz_rmb',
                    comment:''
                },
                relativeFormRule: {
                    feeType: [
                        { required: true, message: '请选择计费方式' }
                    ],
                    fee: [
                        { required: true, validator: bzValue },
                    ],
                    contractNo: [
                        { required: true, message: '请输入律师合同编号',  },
                    ],
                    comment: [
                        { required: true, message: '请输入聘用意见',  },
                    ],
                },
                lawyers: [ {
                        type: 'index',
                        width: 70,
                        align: 'center',
                    },
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
                        title: '合作案件律师费总数(元)',
                        key: 'totalFee',
                        align: 'center',
                        render: ( h, params ) => {
                            return params.row.lawyerInfoDTO.totalCost 
                        }
                    },
                    {
                        title: '风控部评分',
                        key: 'businessGrade',
                        width:100,
                        align: 'center',
                    },
                    {
                        title: '财务部评分',
                        key: 'financeGrade',
                        align: 'center',
                        width:100,

                    },
                    {
                        title: '业务部评分',
                        key: 'businessGrade',
                        align: 'center',
                        width:100,
                    },
                    {
                        title: '最终得分',
                        key: 'totalGrade',
                        align: 'center'
                    },
                ],
                applyInfo:null,
                DefaultFileList:[]
                
            }
        },
        mounted() {
//          this.getCaseInfo( 4 )
           	this.getCaseInfo( this.$route.query.id )
            if ( this.bz.length == 0 ) { //如果vuex中没有币种数据  就请求后台数据
                this.getBz();
            }
            if ( this.jffs.length == 0 ) { //如果vuex中没有计费方式数据  就请求后台数据
                this.getJFFS();
            }
        },
        methods: {
            ...mapActions(
                [
                    'getJFFS',
                    'getBz'
                ]
            ),
            getCaseInfo( id ) {
                let _this = this
                this.$http.request( {
                        url: '/ecm/findExternalCounsel/' + id,
                        method: 'get',
                    } )
                    .then( res => {
//                      console.log( res.data )
                        if ( res.data.code == 1 ) {
                            _this.caseInfo = res.data.content;
                            _this.caseBaseInfo= res.data.content.cases;
                            _this.applyInfo = res.data.content.cases
                            _this.lawyerArray = res.data.content.externalCounselManage[0].externalPersonnelDTO;
                            _this.DefaultFileList = res.data.content.attachmentInfos;
//                          for ( let i = 0; i < data.length; i++ ) {
//                              if ( data[ i ].winFlag == 1 ) {
//                                  _this.relativeForm.id = data[ i ].lawyerId;
//                                  _this.relativeForm.lawyer = data[ i ].lawyerName;
//                                  _this.relativeForm.lawoffice = data[ i ].lawOfficeName;
//                                  break
//                              }
//                          }

                        }
                    } )
                    .catch( err => {
                        throw Error( err );
                    } )

            },
            submit() {
                let _this = this;
//              this.$refs[ 'relativeForm' ].validate( ( valid ) => {
//                  if ( valid ) {
//                      let wayname, CurrencyName;
//                      for ( let i = 0; i < this.jffs.length; i++ ) {
//                          if ( this.jffs[ i ].dictCode == this.relativeForm.feeType ) {
//                              wayname = this.jffs[ i ].dictName
//                          }
//                      }
//                      for ( let i = 0; i < this.bz.length; i++ ) {
//                          if ( this.bz[ i ].dictCode == this.relativeForm.currency ) {
//                              CurrencyName = this.bz[ i ].dictName
//                          }
//                      }
//						debugger
                        let params = {
//                          externalBillingWayId: this.relativeForm.feeType,
//                          externalBillingWayName: wayname,
//                          externalCost: this.relativeForm.fee,
//                          externalCostCurrencyId: this.relativeForm.currency,
//                          externalCostCurrencyName: CurrencyName,
//                          lawyerId: this.relativeForm.id,
                            casesId: this.caseInfo.cases.id,
							taskId:this.$route.query.taskId,
							externalReasonEmploy:this.relativeForm.comment
                        }
//                      console.log(params)
//                      this.$Message.error( "对不起，此功能正在开发中")
//                      let _this = this
//                      this.$http.request( {
//                              url: '/cases/lawyer',
//                              method: 'put',
//                              data: params
//                          } )
//                          .then( res => {
//                          	console.log(res)
//                              if ( res.data.code == 1 ) {
//                                  _this.$Message.success(res.data.message)
//                                  _this.$router.push({
//                                  	name:'personalTaskCenter',
//                                  	query:{
//                                  		type:'finished'
//                                  	}
//                                  })
//                              } else {
//                                  _this.$Message.error( res.data.message)
//
//                              }
//                          } )
//                          .catch( err => {
//                              throw Error( err );
//                          } )
//                  } 
//              } )
            },
            showFlowchart(){
            	gotoFlowChart(this.$route.query.processInstanceId)
            }
        }
    }
</script>

<style lang="less">
    #choose-lawyer {
        box-sizing: border-box;
        width: 1100px;
        margin: 0 auto;
        .table-container {
            .case-base-info .content {
                margin: 0;
            }
            .btnGroup {
                margin-top: 20px;
            }
        }
        .final-evaluate {
            background: #ffffff;
            padding:20px;
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
            .ivu-select {
                width: 80px !important;
            }
        }
        .icon-container {
            margin-top: 20px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            background: #ffffff;
        }
    }
</style>