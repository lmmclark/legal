<template>
	<div id="AuctionType" class="lawyerdetail_container">
		<div class="lg-wrapper">
			<div class="layout">
				<Layout>
					<Content>
						<div>
							<lg-breadcrumb v-bind:path="path"></lg-breadcrumb>
						</div>
						<div class="wrap_item" style="min-height: 200px;">
							<div class="info_title">
								<div class="title flex">
									<div class="icon"></div>
									<p style="float: right;">律师详情信息</p>
								</div>
							</div>
							<div class="form_item">
								<Form :model="baseInfo" label-position="left">
									<Row>
										<Col span="12">
										<FormItem label="律师姓名:">
											<span>{{baseInfo.lawyerName}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="所属律所:">
											<span>{{baseInfo.lawOfficeName}}</span>
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
										<FormItem label="执业证号:">
											<span>{{baseInfo.occupationCertificateNo}}</span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="地区:">
											<span>{{baseInfo.area}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="职务:">
											<span>{{baseInfo.socialPosition}}</span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="性别:">
											<span>{{baseInfo.lawyerSex}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="律师评级:">
											<span></span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="毕业院校:">
											<span>{{baseInfo.school}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="电话:">
											<span>{{baseInfo.lawyerMobile}}</span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="学历:">
											<span>{{baseInfo.educationName}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="手机号码:">
											<span>{{baseInfo.lawyerMobile}}</span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="社会职务:">
											<span>{{baseInfo.socialPosition}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="是否常年法务顾问:">
											<span v-if="baseInfo.commonlyUserFlag == 1">是</span>
											<span v-else-if="baseInfo.commonlyUserFlag == 0">否</span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="专长:">
											<span>{{baseInfo.specialty}}</span>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem label="擅长案件类型:">
											<span>{{baseInfo.areasExpertiseName}}</span>
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
										<FormItem label="律师简介:">
											<span>{{baseInfo.introduction}}</span>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="12">
										<FormItem label="附件:">
											<template v-for="item in baseInfo.attachmentInfoList">
												<div style="margin-right: 10px; float: left;">
													<a v-if="item.attType == 1" :href="item.attPath " target="_blank">
														<img :src="item.attPath" style="width: 100px;height: 100px;"/>
													</a>
													<a v-else :href="item.attPath " :download=item.attName style="color: #1a1a1a;">{{item.attName}}</a>					
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
									<div class="icon_lawoffice"></div>
									<p style="float: right;">律所信息</p>
								</div>
							</div>
							<div class="blacklist_item">
								<Table border ref="selection" :columns="columns1" :data="lawyerOfficeArr"></Table>
							</div>
						</div>
						<!--<div class="wrap_item" style="min-height: 200px;">
		            	<div class="info_title">
		            		<div class="title flex">
				                <div class="icon_evaluation"></div>
				                <p>律师收到评价信息</p>
				            </div>
				            <div>
				            	<Button type="primary" class="blue btn-100" style="display: inline-block; float: right;" @click="modalNew=true">新增评论</Button>
				            </div>
				            
		            	</div>
		            	<div class="blacklist_item">
		            		<Table border ref="selection" :columns="columns2" :data="data2"></Table>
		            		<div style="margin: 10px;overflow: hidden">
						        <div style="float: right;">
						            <Page :total="totalSize" :current="currentPage" :page-size='10' @on-change="changePage"></Page>
						        </div>
						    </div>
		            	</div>
                   </div>-->
						<div class="wrap_item" style="min-height: 200px;">
							<div class="info_title">
								<div class="title flex">
									<div class="icon_record"></div>
									<p>与集团合作记录</p>
								</div>
								<div>
									<p style="display: inline-block; float: right;">合作案件律师费用总和（元）:<span>22w</span></p>
									<!--<Button type="primary" class="blue btn-100" style="display: inline-block; float: right;margin-right: 20px;" @click="modalNew=true">新增评论</Button>-->
									<Modal v-model="modalNew" width="700">
										<p slot="header" style="color:#396dd6;">
											<Icon type="navicon-round"></Icon>
											<span>&nbsp;律师评价</span>
										</p>
										<div>
											<Form ref="evaluation" :model="evaluation" :rules="rulesEvaluation" :label-width="100">
												<FormItem label="评价内容:" prop="content">
													<Input v-model="evaluation.content" type="textarea" :rows="3"></Input>
												</FormItem>
												<FormItem label="评价分数:" prop="score">
													<Select v-model="evaluation.score" placeholder="请选择评价分数" style="width: 187px;">
														<Option value="0">优秀</Option>
														<Option value="1">良好</Option>
														<Option value="2">一般</Option>
														<Option value="3">不及格</Option>
													</Select>
												</FormItem>
												<FormItem label="评价时间:" prop="time">
													<DatePicker v-model="evaluation.time" type="date" placeholder="请选择评价时间"></DatePicker>
												</FormItem>
											</Form>
										</div>
										<div slot="footer" class='modalNew'>
											<div>
												<Button class="blue" type="primary" @click="subEvalustion('evaluation')">确定</Button>
												<Button class="white" @click="modalNew = false">取消</Button>
											</div>
										</div>
									</Modal>
								</div>
							</div>
							<div class="blacklist_item">
								<Table border ref="selection" :columns="columns3" :data="recordArr"></Table>
								<div style="margin: 10px;overflow: hidden">
									<div style="float: right;">
										<Page :total="totalSize" :current="currentPage" :page-size='10' @on-change="changePage"></Page>
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
	import router from '../../router'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	export default {
		name: 'LawyerDetail',
		components: {
			lgBreadcrumb
		},
		computed: {
			...mapGetters([
				'Token'
			])
		},
		data() {
			return {
				id: '',
				totalSize: 1,
				currentPage: 1,
				baseInfo: {
					name: '',
				},
				evaluation: {
					content: '',
					score: '',
					time: ''
				},
				modalNew: false,
				path: [{
						'name': '律师库管理',
						'path': ''
					},
					{
						'name': '律师详情',
						'path': '/main/lawyerManage/lawyerDetail'
					},
				],
				columns1: [{
						title: '序号',
						key: 'index',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('p', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color: '#1a1a1a',
										cursor: 'pointer'
									}
								}, params.index + 1)
							]);
						}
					},
					{
						title: '律所名称',
						key: 'lawOfficeName',
						align: 'center',
					},
					{
						title: '国家',
						key: 'county',
						align: 'center',
					},
					{
						title: '地区',
						key: 'area',
						align: 'center',
					},
					{
						title: '常年法律顾问',
						key: '',
						align: 'center',
						render: (h, params) => {
							if(params.row.commonlyUseFlag == 1) {
								return h('div', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
									}, '是')
								]);
							} else if(params.row.commonlyUseFlag == 0) {
								return h('span', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
									}, '否')
								]);
							} else {
								return h('span', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
									}, '')
								]);
							}
						}
					},
					{
						title: '状态',
						key: 'ReserveFirst',
						align: 'center',
					},
					{
						title: '评级',
						key: 'ratingName',
						align: 'center',
					},
					{
						title: '操作',
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
										color: '#9999ff',
										cursor: 'pointer'
									},
									on: {
										click: () => {
											this.$router.push({
												path: '/main/lawyerManage/lawOfficeDetail',
												query: {
													id: params.row.id
												}
											});
										}
									}
								}, '查看')
							]);
						}
					}
				],
				lawyerOfficeArr: [],
				columns3: [{
						title: '序号',
						key: 'index',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('p', {
									props: {
										size: 'small'
									},
									style: {
										marginRight: '5px',
										color: '#1a1a1a',
										cursor: 'pointer'
									}
								}, params.index + 1)
							]);
						}
					},
					{
						title: '案件号',
						key: 'casesCode',
						align: 'center',
					},
					{
						title: '合作单位',
						key: 'groupInHandleUnitName',
						align: 'center',
					},
					{
						title: '合作时间',
						key: 'cooperationStartTime',
						align: 'center',
					},
					{
						title: '案件处理结果',
						key: 'judgmentResult',
						align: 'center',

					},
					{
						title: '律师费用（元）',
						key: 'cooperateCost',
						align: 'center',
					},
					{
						title: '评价等级',
						key: 'appraisalLevelName',
						align: 'center',
					},
					{
						title: '详细评价',
						key: 'appraisalContent',
						align: 'center',
					}
				],
				recordArr: [],
				rulesEvaluation: {
					content: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					score: [{
						required: true,
						message: '不能为空',
						trigger: 'change'
					}],
					time: [{
						required: true,
						type: 'date',
						message: '不能为空',
						trigger: 'change'
					}]
				}
			}
		},
		created() {

		},
		mounted() {
			console.log(this.$route.query.id)
			this.id = this.$route.query.id
			this.init()
			this.getAllrecord(this.currentPage - 1)
		},
		methods: {
			changePage() {
				this.currentPage = index;
				this.getAllrecord(this.currentPage - 1)
			},
			init() {
				let that = this;
				//基本信息
				that.$http.request({
					method: 'get',
					url: '/lawyer/' + that.id
				}).then(function(res) {
					if(res.data.code == 1) {
						that.baseInfo = res.data.content
					}
				}).catch(function(err) {

				})
				//律师所属律所详情
				that.$http.request({
					method: 'get',
					url: '/lawyer/lawOffice/' + that.id
				}).then(function(res) {
					if(res.data.code == 1) {
						that.lawyerOfficeArr.push(res.data.content)
					}
				}).catch(function(err) {

				})
			},
			getAllrecord(index) {
				let that = this
				//与集团合作纪律
				that.$http.request({
					method: 'get',
					url: '/lawyer/cooperateRecord/' + that.id + '?page=' + index + '&size=10'
				}).then(function(res) {
					if(res.data.code == 1) {
						that.recordArr = res.data.content.record.content
						that.totalSize = res.data.content.record.totalElements
					}
				}).catch(function(err) {

				})
			},
			subEvalustion(name) {
				var that = this
				that.$refs[name].validate((valid) => {
					if(valid) {
						that.$Message.success('Success!');
					} else {
						that.$Message.error('请正确填写！');
					}
				})
				console.log(that.$route.query.id)
			},
			_blank(href){
				
				window.location.href = 'http://182.92.235.151:8089/group1/M00/00/02/tlzrl1pyxBaAcjFdAAB4bzKw-Lc443.jpg'
			}
		}
	}
</script>

<style lang="less">
	@baseColor: #000;
	.lawyerdetail_container {
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
							.title {
								align-items: center;
								justify-content: flex-start;
								.icon {
									height: 20px;
									width: 20px;
									background: url(../../assets/icons.png);
									background-position: 0px -30px;
									margin-right: 10px;
								}
								.icon_lawoffice {
									height: 20px;
									width: 20px;
									background: url(../../assets/icons.png);
									background-position: -80px -30px;
									margin-right: 10px;
								}
								.icon_evaluation {
									height: 20px;
									width: 20px;
									background: url(../../assets/icons.png);
									background-position: -240px -30px;
									margin-right: 10px;
								}
								.icon_record {
									height: 20px;
									width: 20px;
									background: url(../../assets/icons.png);
									background-position: -120px -30px;
									margin-right: 10px;
								}
								p {
									font-size: 18px;
									color: #1a1a1a;
									font-weight: 600;
								}
							}
							p {
								font-size: 16px;
								color: #1a1a1a;
								font-weight: 600;
							}
						}
						.form_item {
							padding: 0 40px 20px;
							.ivu-select {
								width: 60%;
							}
							.ivu-input-wrapper {
								width: 60%;
							}
							.ivu-date-picker {
								width: 100%;
							}
							.button_group {
								padding-left: 20%;
							}
						}
						.blacklist_item {
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
		.btn-100 {
			width: 100px;
		}
		.ivu-form-item-label,
		.ivu-form-item-content {
			color: #1a1a1a;
			font-weight: bold;
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