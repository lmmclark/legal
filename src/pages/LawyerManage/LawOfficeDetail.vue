<template>
	<div id="LawOfficeDetail" class="mywrap_LawOfficeDetail">
		<div class="lg-wrapper">
		 <div class="layout">
	        <Layout>
	            <Content>
	                <div>
                		<lg-breadcrumb v-bind:path = "path"></lg-breadcrumb>
                	</div>
			            <div class="wrap_item" style="min-height: 200px;">
			            	<div class="info_title">
			            		<div class="title flex">
					                <div class="icon_detail"></div>
					                <p>律所详细信息</p>
					            </div>
			            	</div>
			            	<div class="form_item">
			            		<Form :model="baseInfo" label-position="left">
							        <Row>        
								        <Col span="12">
								            <FormItem label="律所名称:" >
									           <span>{{baseInfo.lawOfficeName}}</span>
									        </FormItem>
								        </Col>
								        <Col span="12">
								        	<FormItem label="执行许可证:">
									           <span>{{baseInfo.executionPermissionNo}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>
								    	<Col span="12">
								            <FormItem label="国家:">
									            <span>{{baseInfo.county}}</span>
									        </FormItem>
								        </Col>
								        <Col span="12">
								        	<FormItem label="地区:">
									            <span>{{baseInfo.area}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>
								    	<Col span="12">
								    		<FormItem label="地址:">
									            <span>{{baseInfo.address}}</span>
									        </FormItem>
								            
								        </Col>
								        <Col span="12">
								        	<FormItem label="是否常年法律顾问:">
									            <span v-if="baseInfo.commonlyUseFlag == 1">是</span>
								           		<span v-else-if="baseInfo.commonlyUseFlag == 0">否</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row> 
								    	<Col span="12">
								    		<FormItem label="律所擅长业务范围:">
									            <span>{{baseInfo.goodAtName}}</span>
									        </FormItem>
								            
								        </Col>
								        <Col span="12">
								        	<FormItem label="司法资源:">
									            <span>{{baseInfo.judicialResources}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>
								    	<Col span="12">
								    		<FormItem label="联系人:">
									            <span>{{baseInfo.contact}}</span>
									       </FormItem>
								        </Col>
								        <Col span="12">
								            <FormItem label="办公电话:">
									           <span>{{baseInfo.contactTel}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>
								    	<Col span="12">
								    		<FormItem label="手机号码:">
									            <span>{{baseInfo.contactMobile}}</span>
									       </FormItem>
								        </Col>
								        <Col span="12">
								            <FormItem label="邮箱:">
									            <span>{{baseInfo.contactEmail}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row> 
								        <Col span="12">
								            <FormItem label="律所评级:">
									            <span>{{baseInfo.ratingName}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>
								    	<Col span="12">
								    		<FormItem label="创建人:">
									            <span>{{baseInfo.creator}}</span>
									       </FormItem>
								        </Col>
								        <Col span="12">
								            <FormItem label="创建时间:">
									            <span>{{baseInfo.createTime}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row> 
								        <Col span="12">
								            <FormItem label="律所荣誉:">
									            <span>{{baseInfo.honor}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row> 
								        <Col span="12">
								            <FormItem label="律所简介:">
									            <span>{{baseInfo.remark}}</span>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>
										<Col span="12">
										<FormItem label="附件:">
											<template v-for="item in baseInfo.attachmentInfo">
												<div style="margin-right: 10px;float:left;" >
													<a v-if="item.attType == 1" :href="'http://'+item.attPath" target="_blank">
														<img :src="item.attPath" style="width: 100px;height: 100px;"/>
													</a>
													<a v-else :href="item.attPath" :download="item.attName" style="color: #1a1a1a;">{{item.attName}}</a>
												</div>
											</template>
										</FormItem>
										</Col>
									</Row>
							    </Form>
			            	</div>
	                    </div>
	                    <div class="wrap_item" style="min-height: 200px;">
			            	<div class="info_title">
			            		<div class="title flex">
					                <div class="icon_history"></div>
					                <p>分所信息</p>
					            </div>
			            	</div>
			            	<div class="blacklist_item">
			            		<Table border ref="selection" :columns="columnsSubOffice" :data="subOfficeArr"></Table>
			            		<div style="margin: 10px;overflow: hidden">
							        <div style="float: right;">
							            <Page :total="totalSizeSubOffice" :current="currentPageSubOffice" :page-size='10' @on-change="changePageSubOffice"></Page>
							        </div>
							    </div>
			            	</div>
	                   	</div>
			        	<div class="wrap_item" style="min-height: 200px;">
			            	<div class="info_title">
			            		<div class="title flex">
					                <div class="icon_history"></div>
					                <p>与集团合作记录</p>
					            </div>
					            <div>
				            		<p style="display: inline-block; float: right;">合作案件律师费用总和（元）:<span>22w</span></p>
				            	</div>
			            	</div>
			            	<div class="blacklist_item">
			            		<Table border ref="selection" :columns="columns1" :data="recordArr"></Table>
			            		<div style="margin: 10px;overflow: hidden">
							        <div style="float: right;">
							            <Page :total="totalSizeRecords" :current="currentPageRecords" :page-size='10' @on-change="changePageRecords"></Page>
							        </div>
							    </div>
			            	</div>
	                   </div>
	                   <div class="wrap_item" style="min-height: 200px;">
			            	<div class="info_title">
			            		<div class="title flex">
					                <div class="icon_lawyer"></div>
					                <p>律师信息</p>
					            </div>
			            	</div>
			            	<div class="blacklist_item">
			            		<Table border ref="selection" :columns="columns2" :data="lawyerArr"></Table>
			            		<div style="margin: 10px;overflow: hidden">
							        <div style="float: right;">
							            <Page :total="totalSizeLawyers" :current="currentPageLawyers" :page-size='10' @on-change="changePageLawyers"></Page>
							        </div>
							    </div>
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
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import router from '../../router'
	export default {
		name: 'LawOfficeDetail',
		components:{
			lgBreadcrumb
		},
		computed: {
			...mapGetters([
				'custormerToken'
			])
		},
		data(){
			return{
				path:[
					{'name':'律师库管理','path':''},
					{'name':'律所详情','path':'/main/lawyerManage/lawOfficeDetail'},
				],
				id:'',//律所id
				totalSizeSubOffice:0,
				totalSizeRecords: 0,
				totalSizeLawyers: 0,
				currentPageSubOffice: 1,
				currentPageRecords: 1,
				currentPageLawyers: 1,
				baseInfo: {
					
				},
				columnsSubOffice: [
                    {
                        title: '序号',
                        key: 'index',
                        align:'center',
                        render:(h, params) => {
                        	return h('div', [
								h('p', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color:'#9999ff',
										cursor:'pointer'
									}
								}, params.index + 1)
							]);
                        }
                    },
                    {
                        title: '律所名称',
                        key: 'lawOfficeName',
                        align:'center',
                    },
                    {
                        title: '地区',
                        key: 'area',
                        align:'center',
                    },
                    {
                        title: '执业许可证号',
                        key: 'executionPermissionNo',
                        align:'center',
                    },
                    {
                        title: '擅长业务范围',
                        key: 'goodAtName',
                        align:'center',
                    },
                    {
                        title: '集团评价',
                        key: 'ratingName',
                        align:'center',
                    },
                    {
						title: '操作',
						align:'center',
						key: 'operation',
						render: (h, params) => {
							return h('div', [
								h('Button', {
										props: {
											type: 'text',
											size: 'small',
											disabled:'true'
										},
										style: {
											marginRight: '5px',
											color:'#396dd6',
											cursor:'pointer'
											
										},
										on: {
											click: () => {
												this.$router.push({path: '/main/lawyerManage/lawOfficeDetail', query: {id: params.row.id}});
											}
										}
									}, '查看')
							]);
						}
					}
                ],
                subOfficeArr:[],
                columns1: [
                    {
                        title: '序号',
                        key: 'index',
                        align:'center',
                        render:(h, params) => {
                        	return h('div', [
								h('p', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color:'#9999ff',
										cursor:'pointer'
									}
								}, params.index + 1)
							]);
                        }
                    },
                    {
                        title: '案件号',
                        key: 'casesCode',
                        align:'center',
                    },
                    {
                        title: '承办律师',
                        key: 'lawyerName',
                        align:'center',
                        render:(h, params) => {
                        	return h('div', [
								h('p', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color:'#1A1A1A',
										cursor:'pointer'
									}
								}, params.row.lawyerName.join(","))
							]);
                        }
                    },
                    {
                        title: '合作时间',
                        key: 'cooperationStartTime',
                        align:'center',
                    },
                    {
                        title: '案件处理结果',
                        key: 'predictionResult',
                        align:'center',
                    },
                    {
                        title: '集团评价',
                        key: 'evaluation',
                        align:'center',
                    },
                    {
                        title: '律师费用',
                        key: 'externalCost',
                        align:'center',
                    }
                ],
                recordArr: [],
                columns2: [
                    {
                        title: '序号',
                        key: 'index',
                        align:'center',
                        render:(h, params) => {
                        	return h('div', [
								h('p', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color:'#9999ff',
										cursor:'pointer'
									}
								}, params.index + 1)
							]);
                        }
                    },
                    {
                        title: '姓名',
                        key: 'lawyerName',
                        align:'center',
                    },
                    {
                        title: '擅长范围',
                        key: 'AreasExpertiseName',
                        align:'center',
                    },
                    {
                        title: '联系电话',
                        key: 'lawyerMobile',
                        align:'center',
                    },
                    {
                        title: '工作地点',
                        key: 'area',
                        align:'center',
                    },
                    {
                        title: '律师评级',
                        key: 'rate',
                        align:'center',
                    },
                    {
						title: '操作',
						align:'center',
						key: 'operation',
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
					}
                ],
                lawyerArr: [],
                adept:''
			}
		},
		mounted(){
			this.id = this.$route.query.id
			console.log(this.id);
			this.init()
			this.getAllSubOffice(this.currentPageSubOffice -1)
			this.getAllrecord(this.currentPageRecords -1)
			this.getAllLawyers(this.currentPageLawyers -1)
		},
		methods:{
			changePageSubOffice(index){
				this.currentPageSubOffice = index;
				this.getAllrecord(this.currentPageSubOffice - 1)
			},
			changePageRecords(index){
				this.currentPageRecords = index;
				this.getAllrecord(this.currentPageRecords - 1)
			},
			changePageLawyers(index){
				this.currentPageLawyers = index;
				this.getAllLawyers(this.currentPageLawyers - 1)
			},
			init(index){
				let that = this;
				//律所基本信息
				that.$http.request({
					method: 'get',
					url: '/lawOffice/'+that.id,
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
						'Authorization':'Bearer '+ this.custormerToken
					},
				}).then(function(res) {
					if(res.data.code == 1){
						that.baseInfo = res.data.content
					}
				}).catch(function(err) {
					
				})
			},
			getAllSubOffice(index){
				let that = this
				//分所信息
				that.$http.request({
					method: 'get',
					url: '/lawOffice/subOffice/'+that.id+'?page='+index+'&size=10',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
						'Authorization':'Bearer '+ this.custormerToken
					},
				}).then(function(res) {
					if(res.data.code == 1){
						that.subOfficeArr = res.data.content.content
						that.totalSizeSubOffice = res.data.content.totalElements
					}
				}).catch(function(err) {
					
				})	
			},
			getAllrecord(index){
				let that = this
				//与集团合作纪律
				that.$http.request({
					method: 'get',
					url: '/lawOffice/cooperateRecord/'+that.id+'?page='+index+'&size=10',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
						'Authorization':'Bearer '+ this.custormerToken
					},
				}).then(function(res) {debugger;
					if(res.data.code == 1){
						that.recordArr = res.data.content.record.content
						that.totalSizeRecords = res.data.content.record.totalElements
					}
				}).catch(function(err) {
					
				})	
			},
			getAllLawyers(index){
				//律师信息
				let that = this
				that.$http.request({
					method: 'get',
					url: '/lawyer/lawyers/'+that.id+'?page='+index+'&size=10',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
						'Authorization':'Bearer '+ that.custormerToken
					},
				}).then(function(res) {
					if(res.data.code == 1){
						that.lawyerArr= res.data.content.content;
					}
				}).catch(function(err) {
					
				})	
			}
		}
	}
</script>
<style lang="less">
	@baseColor:#000;
	.mywrap_LawOfficeDetail{ 
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
			                .icon_detail {
			                    height: 20px;
			                    width: 20px;
			                    margin-right: 10px;
			                    background: url(../../assets/icons.png);
			                    background-position: 0px -30px;
			                }
			                .icon_history {
			                    height: 20px;
			                    width: 20px;
			                    margin-right: 10px;
			                    background: url(../../assets/icons.png);
			                    background-position: -80px -30px;
			                }
			                .icon_lawyer{
			                	height: 20px;
			                    width: 20px;
			                    margin-right: 10px;
			                    background: url(../../assets/icons.png);
			                    background-position: -40px -30px;
			                }
			                p {
			                    font-size: 18px;
			                    color: #1a1a1a;
			                    font-weight: 600;
			                }
			            }
					}
					.form_item{
						padding: 0px 40px 20px;
						.ivu-select{
							width: 60% ;
						}
						.ivu-input-wrapper{
							width: 60% ;
						}
						.ivu-date-picker{
							width: 100%;
						}
						.button_group{
							padding-left: 20%;
						}
					}
					.blacklist_item{
						padding: 0px 30px 20px;
						min-height: 150px;
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
		.ivu-form-item-label , .ivu-form-item-content{
			color: #1a1a1a;
			font-weight: bold;
		}
	}
	
</style>