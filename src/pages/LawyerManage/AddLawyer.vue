<template>
	<div id="AddLawyer" class="mywrap_addLawyer">
		<div class="lg-wrapper">
		<div class="layout">
	        <Layout>
	        	<Content>
	        		<div>
                		<lg-breadcrumb v-bind:path = "path"></lg-breadcrumb>
                	</div>
	                <div class="wrap_item">
	                	<div class="info_title">
		            		<div class="title flex">
				                <div class="icon"></div>
				                <p>律师入库申请</p>
				            </div>
		            	</div>
						<div class="form_item">
							<div>
								<Form ref="addform" label-position="right" :label-width="125">
									<Row>
										<Col span="10">
											<Form-item prop="reqApplicantName" label='申请人'>
												<Input type="text" v-model="baseInfo.reqApplicantName" class="inputWidth">
												</Input>
											</Form-item>
										</Col>
										<Col span="10" offset="3">
											<FormItem prop="reqTime" label='申请时间'>
												<DatePicker v-model="baseInfo.reqTime" type="datetime" placeholder="请选择开始时间" class="inputWidth"></DatePicker>
											</FormItem>
										</Col>
									</Row>
									<Row>
									    <Col span="24">
											<Form-item prop="description" label='入库描述'>
												<Input type="textarea" :rows="5" v-model="baseInfo.reqComments" style="width: 90%;">
												</Input>
											</Form-item>
										</Col>
									</Row>
								</Form>
							</div>
							<div v-if="enterFromLawyerQueryPage==1">
								<Table :border='true' :columns="columns" :data="datacopy"></Table>
								<!--<div style="margin: 10px;overflow: hidden">
							        <div style="float: right;">
							            <Page :total="totalSize" :current="currentPage" :page-size='10'></Page>
							        </div>
							    </div>-->
							</div>
							<div v-else>
								<div class="choose-lawyer-content">
				                    <div class="flex">
				                        <p>选择入库申请的律师：</p>
				                    </div>
				                    <Button type="primary" style="margin-right: 10px;">选择</Button>
				                </div>
								<div>
									<Table :border='true' :columns="columns2" :data="datacopy2"></Table>
									<!--<div style="margin: 10px;overflow: hidden">
								        <div style="float: right;">
								            <Page :total="totalSize2" :current="currentPage2" :page-size='10'></Page>
								        </div>
								    </div>-->
								</div>
							</div>
							<div style="text-align: center; margin-top: 20px;">
								<Button type="primary" class="blue" @click="addLawyer('addform')">确认申请入库</Button>
								<ApplySubmit v-model='isOrgTreeShow' @ok='getOrdId'></ApplySubmit>
							</div>
						</div>
					</div>
	        	</Content>
	        </Layout>
    	</div>
    </div>
	</div> 
</template>

<script>
	import { mapGetters,mapState,mapActions  } from 'vuex'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import { getStore } from '../../utils'
	import ApplySubmit from '../../components/ApplySubmit'
	export default {
		name: 'AddLawyer',
		components:{
			lgBreadcrumb,
			ApplySubmit
		},
		mounted (){
			let userInfo=getStore( 'userInfo' )
			console.log(JSON.parse(userInfo))
			//this.baseInfo.ReqApplicantName=eval('(' + userInfo + ')').userName
			this.baseInfo.reqApplicantName=JSON.parse(userInfo).org.orgName
			this.baseInfo.reqApplicantId = JSON.parse(userInfo).userExtend.shareOrgId
			this.datacopy = this.blackOutPutList
			if(this.$route.query.isqueryPage){
				this.enterFromLawyerQueryPage=this.$route.query.isqueryPage
			}
	  	},
	  	computed: {
			...mapGetters([
				'blackOutPutList'
			]),
		},
		data(){
			return {
				path:[
					{'name':'律师库管理','path':''},
					{'name':'律师入库','path':'/main/lawyerManage/addLawyer'},
				],
				totalSize:1,
				currentPage:1,
				enterFromLawyerQueryPage:0,
				baseInfo:{
					reqTitle:'关于库外律师入库申请',
					reqApplicantName:'',
					reqType:1,
					reqTime:'',
					reqComments:'',
					lawyerDTOs:{},
					reqApplicantId:'',
					nextUid:''
				},
				isOrgTreeShow:false,
				OrgId:'',
				datacopy:[],
				columns: [
					{
						title: '序号',
						align:'center',
						//width: 110,
						key: 'number',
						render:(h, params) => {
                        	return h('div', [
								h('p', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color:'#1a1a1a',
										cursor:'pointer'
									}
								}, params.index + 1)
							]);
                        }
					},
					{
						title: '律师姓名',
						align:'center',
						//width: 150,
						key: 'lawyerName',
						
					},
					{
						title: '所属律所',
						align:'center',
						//width: 250,
						key: 'lawOfficeName',
						
					},
					{
						title: '地区',
						align:'center',
						//width: 150,
						key: 'area',
						
					},
					{
						title: '擅长案件类型',
						align:'center',
						//width: 150,
						key: 'areasExpertiseName',
					},
					{
						title: '毕业学校',
						align:'center',
						//width: 200,
						key: 'school',
						
					},
					{
						title: '操作',
						align:'center',
						//width: 150,
						key: 'details',
						render: (h, params) => {
							return h('div', [
								h('p', {
										props: {
											type: 'text',
											size: 'small'
										},
										style: {
											marginRight: '5px',
											color:'#396dd6',
											cursor:'pointer'
											
										},
										on: {
											click: () => {
												this.$router.push({path: '/main/lawyerManage/lawyerDetail', query: {id: params.row.id}});
											}
										}
									}, '查看')
							]);
						}
					},
					{
						title: '与集团合作历史',
						align:'center',
						//width: 250,
						key: 'cooperationRecord',
						
					}
				]
			}
		},
		methods: {
			addLawyer(name) {
				this.isOrgTreeShow = true
			},
			getOrdId( res ) {
                this.OrgId = res.people[ 0 ].id
                this.submitToFirst()
            },
            submitToFirst(){
				let that = this;
				that.baseInfo.lawyerDTOs=that.datacopy
				that.baseInfo.reqTime = that.formatDate(that.baseInfo.reqTime)
				that.baseInfo.nextUid=that.OrgId
				that.$http.request({
					method: 'post',
					url: '/lawyerStorage/storage',
					data:that.baseInfo,
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
						'Authorization':'Bearer '+ this.custormerToken
					},
				}).then(function(res) {
					if(res.data.code==1){
						that.$Message.success(res.data.message);
						that.$router.push({path: '/main/lawyerManage/lawyerQuery'});
					}
				}).catch(function(err) {
					
				})
            },
			formatDate(dates){
				var d = new Date(dates)
				var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
				return datetime
			},
		}
		
	}
</script>

<style lang="less">
	@baseColor:#000;
	.mywrap_addLawyer{
		height:100%;
		min-height: 500px;
		width: 100%;
		.layout{
		    background: #F3F4F5;
		    position: relative;
		    border-radius: 4px;
		    overflow: hidden;
		    .ivu-layout{
		    	background: #F3F4F5;
		    	.wrap_item{
	    		    background: #fff;
					border-radius: 4px;
					box-sizing: border-box;
					margin-bottom: 20px;
					.info_title{
						height: 60px;
						display: flex;
	  					display: -webkit-flex;
	  					justify-content: space-between;
	  					line-height: 30px;
	  					padding: 15px 40px;
	  					 p {
		                    font-size: 16px;
		                    color: #1a1a1a;
		                    font-weight: 600;
		                }
	  					.title {
			                align-items: center;
			                justify-content: flex-start;
			                .icon {
			                    height: 20px;
			                    width: 20px;
			                    margin-right: 10px;
			                    background: url(../../assets/icons.png);
			                    background-position: -220px -30px;
			                }
			                p {
			                    font-size: 18px;
			                    color: #1a1a1a;
			                    font-weight: 600;
			                }
			            }
					}
					.form_item{
						padding: 0px 30px 20px;
						.inputWidth{
							width: 250px;
						}
						.choose-lawyer-content {
			                background: #ffffff;
			                display: flex;
			                display: -webkit-flex;
			                margin: 20px 0;
			                font-size: 14px;
			                justify-content: flex-start;
			                align-items: center;
			                width: 400px;
			                p {
			                    /*width: 100px;*/
			                    text-align: right;
			                    margin-right: 10px;
			                    font-size: 14px;
			                }
			            }
						/*.ivu-form-item:first-child{
							.ivu-input-wrapper{
								width: 30%;
							}
						}*/
						/*.ivu-form-item:last-child{
							.ivu-input-wrapper{
								width: 100%;
							}
						}*/
					}
		    	}
		    }
		   
		}
		.layout-logo{
		    width: 100px;
		    height: 30px;
		    background: #5b6270;
		    border-radius: 3px;
		    float: left;
		    position: relative;
		    top: 15px;
		    left: 20px;
		}
		.layout-footer-center{
		    text-align: center;
		    background: #F3F4F5;
		}
		.ivu-form-item-label{
			color: #000000;
			font-weight: bold;
		}
		.btn-140{
			width: 140px;
		}
		.ivu-table-cell span{
		    color: #1a1a1a !important;
		    font-weight: bold;
		}
		.ivu-table-cell p{
		    font-weight: bold;
		}
	}
	
</style>