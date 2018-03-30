<template>
	<div class="lawyerquery_container">
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
									<p>查询条件</p>
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
											<!--<Input v-model="baseInfo.lawOfficeName" placeholder="请输入律师所属律所"></Input>-->
											<Select class="forminput" v-model="baseInfo.lawOfficeName" placeholder="请选择所属律所">
												<Option v-for="item in allLawOffice" :value="item.lawOfficeName" :key="item.id">{{item.lawOfficeName}}</Option>
											</Select>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem label="擅长案件类型:" prop="areasExpertiseId">
											<Select v-model="baseInfo.areasExpertiseId" placeholder="请选择擅长案件类型">
												<Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
											</Select>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="8">
										<FormItem label="境内外:" prop="overseasFlag">
											<Select v-model="baseInfo.overseasFlag" placeholder="请选择">
												<Option value=0>境内</Option>
												<Option value=1>境外</Option>
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
										<!--<Col span="8">
										<FormItem label="区县:" prop="region">
											<Select v-model="baseInfo.region" placeholder="请选择区县">
												<Option v-if="regionList.length>0" v-for='(item,index) in regionList' :value="item.value" :key='item.index'>{{item.label}}</Option>
											</Select>
										</FormItem>
										</Col>-->
										<Col span="8">
										<FormItem label="" prop="oppositeFlag">
											<RadioGroup v-model="baseInfo.oppositeFlag">
												<Radio label='0'>我方律师</Radio>
												<Radio label='1'>相对方律师</Radio>
											</RadioGroup>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="8">
										<FormItem label="开始时间:" prop="startTime">
											<DatePicker v-model="baseInfo.startTime" type="datetime" placeholder="请选择开始时间"></DatePicker>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem label="结束时间:" prop="endTime">
											<DatePicker v-model="baseInfo.endTime" type="datetime" placeholder="请选择结束时间"></DatePicker>
										</FormItem>
										</Col>
										
									</Row>
									<div class="flex btn_group">
										<Button type="primary" icon="refresh" class="blue btn-140" style="margin: 0 5px 0 0;" @click="handleReset('searchInfo')">重置</Button>
										<Button type="primary" icon="ios-search" class="blue btn-140" style="margin: 0 0 0 5px;" @click="searchLawyerInfo()">开始查询</Button>
									</div>
								</Form>
							</div>
						</div>
						<div class="wrap_item" style="min-height: 200px;">
							<template v-if="baseInfo.oppositeFlag==0">
								<div class="info_title">
									<div class="title flex">
										<div class="icon_result"></div>
										<p>查询结果</p>
									</div>
									<div>
										<Button type="primary" class="blue btn-100 right_content" @click="applyIn()">申请入库</Button>
										<Button type="primary" class="blue btn-100 right_content" @click="applyOut()">申请出库</Button>
										<p class="right_content">合作案件律师费用总和（万元）:<span>{{totalCost}}</span></p>
									</div>
								</div>
								<div class="lawyer_item">
									<Table border ref="selection" :columns="lawyerInfo" :data="lawyerDataList" @on-selection-change="getSeletOp"></Table>
									<div style="margin: 10px;overflow: hidden">
										<div style="float: right;">
											<Page :total="totalSize" :current="currentPage" :page-size='10' @on-change="lawyerChangePage"></Page>
										</div>
									</div>
								</div>
							</template>
							
							<template v-else>
								<div class="info_title">
									<div class="title flex">
										<div class="icon_result"></div>
										<p>查询结果</p>
									</div>
									<div style="float: right;">
										<Button type="primary" class="blue btn-100 right_content" @click="toLawyerEntry()">律师录入</Button>
									</div>
								</div>
								<div class="lawyer_item">
									<Table border ref="selection" :columns="oppositeLawyer" :data="oppositeDataList" @on-selection-change=""></Table>
									<div style="margin: 10px;overflow: hidden">
										<div style="float: right;">
											<Page :total="OtotalSize" :current="oCurrentPage" :page-size='10' @on-change="olawyerChangePage"></Page>
										</div>
									</div>
								</div>
							</template>
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
	import { setStore } from '../../utils'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import { cityArr, provinceList } from '../../utils/area'
	import qs from 'qs';
	export default {
		name: 'LawyerQuery',
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
			return {
				totalSize: 10,
				currentPage: 1,
				OtotalSize: 10,
				oCurrentPage: 1,
				isDisabled: false,
				baseInfo: {
					lawyerName: '',
					lawOfficeName: '',
					overseasFlag: '',
					area: '',
					region: '',
					areasExpertiseId: '',
					startTime: '',
					endTime: '',
					oppositeFlag: 1
				},
				totalCost:'',
				allLawOffice: [],
				lawyerInfo: [{
						type: 'selection',
						width: 60,
						align: 'center'
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
						title: '合作律师费总数（万元）',
						key: 'lawyerCost',
						align: 'center',
					},
					{
						title: '律师评级',
						key: 'lawyerRate',
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
					{
						title: '是否库内律师',
						key: '',
						align: 'center',
						render: (h, params) => {
							if(params.row.storageFlag == 1) {
								return h('div', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px',
											color: '#396dd6',
										},
									}, '是')
								]);
							} else if(params.row.storageFlag == 0) {
								return h('span', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px',
											color: '#396dd6',
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
										style: {
											marginRight: '5px',
											color: '#396dd6',
										},
									}, '')
								]);
							}
						}
					}
				],
				lawyerDataList: [],
				oppositeLawyer: [{
						type: 'selection',
						width: 60,
						align: 'center'
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
						title: '地区',
						key: 'area',
						align: 'center',
					},
					{
						title: '参与案件',
						key: 'casesType',
						align: 'center',
					},
					{
						title: '案件编号',
						key: 'casesCode',
						align: 'center',
					},
					{
						title: '参与时间',
						key: 'cooperationStartTime',
						align: 'center',
					},
					{
						title: '案件处理结果',
						key: 'judgmentResult',
						align: 'center',
					},
					{
						title: '详细评价',
						key: 'lawyerRate',
						align: 'center',
					},
					{
						title: '律师评级',
						key: 'lawyerRate',
						align: 'center',
					}
				],
				oppositeDataList: [],
				path: [{
						'name': '律师库管理',
						'path': ''
					},
					{
						'name': '律师查询',
						'path': '/main/lawyerManage/lawyerQuery'
					},
				],
				dataSelect: [],
				//省市区县
				cityArr: [],
				regionList: [],
			}
		},
		mounted() {
			this.getAllLawOffice()
			if(this.baseInfo.oppositeFlag == 0) {
				this.getAll(this.currentPage - 1)
			} else {
				this.getAll(this.oCurrentPage - 1)
			}
			this.provienceChange('北京')
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
				that.baseInfo['page'] = index
				that.baseInfo['size'] = 10
				if(that.baseInfo.startTime && that.baseInfo.endTime){
					that.baseInfo['startTime'] = this.formatDate(that.baseInfo.startTime)
					that.baseInfo['endTime'] = this.formatDate(that.baseInfo.endTime)
				}
				that.$http.request({
					method: 'post',
					url: '/lawyer/listLawyer',
					data: that.baseInfo
				}).then(function(res) {
					if(that.baseInfo.oppositeFlag == 0) {
						if(res.data.code == 1) {
							that.lawyerDataList = res.data.content.result.content;
							that.totalSize = res.data.content.result.totalElements
							that.totalCost = res.data.content.totalCost
						} else {
							that.lawyerDataList = []
							that.totalSize = 0
						}
					} else if(that.baseInfo.oppositeFlag == 1) {
						if(res.data.code == 1) {
							that.oppositeDataList = res.data.content.content;
							that.OtotalSize = res.data.content.totalElements
						} else {
							that.oppositeDataList = []
							that.OtotalSize = 0
						}
					}
				}).catch(function(err) {

				})
			},
			getAllLawOffice() {
				let that = this
				that.$http.request({
					method: 'get',
					url: '/lawOffice/allName'
				}).then(function(res) {
					if(res.data.code == 1) {
						that.allLawOffice = res.data.content
					}
				}).catch(function(err) {

				})
			},
			formatDate(dates){
				var d = new Date(dates)
				var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
				return datetime
			},
			lawyerChangePage(index) {
				this.currentPage = index;
				this.getAll(this.currentPage - 1)
			},
			olawyerChangePage(index) {
				this.oCurrentPage = index;
				this.getAll(this.oCurrentPage - 1)
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				if(this.baseInfo.oppositeFlag == 0) {
					this.getAll(this.currentPage - 1)
				} else {
					this.getAll(this.oCurrentPage - 1)
				}
			},
			searchLawyerInfo() {
				if(this.isDisabled == true) {
					this.$Message.error('请正确选择起始时间与结束时间！');
				} else if(this.isDisabled == false) {
					if(this.baseInfo.oppositeFlag == 1) {
						this.oppositeDataList = []
						this.getAll(this.currentPage - 1)
					} else {
						this.lawyerDataList = []
						this.getAll(this.oCurrentPage - 1)
					}
				}

			},
			getSeletOp(selection) {
				this.dataSelect = selection
			},
			applyIn() {
				if(this.dataSelect.length <= 0) {
					this.$Message.error('请选择律师!');
				} else {
					let statusArr = [];
					for(let i = 0; i < this.dataSelect.length; i++) {
						statusArr.push(this.dataSelect[i].storageFlag)
					}
					if(statusArr.indexOf(1) == -1) {
						this.setBalckList(this.dataSelect)
						setStore('blackOutPutList', this.dataSelect)
						this.$router.push({
							path: '/main/lawyerManage/addLawyer',
							query:{isqueryPage:1}
						});
					} else {
						this.$Message.error('请统一选择库外律师!');
					}
				}
			},
			applyOut() {
				if(this.dataSelect.length <= 0) {
					this.$Message.error('请选择律师!');
				} else {
					let statusArr = [];
					for(let i = 0; i < this.dataSelect.length; i++) {
						statusArr.push(this.dataSelect[i].storageFlag)
					}
					if(statusArr.indexOf(0) == -1) {
						this.setBalckList(this.dataSelect)
						setStore('blackOutPutList', this.dataSelect)
						this.$router.push({
							path: '/main/lawyerManage/deleteLawyer',
							query:{isqueryPage:1}
						});
					} else {
						this.$Message.error('请统一选择库内律师!');	
					}
				}	
			},
			toLawyerEntry(){
				this.$router.push({
							path: '/main/lawyerManage/lawyerEntry'
						});
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
		}
	}
</script>

<style lang="less">
	@baseColor: #000;
	.lawyerquery_container {
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
							padding: 0 0 20px;
							.ivu-select {
								width: 90%;
							}
							.ivu-input-wrapper {
								width: 90%;
							}
							.ivu-date-picker {
								width: 100%;
							}
							.button_group {
								padding-left: 20%;
							}
						}
						.lawyer_item {
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