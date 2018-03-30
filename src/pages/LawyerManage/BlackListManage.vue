<template>
	<div id="" class="blacklist_container">
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
									<p style="float: right;">查询条件</p>
								</div>
							</div>
							<div class="form_item">
								<Form ref="searchInfo" :model="baseInfo" label-position="right" :label-width="100" class="searchInfo">
									<Row>
										<Col span="8">
										<FormItem label="律师姓名:" prop="lawyerName">
											<Input v-model="baseInfo.lawyerName" placeholder="请输入律师姓名"></Input>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem label="所属律所:" prop="lawOfficeName">
											<Input v-model="baseInfo.lawOfficeName" placeholder="请输入律师所属律所"></Input>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem label="擅长案件类型:" prop="goodAtId">
											<Select v-model="baseInfo.goodAtId" placeholder="请选择擅长案件类型">
												<Option value="1">刑事</Option>
												<Option value="2">仲裁</Option>
												<Option value="3">民事</Option>
												<Option value="4">咨询</Option>
											</Select>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="8">
										<FormItem label="境内外:" prop="county">
											<Select v-model="baseInfo.county" placeholder="请选择">
												<Option value="1">境内</Option>
												<Option value="2">境外</Option>
											</Select>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem label="省市:" prop="area">
											<Select v-model="baseInfo.area" placeholder="请选择省市" @on-change='provienceChange'>
												<Option v-for='(item,index) in cityArr' :value="item.value" :key='item.index'>{{item.label}}</Option>
											</Select>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem label="区县:" prop="region">
											<Select v-model="baseInfo.region" placeholder="请选择区县">
												<Option v-if="regionList.length>0" v-for='(item,index) in regionList' :value="item.value" :key='item.index'>{{item.label}}</Option>
											</Select>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="8">
										<FormItem label="开始时间:" prop="startTime">
											<DatePicker v-model="baseInfo.startTime" type="date" placeholder="请选择开始时间"></DatePicker>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem label="结束时间:" prop="endTime">
											<DatePicker :options="dateOptionsEnd" v-model="baseInfo.endTime" type="date" placeholder="请选择结束时间"></DatePicker>
										</FormItem>
										</Col>
									</Row>
									<div class="flex btn_group">
										<Button type="primary" icon="refresh" class="blue btn-140" style="margin: 0 5px 0 0;" @click="handleReset('searchInfo')">重置查询调价</Button>
										<Button type="primary" icon="ios-search" class="blue btn-140" style="margin: 0 0 0 5px;" @click="handleSubmit('searchInfo')">开始查询</Button>
									</div>
								</Form>
							</div>
						</div>
						<div class="wrap_item" style="min-height: 200px;">
							<div class="info_title">
								<div class="title flex">
									<div class="icon_result"></div>
									<p>查询结果</p>
								</div>
								<div>
									<Button type="primary" class="blue btn-100" style="display: inline-block; float: right;" @click="applyOut()">申请出库</Button>
								</div>
							</div>
							<div class="blacklist_item">
								<Table border ref="selection" :columns="columns4" :data="dataList" @on-selection-change="getSeletOp"></Table>
								<div style="margin: 10px;overflow: hidden">
									<div style="float: right;">
										<Page :total="totalSize" :current="currentPage" :page-size='5' @on-change="changePage"></Page>
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
	import { mapGetters, mapState, mapActions } from 'vuex'
	import router from '../../router'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import { setStore } from '../../utils'
	import { cityArr, provinceList } from '../../utils/area'
	export default {
		name: 'blackmanage',
		components: {
			lgBreadcrumb
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
			const startLessThanEnd = (rule, value, callback) => {
				var start = this.baseInfo.start;
				var end = this.baseInfo.end;
				console.log(start)
				if((start != '') && (end != '') && (start > end)) {
					callback(new Error('起始日期不能大于结束日期'));
				} else {
					callback();
				};
			};
			const EndLargeThanStart = (rule, value, callback) => {
				var start = this.baseInfo.start;
				var end = this.baseInfo.end;
				console.log(end)
				if((start != '') && (end != '') && (end < start)) {
					callback(new Error('结束日期不能小于起始日期'));
				} else {
					callback();
				};
			};
			return {
				totalSize: 1,
				currentPage: 1,
				baseInfo: {
					lawyerName: '',
					lawOfficeName: '',
					goodAtId: '',
					county: '',
					area: '',
					region: '',
					startTime: '',
					endTime: ''
				},
				isDisabled: false,
				dateOptionsEnd: {},
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
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
						title: '评价单位',
						key: 'appraisalUnitName',
						align: 'center',
					},
					{
						title: '评价内容',
						key: 'appraisalContent',
						align: 'center',
					},
					{
						title: '打分情况',
						key: 'appraisalScore',
						align: 'center',
					},
					{
						title: '律师详情',
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
													id: params.row.busId
												}
											});
										}
									}
								}, '查看')
							]);
						}
					}
				],
				dataList: [],
				path: [{
						'name': '律师库管理',
						'path': ''
					},
					{
						'name': '黑名单管理',
						'path': '/main/lawyerManage/blackListManage'
					},
				],
				dataSelect: [],
				ruleInline: {
					start: [{
							required: false,
							message: 'Please fill in the user name',
							trigger: 'blur'
						},
						{
							required: false,
							validator: startLessThanEnd,
							trigger: 'change'
						}
					],
					end: [{
							required: false,
							message: 'Please fill in the password.',
							trigger: 'blur'
						},
						{
							required: false,
							validator: EndLargeThanStart,
							trigger: 'change'
						}
					]
				},
				//省市区县
				cityArr: [],
				regionList: [],
			}
		},
		mounted() {
			this.getAll(this.currentPage - 1)
		},
		created() {
			this.cityArr = cityArr
			this.getScajlx()
		},
		methods: {
			...mapActions([
				'setBalckList',
				"getScajlx"
			]),
			getAll(index) {
				let that = this;
				console.log(this.baseInfo.lawOfficeName)
				that.$http.request({
					method: 'get',
					url: '/appraisal/findByBlacklist?page=' + index + '&size=5&lawOfficeName=' + this.baseInfo.lawOfficeName + '&goodAtId=' + this.baseInfo.goodAtId + '&county=' + this.baseInfo.county + '&area=' + this.baseInfo.area + '&region=' + this.baseInfo.region + '&startTime=' + this.baseInfo.startTime + '&endTime=' + this.baseInfo.endTime + '&lawyerName=' + this.baseInfo.lawyerName + '',	
				}).then(function(res) {
					that.dataList = res.data.content.contentList;
					that.totalSize = res.data.content.totalElements
				}).catch(function(err) {

				})
			},
			changePage(index) {
				this.currentPage = index;
				this.getAll(this.currentPage - 1)
			},
			handleSubmit(name) {
				if(this.isDisabled == true) {
					this.$Message.error('请正确选择起始时间与结束时间！');
				} else if(this.isDisabled == false) {
					this.getAll(this.currentPage - 1)
				}
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.getAll(this.currentPage - 1)
			},
			getSeletOp(selection) {
				this.dataSelect = selection
			},
			applyOut() {
				if(this.dataSelect.length <= 0) {
					this.$Message.error('请选择律师!');
				} else {
					this.setBalckList(this.dataSelect)
					setStore('blackOutPutList', this.dataSelect)
					this.$router.push({
						path: '/main/lawyerManage/deleteLawyer'
					});
				}
			},
			provienceChange(province) { //根据省市获取区县信息
				let regionArr = [];
				for(let i = 0; i < cityArr.length; i++) {
					if(province == provinceList[i].name) {

						if(province == '北京' || province == '天津' || province == '上海' || province == '重庆') {
							let data = provinceList[i].cityList[0].areaList;
							for(let k = 0; k < data.length; k++) {
								let obj = {
									value: data[k],
									label: data[k]
								}
								regionArr.push(obj)
							}
						} else {
							console.log(provinceList[i])
							if(province != '台湾' && province != '香港' && province != '澳门') {
								let data = provinceList[i].cityList;
								for(let k = 0; k < data.length; k++) {
									let obj = {
										value: data[k].name,
										label: data[k].name
									}
									regionArr.push(obj)
								}
							} else {
								regionArr = []
							}

						}
					}
				}
				//this.baseInfo.region = regionArr.length > 0 ? regionArr[ 0 ].value : '';
				this.regionList = regionArr;
				//this.baseInfo.area = province;
			}
		},
		watch: {
			'baseInfo.startTime' (curVal, oldVal) {
				if(curVal != "" && this.baseInfo.endTime != "" && (curVal > this.baseInfo.endTime)) {
					//this.$Message.error('起始日期不能大于结束日期');
					this.isDisabled = true
				} else if(curVal == "" && this.baseInfo.endTime != "") {
					this.isDisabled = true
				} else if(curVal != "" && this.baseInfo.endTime == "") {
					this.isDisabled = true
				} else {
					this.isDisabled = false
				}
			},
			'baseInfo.endTime' (curVal, oldVal) {
				if(curVal != "" && this.baseInfo.startTime != "" && (curVal < this.baseInfo.startTime)) {
					//this.$Message.error('结束日期不能小于起始日期');
					this.isDisabled = true
				} else if(curVal == "" && this.baseInfo.startTime != "") {
					this.isDisabled = true
				} else if(curVal != "" && this.baseInfo.startTime == "") {
					this.isDisabled = true
				} else {
					this.isDisabled = false
				}
			}
		}

	}
</script>

<style lang="less">
	@baseColor: #000;
	.blacklist_container {
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
									background: url(../../assets/icons.png);
									background-position: -280px -30px;
									margin-right: 10px;
								}
								.icon_result {
									height: 20px;
									width: 20px;
									background: url(../../assets/icons.png);
									background-position: -300px -30px;
									margin-right: 10px;
								}
								p {
									font-size: 18px;
									color: #1a1a1a;
									font-weight: 600;
								}
							}
						}
						.form_item {
							padding: 0px 0px 20px;
							.ivu-select {
								width: 250px;
							}
							.ivu-input {
								width: 250px;
							}
							.ivu-date-picker {
								width: 250px
							}
							.button_group {
								padding-left: 20%;
							}
							.ivu-btn-primary[disabled] {
								color: #fff !important;
								background: #396dd6 !important;
								border-color: #396dd6 !important;
							}
						}
						.blacklist_item {
							padding: 0px 30px 20px;
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
		.btn-140 {
			width: 140px;
		}
		.btn-100 {
			width: 100px;
		}
		.ivu-form-item-label {
			color: #000000;
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