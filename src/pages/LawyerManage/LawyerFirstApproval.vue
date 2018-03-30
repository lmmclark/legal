<template>
	<div class="approvalIn_container">
		<div class="lg-wrapper">
			<div class="layout">
				<Layout>
					<Content>
						<div>
							<lg-breadcrumb v-bind:path="path">
								<div class="btnGroup flex">
					                <Button type="ghost" @click="goBack">取消</Button>
					                <Button type="primary" style="margin-left: 5px;" @click="checkForm">提交</Button>
					            </div>
							</lg-breadcrumb>
							<FlowSubmit v-model='isOrgTreeShow' @ok='getOrdId'></FlowSubmit>
						</div>
						<div class="wrap_item" style="min-height: 200px;">
							<div class="info_title">
								<div class="title flex">
									<div class="icon"></div>
									<p>审批历史</p>
								</div>
							</div>
							<div class="table_item">
								<Table border  :columns="approvalHistory" :data="hisTask"></Table>
							</div>
						</div>
						<div class="wrap_item" style="min-height: 200px;">
							<div class="info_title">
								<div class="title flex">
									<div class="icon"></div>
									<p>基本信息</p>
								</div>
							</div>
							<div class="form_item">
								<Form label-position="left">
									<Row>
										<Col span="12">
										<FormItem label="申请人:">
											<span>{{baseInfo.creator}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="申请时间:">
											<span>{{baseInfo.createTime}}</span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="申请理由:">
											<span>{{baseInfo.reqComments}}</span>
										</FormItem>
										</Col>
									</Row>
								</Form>	
							</div>
						</div>
						<div class="wrap_item" style="min-height: 200px;">
							<div class="info_title">
								<div class="title flex">
									<div class="icon_result"></div>
									<p>基本信息</p>
								</div>
							</div>
							<div class="table_item">
								<Table border  :columns="lawyerInfo" :data="lawyerDataList"></Table>
								<!--<div style="margin: 10px;overflow: hidden">
									<div style="float: right;">
										<Page :total="totalSize" :current="currentPage" :page-size='10' @on-change="lawyerChangePage"></Page>
									</div>
								</div>-->
							</div>
						</div>
					</Content>
					<Footer class="layout-footer-center"></Footer>
				</Layout>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState, mapActions } from 'vuex'
	import router from '../../router'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import FlowSubmit from '../../components/FlowSubmit'
	export default {
		name: 'LawyerQuery',
		components: {
			lgBreadcrumb,
			FlowSubmit
		},
		computed: {
			...mapGetters([
				'Token'
			]),
			...mapState([
				"scajlx",
			])
		},
		data() {
			return {
				totalSize: 10,
				currentPage: 1,
				isOrgTreeShow:false,
				OrgId:'',
				baseInfo:{
					
				},
				reqComments:'',
				lawyerInfo: [
					{
						title: '律师姓名',
						key: 'lawyerName',
						align: 'center',
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
					},
					{
						title: '擅长案件类型',
						key: 'areasExpertiseName',
						align: 'center',
					},
					{
						title: '毕业学校',
						key: 'school',
						align: 'center',
					},
					{
						title: '律师评级',
						key: 'lawyerRate',
						align: 'center',
					},
					{
						title: '详情',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('p', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color: '#396dd6',
										cursor: 'pointer'
									},
									on: {
										click: () => {
											this.$router.push({
												path: '/main/lawyerManage/lawyerDetail',
												query: {
													id: params.row.id
												}
											});
										}
									}
								}, '查看')
							]);
						}
					},
//					{
//						title: '操作',
//						key: 'action',
//						align: 'center',
//						render: (h, params) => {
//							return h('div', [
//								h('p', {
//									props: {
//										type: 'primary',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px',
//										color: '#396dd6',
//										cursor: 'pointer'
//									},
//									on: {
//										click: () => {
//											this.$router.push({
//												path: '/main/lawyerManage/lawyerDetail',
//												query: {
//													id: params.row.id
//												}
//											});
//										}
//									}
//								}, '删除')
//							]);
//						}
//					}
				],
				approvalHistory:[
					{
						title: '环节',
						key: 'taskName',
						align: 'center',
					},
					{
						title: '办理人',
						key: 'orgName',
						align: 'center',
					},
					{
						title: '意见',
						key: 'comment',
						align: 'center',
						width: 500
					},
					{
						title: '办理时间',
						key: 'taskEndTime',
						align: 'center',
					}
				],
				lawyerDataList: [],
				
				path: [{
						'name': '律师库管理',
						'path': ''
					},
					{
						'name': '律师出入库初审',
						'path': '/main/lawyerManage/lawyerFirstApproval'
					},
				],
				hisTask: [],
			}
		},
		mounted() {
			this.init()
		},
		created() {
			
		},
		methods: {
			...mapActions([
				'setBalckList',
				"getScajlx"
			]),
			init(){
				let that = this , id = this.$route.query.id;
                this.$http.request( {
                    method: 'get',
                    url: '/lawyerStorage/getLawyerStorages/'+id,
                } )
                .then( function ( res ) {
                 if(res.data.code == 1){
                 	that.baseInfo = res.data.content.lawyersStroageManage
                 	that.lawyerDataList = res.data.content.lawyersStroageManage.lawyerDTOs
                 	that.hisTask = res.data.content.hisTask
                 }
                } )
                .catch( function ( err ) {

                } )
			},
			checkForm(){
				this.isOrgTreeShow = true
			},
			getOrdId( res ) {
                this.OrgId = res.people[ 0 ].id
                this.reqComments = res.opinion
                console.log(res)
                this.submitToFirst( res.opinion )
            },
            submitToFirst(){
            	let that = this
            	let params  = {
            			nextUid:'',
            			reqComments:'',
            			workFlowId:'',
            		}
            	params.nextUid = this.OrgId
            	params.reqComments = this.reqComments
            	params.workFlowId = this.$route.query.taskId
            	this.$http.request( {
                    method: 'post',
                    url: '/lawyerStorage/submitToEnd',
                    data:params
                } )
                .then( function ( res ) {
                 if(res.data.code == 1){
                 	that.$Message.success(res.data.message);
                 	that.$router.push({path: '/main/flowManagement/personalTaskCenter'})
                 }
                } )
                .catch( function ( err ) {

                } )
            },
            goBack(){
            	this.$Message.success('取消初审！');
            	this.$router.push({path: '/main/flowManagement/personalTaskCenter'})
            }
		}
	}
</script>

<style lang="less">
	@baseColor: #000;
	.approvalIn_container {
		height: 100%;
		min-height: 500px;
		.layout {
			background: #F3F4F5;
			position: relative;
			border-radius: 4px;
			overflow: hidden;
			.ivu-layout {
				background: #F3F4F5;
				.ivu-layout-content {
					.wrap_item {
						background: #fff;
						border-radius: 4px;
						box-sizing: border-box;
						margin-bottom: 20px;
						.info_title {
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
									background-position: -280px -30px;
								}
								.icon_result {
									height: 20px;
									width: 20px;
									background: url(../../assets/icons.png);
									margin-right: 10px;
									background-position: -300px -30px;
								}
								p {
									font-size: 18px;
									color: #1a1a1a;
									font-weight: 600;
								}
							}
							.right_content {
								display: inline-block !important;
								float: right !important;
								margin-right: 10px !important;
							}
						}
						.form_item {
							padding: 0 60px 0;
						}
						.table_item {
							padding: 0 30px 20px;
							min-height: 150px;
						}
					}
				}
			}
		}
		.layout-logo {
			width: 100px;
			height: 30px;
			background: #5b6270;
			border-radius: 3px;
			float: left;
			position: relative;
			top: 15px;
			left: 20px;
		}
		.layout-footer-center {
			text-align: center;
			background: #F3F4F5;
		}
		.ivu-form-item-label {
			color: #000000;
			font-weight: bold;
		}
		.btn-140 {
			width: 140px;
		}
		.btn-100 {
			width: 100px;
		}
		.ivu-table-cell span {
			color: #1a1a1a !important;
			font-weight: bold;
		}
		.ivu-table-cell p {
			font-weight: bold;
		}
	}
</style>