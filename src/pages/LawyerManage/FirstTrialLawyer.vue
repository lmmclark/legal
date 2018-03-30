<template>
    <div id="first-trial-lawyer" class="content-container">
		<LgBreadcrumb :path='path'>
	        <div class="btnGroup flex">
				<!--<Button type="primary" @click="isOrgTreeShow=true">保存</Button>-->
				<Button type="primary" style="margin-left: 5px;"  v-if='btnShow'  @click="isOrgTreeShow=true">提交</Button>
				<Button type="primary" style="margin-left: 5px;"  @click="showFlowchart">查看流程图</Button>
			</div>
		</LgBreadcrumb>
        <ApprovalHistory :data='caseInfo!=null?caseInfo.hisTask:[]'></ApprovalHistory>
        <div class="table-container">
            <div class="flex icon-container">
            	<!--<div class="checkInfo">
            		<Input type="text"  v-model="checkInfo" placeholder="请输入案件编号">
            			<Button slot="append" icon="ios-search"  @click="searchInfo"></Button>
			        </Input>
            	</div>-->
                <CaseBaseInfo :caseInfo='caseBaseInfo'></CaseBaseInfo>
            </div>
            <OperatingInfo :operatingInfo='operatingInfo'></OperatingInfo>
            <div class="first-evaluate">
                <IconTitle title='终审评分' left='-102' top='-30'></IconTitle>
                <Table border stripe :columns="lawyers" :data="lawyerArray" @on-selection-change='selectAll' style="margin-bottom: 10px;"></Table>
                <Form ref="ideaForm" :model="ideaForm"  :label-width="105"  style=" margin-top: 20px;">
			        <!--<FormItem prop="username"  label='申请人：' style='width: 200px;'>
			            <Input type="text" v-model="ideaForm.username"  readonly>
			            </Input>
			        </FormItem>-->
			        <div class="attachmentFileContainer clearfix" v-if="ideaForm.DefaultFileList&&ideaForm.DefaultFileList.length>0">
                        <span class="att-label">已上传附件：</span>
                        <span>
                        	<AttachmentList v-if="ideaForm.DefaultFileList.length>0"  :data='ideaForm.DefaultFileList' @delete='deleteClassified'></AttachmentList>
                        </span>
                    </div>
			        <FormItem  label='附加文件：'>
			            <Upload 
                        	:max-size='10240'
                        	:format="FileFormat"
        					:on-format-error="handleFormatError"
			            	name="attachmentFile" 
			            	:on-progress="uploadPrgLegal" 
			            	:on-success="uploadSucLegal" 
			            	:on-remove="rmLegal" 
                        	:on-error = 'uploadError'
			            	action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
		                    <Button type="ghost" icon="ios-cloud-upload-outline">添加文件</Button>
		               	</Upload> 
			        		
			        </FormItem>
			    </Form>
			    
            </div>

        </div>
        <!--<Modal v-model="quetoModal" title="填写评分" class-name='lawyer-queto-modal'>
            <div class="flex">
                <Form ref="formInline" :model="formInline" :style="{width:'100%'}" :rules="ruleInline" :label-width="120">
                    <FormItem prop="legal_grade" label='风控部评分：'>
                        <Input type="text"  v-model="formInline.legal_grade" placeholder="请输入风控部评分">
                        </Input>
                    </FormItem>
                    <FormItem prop="finance_grade" label='财务部评分：'>
                        <Input type="text" v-model="formInline.finance_grade" placeholder="请输入律师财务评分">
                        </Input>
                    </FormItem>
                    <FormItem prop="business_grade" label='业务部评分：'>
                        <Input type="text"  v-model="formInline.business_grade" placeholder="请输入律师业务评分">
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <div class="flex">
                    <Button type="primary" @click="confirm('formInline')">确认</Button>
                    <Button type="primary" @click="closeModal" style="margin-left: 10px;">取消</Button>
                </div>

            </div>
        </Modal>-->
        <FlowSubmit v-model='isOrgTreeShow' @ok='getOrdId'></FlowSubmit>
        
        
    </div>
</template>

<script>
    import { mapGetters, mapState, mapActions } from 'vuex'
    import LgBreadcrumb from '../../components/LgBreadcrumb'
    import CaseBaseInfo from '../../components/CaseBaseInfo'
    import ApprovalHistory from '../../components/ApprovalHistory'
    import OperatingInfo from '../../components/OperatingInfo'
    import OrgTree from '../../components/OrgTree'
    import IconTitle from '../../components/IconTitle'
    import FlowSubmit from '../../components/FlowSubmit'
    import AttachmentList from '../../components/AttachmentList'
    import { gotoLawyerDetail,gotoFlowChart,fileFormat } from '../../utils'
    export default {
        name: 'firsttriallawyer',
        components: {
            LgBreadcrumb,
            CaseBaseInfo,
            IconTitle,
            ApprovalHistory,
            OrgTree,
            OperatingInfo,
            FlowSubmit,
            AttachmentList
        },
        computed: {
            ...mapGetters( [
            	'userInfo'
            ] ),
            ...mapState(
                []
            ),
            operatingInfo(){
            	let obj;
            	if(this.applyInfo){
            		obj = {
	            		creator:this.userInfo.userName,
	            		createTime:this.applyInfo.createTime,
	            		externalReason:this.applyInfo.externalReason,
	            	}
            	}else{
            		obj = null
            	}
            	return obj
            },
            btnShow(){
            	let  completeFlag = this.$route.query.completeFlag;
            	let btnShow;
            	if(completeFlag&&completeFlag=='2'){
            		btnShow = false;
            	}else{
            		btnShow = true;
            	}
            	return btnShow
            },
            FileFormat(){
            	return fileFormat
            }
        },
        data() {
            return {
                imgUrl: require( '../../assets/checked.png' ),
                loading: false,
                checkInfo:'',
                path: [
                    { 'name': '外聘律师', 'path': '/main/lawyerManage' },
                    { 'name': '终审', 'path': '' },
                ],
                lawyers: [ 
                	{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '律师姓名',
                        key: 'lawyerName',
                        align: 'center',
                        width: 70,
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align: 'center',
                    },
                    {
                        title: '地区',
                        key: 'area',
                        align: 'center',
                        width: 80,
                    },
                    {
                        title: '擅长案件类型',
                        key: 'goodAtName',
                        align: 'center',
                        width: 80,
                    },
                    {
                        title: '毕业院校',
                        key: 'school',
                        width: 100,
                        align: 'center'
                    },
//                  {
//                      title: '律师评级',
//                      key: 'level',
//                      align: 'center',
//                      width: 70,
//                      render: ( h, params ) => {
//                          return '--'
//                      }
//
//                  },
                    {
                        title: '合作案件律师费总数(元)',
                        key: 'totalFee',
                        align: 'center',
                        render: ( h, params ) => {
                            return params.row.totalCost == 0 ? '--' : params.row.totalCost
                        }
                    },
                    {
                        title: '风控部评分',
                        key: 'legalGrade',
                        align: 'center',
                        width: 70,
                        
                    },
                    {
                        title: '财务部评分',
                        key: 'financeGrade',
                        align: 'center',
                        width: 70,

                    },
                    {
                        title: '业务部评分',
                        key: 'businessGrade',
                        align: 'center',
                        width: 70,
                    },
                    {
                        title: '最终得分',
                        key: 'totalGrade',
                        align: 'center',
                        width: 70,
                    },
                    {
                        title: '操作',
                        key: 'address',
                        align: 'center',
                        render: ( h, params ) => {
                            return h( 'div', [
                                h( 'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        "marginRight": '5px'
                                    },
                                    on: {
                                        click: () => {
                                        	let id =params.row.lawyerId?params.row.lawyerId:params.row.id
                                            gotoLawyerDetail( id )
                                        }
                                    }
                                }, '查看' ),
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
//                              }, '编辑' )
                            ] );
                        }
                    },
                ],

                selectedArray: [],
                quetoModal: false,
                lawyerArray:[],
                chooseIndex: '',
                caseInfo: null,
                chooseLawyerArr: [],
                ideaForm:{
                	firstEvaluation: '',
                	username:'',
                	id:'',
                	legalInstrument:[],
                	DefaultFileList:[]
                },
                isOrgTreeShow:false,
                applyInfo:null,
                caseBaseInfo:null

            }
        },
        created(){
        	this.ideaForm.username = this.userInfo.org.orgName
        },
        mounted() {
//          this.getCaseInfo( 25 )
            this.getCaseInfo(this.$route.query.id)
        },
        methods: {
            ...mapActions( [] ),
            showquetoModal( index ) {
                this.quetoModal = true;
                this.chooseIndex = index
            },
            selectAll( selection ) {
                this.chooseLawyerArr =selection
            },
//          confirm( name ) {
//              let _this = this;
//              this.$refs[ name ].validate( ( valid ) => {
//                  if ( valid ) {
//                  	console.log(_this.caseInfo.lawyer)
//                  	let obj = {
//                  		..._this.caseInfo.lawyer[ _this.chooseIndex ],
//                  		finance_grade : _this.formInline.finance_grade,
//                  		legal_grade : _this.formInline.legal_grade,
//                  		business_grade : _this.formInline.business_grade
//                  	}
//                      _this.caseInfo.lawyer[ _this.chooseIndex ] = obj;
//                      console.log(_this.caseInfo.lawyer[ _this.chooseIndex ])
//                      _this.quetoModal = false;
//                      _this.$refs[ name ].resetFields()
//                  } else {
//                      this.$Message.error( 'Fail!' );
//                  }
//              } )
//          },
            closeModal() {
                this.quetoModal = false;
                this.$refs[ 'formInline' ].resetFields()
            },
            goFainal(id,reason) {//提交
                let params = {
                    id: Number( this.caseInfo.externalCounselManage[0].id ),
                    externalReasonFirst: this.ideaForm.firstEvaluation,
                    externalPersonnel: this.lawyerArray,
                    userId:id+'',
//					taskId:this.$route.query.taskId,
					comment:reason,
					taskId:this.$route.query.taskId?this.$route.query.taskId:'',
					attachmentInfos:[],
                    externalApplicantName:this.userInfo.org.orgName
                };
            	let fileArray = [...this.ideaForm.legalInstrument,...this.ideaForm.DefaultFileList]
//				console.log(fileArray)                            
                for (let i = 0; i < fileArray.length; i++  ) {
                	let fileObj = {
                    	'attName':fileArray[i].name?fileArray[i].name:fileArray[i].attName,
                    	'attPath':fileArray[i].response?fileArray[i].response.content:fileArray[i].attPath,
                    	'attType':'4',
                    	'id':fileArray[i].response?'':fileArray[i].id,
                    }
                    params.attachmentInfos.push( fileObj )
                }
//              console.log(params)
                let _this = this
                this.$http.request( {
                    url: '/ecm/createFinalExternalCounselManage',
                    method: 'post',
                    data: params
                } )
                .then( res => {
//                  console.log( res.data )
                    if ( res.data.code == 1 ) {
                        _this.$Message.success( res.data.message)
						_this.$router.push( {
                            name: 'personalTaskCenter',
                            query: {
                                tab: 'todo'
                            }
                        } )
                    } else {
                        this.$Message.error(res.data.message)

                    }
                } )
                .catch( err => {
                    throw Error( err );
                } )
            },
            getCaseInfo( id ) {
                let _this = this
                this.$http.request( {
                        url: '/ecm/findExternalCounsel/' + Number(id),
                        method: 'get',
                    } )
                    .then( res => {
//                      console.log( res.data )
                        if ( res.data.code == 1 ) {
                        	let data = res.data.content;
                            _this.caseBaseInfo = data.cases;
                            _this.applyInfo = data.cases;
                            _this.caseInfo = data
                            
                            
                            let lawyerArr=[];
                            data.externalCounselManage[0].externalPersonnelDTO.forEach((item)=>{
                            	lawyerArr.push(item.lawyerInfoDTO);
                            	return lawyerArr
                            })
                            _this.ideaForm.DefaultFileList = data.attachmentInfos
                            _this.lawyerArray= lawyerArr;
                        }
                    } )
                    .catch( err => {
                        throw Error( err );
                    } )
            },
            getOrdId(res){
//          	console.log(res)
            	this.goFainal(res.people[0].id,res.opinion)
//          	this.ideaForm.id= res[0].id
//          	this.ideaForm.username = res[0].orgName
            },
            showFlowchart(){
            	gotoFlowChart(this.$route.query.processInstanceId)
            },
            searchInfo(){//根据案件编号查询案件基本信息
            },
            uploadSucLegal(response, file, fileList) {
            	this.$Message.destroy()
                this.$Message.success( response.message )
	            this.ideaForm.legalInstrument=fileList
	        },
	        // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
	        uploadPrgLegal(event, file, fileList) {
	            this.ideaForm.legalInstrument=fileList
	        },
        	// 删除
	        rmLegal(file, fileList) {
	            this.ideaForm.legalInstrument=fileList
	        },
	        deleteClassified(item){
            	let attachList = this.ideaForm.DefaultFileList,index;
            	index = attachList.indexOf(item);
                attachList.splice(index, 1);
            },
            uploadError(error, file, fileList){
            	this.$Message.destroy()
            	this.$Message.error('上传失败')
            },
            handleFormatError(){
            	this.$Message.destroy();
            	this.$Message.error('对不起，文件格式不正确');
            }
        }
    }
</script>

<style lang="less">
    #first-trial-lawyer {
        width: 1100px;
        margin: 0 auto;
        .table-container {
            margin: 10px 0;
            .case-base-info .content {
                margin: 0;
            }
            .btnGroup {
                margin-top: 20px;
            }
        }
        .icon-container{
        	position: relative;
        	background: #ffffff;
        	.checkInfo{
	        	position: absolute;
	        	top:15px;
	        	right: 20px;
	        }
        }
        
        .first-evaluate {
            margin-top: 20px;
            background: #ffffff;
            padding: 20px;
            p.all {
                margin: 20px 0;
                color: #1A1A1A;
                font-size: 14px;
                font-weight: 600;
            }
            .attachmentFile{
            	justify-content: flex-start;
    			height: 50px;
            	.attachmentImgs{
            		img{
            			height: 50px;
            			width: 50px;
            			margin-right: 5px;
            			cursor: pointer;
            		}
            	}
            	.ivu-upload-list{
            		margin: 0;
            	}
            }
        }
        .attachmentFileContainer{
	    	font-size: 14px;
	    	color: #1A1A1A;
	    	line-height: 30px;
	    	margin-bottom: 10px;
	    	span.att-label{
	    		width: 100px;
	    		text-align: right;
	    		margin-right: 15px;
	    		float: left;
	    	}
	    	span.att-label~span{
	    		float: left;
	    	}
	    }
    }
    .lawyer-queto-modal {
        .ivu-modal {
            width: 520px !important;
        }
    }
</style>