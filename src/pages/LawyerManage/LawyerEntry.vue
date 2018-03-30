<template>
	<div id="" class="lawyerentry_container">
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
									<p>律师录入</p>
								</div>
							</div>
							<div class="form_item">
								<Modal v-model="modalAdd" width="900">
									<p slot="header" style="color:#396dd6;">
										<Icon type="navicon-round"></Icon>
										<span>&nbsp;添加合作历史</span>
									</p>
									<div>
										<cooperate-history ref="addHistory" @submit="addHistoryCoop('formValidate')"></cooperate-history>
									</div>
									<div slot="footer">
										<div class="flex">
											<Button type="primary" class="green" style="width: 100px;" @click="addHistoryCoop('formValidate')">确认</Button>
											<Button class="white" style="width: 100px;" @click="modalAdd = false">取消</Button>
										</div>
									</div>
								</Modal>
								<Form ref="baseInfo" :model="baseInfo" :rules="ruleBaseInfo" label-position="right" :label-width="140">
									<Row>
										<Col span="10">
										<FormItem label="姓名:" prop="lawyerName">
											<Input class="forminput" v-model="baseInfo.lawyerName" placeholder="请输入律师姓名"></Input>
										</FormItem>
										</Col>
										<Col span="10" offset="3">
										<FormItem label="电话:" prop="phone">
											<Input class="forminput" v-model="baseInfo.phone" placeholder="请输入电话号码"></Input>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="10">
										<FormItem label="执业证号:" prop="occupationCertificateNo">
											<Input class="forminput" v-model="baseInfo.occupationCertificateNo" placeholder="请收执业证号"></Input>
										</FormItem>
										</Col>
										<Col span="10" offset="3">
										<FormItem label="手机:" prop="lawyerMobile">
											<Input class="forminput" v-model="baseInfo.lawyerMobile" placeholder="请输入手机号码"></Input>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<!--<Col span="4">
										<FormItem label="擅长业务范围:" prop="areasExpertiseId" class="business1">
											<Select v-model="baseInfo.areasExpertiseId" placeholder="请选择">
												<Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
											</Select>
										</FormItem>
										</Col>-->
										<Col span="10">
										<FormItem label="擅长业务范围:" prop="areasExpertiseId" class="business1">
											<Select class="forminput" v-model="baseInfo.areasExpertiseId" placeholder="请选择">
												<Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
											</Select>
										</FormItem>
										</Col>
										<Col span="10" offset="3">
										<FormItem label="性别:" prop="lawyerSex">
											<RadioGroup v-model="baseInfo.lawyerSex">
												<Radio label="男">男</Radio>
												<Radio label="女">女</Radio>
											</RadioGroup>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="10">
										<FormItem label="电子邮箱:" prop="email">
											<Input class="forminput" v-model="baseInfo.email" placeholder="请输入电子邮箱"></Input>
										</FormItem>
										</Col>
										<Col span="10" offset="3">
										<FormItem label="是否常年法律顾问:" prop="commonlyUseFlag">
											<RadioGroup v-model="baseInfo.commonlyUseFlag">
												<Radio label="1">是</Radio>
												<Radio label="0">否</Radio>
											</RadioGroup>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="10">
										<FormItem label="毕业院校:" prop="school">
											<Input class="forminput" v-model="baseInfo.school" placeholder="请输入毕业院校"></Input>
										</FormItem>
										</Col>
										<Col span="10" offset="3">
										<FormItem label="职务:" prop="duty">
											<Input class="forminput" v-model="baseInfo.duty" placeholder="请输入个人公司职务"></Input>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="10">
										<FormItem label="所属律所:" prop="lawOfficeDTO.id" :rules="{required: true, message: '不能为空',type:'number', trigger: 'change'}">
											<Select class="forminput" v-model="baseInfo.lawOfficeDTO.id" placeholder="请选择所属律所">
												<Option v-for="item in allLawOffice" :value="item.id" :key="item.id">{{item.lawOfficeName}}</Option>
											</Select>
										</FormItem>
										</Col>
										<Col span="10" offset="3">
										<FormItem label="学历:" prop="educationId">
											<Select class="forminput" v-model="baseInfo.educationId" placeholder="请选择学历">
												<Option v-for="item in lsxl" :value="item.id" :key="item.dictName">{{item.dictName}}</Option>
											</Select>
										</FormItem>
										</Col>
									</Row>
									<Row>
										
										<Col span="10" >
										<FormItem label="社会职务:" prop="socialPosition">
											<Input class="forminput" v-model="baseInfo.socialPosition" placeholder="请输入个人社会职务"></Input>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="23">
										<FormItem label="专长:" prop="specialty">
											<Input v-model="baseInfo.specialty" @input="descInputSpeciality" type="textarea" :rows="4" :maxlength="1000" style="width: 95%;" placeholder="请输入个人专长"></Input>
											<p>剩余字数: <span style="color: red;">{{surplus}}</span></p>
										</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="23">
										<FormItem label="律师简介:" prop="introduction">
											<Input v-model="baseInfo.introduction" @input="descInputDescription" type="textarea" :rows="4" :maxlength="1000" style="width: 95%;" placeholder="请输入律师简介"></Input>
											<p>剩余字数: <span style="color: red;">{{remnant}}</span></p>
										</FormItem>
										</Col>
									</Row>
									<!--<Row>        
									        <Col span="24">
									            <FormItem label="和集团合作历史:">
										           <Button type="primary" class="blue btn-100" icon="plus" @click="modalAdd = true">添加</Button>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>
									    	<FormItem label="">
									    		<Table border ref="cooperateHistory" :columns="historys" :data="cooperationRecord" style="width: 95%;"></Table>
									    	</FormItem>
									    </Row>-->
									<Row>
										<Col span="24">
										<FormItem label="相关附件:" prop="attachmentInfoDTOs">
											<Upload name="attachmentFile" 
												:max-size='10240'
												:format="FileFormat"
												:before-upload="beforeUpload" 
												:on-progress="upLoadProgress" 
												:on-success="upLoadSuccess" 
												:on-remove="removeUpload" 
												action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
												<Button type="primary" class="blue btn-100" icon="plus">添加</Button>
											</Upload>
										</FormItem>
										</Col>
									</Row>
									<div class="flex btn_group">
										<Button type="primary" class="blue btn-100" style="margin: 0 5px 0 0;" @click="handleSubmit('baseInfo')">保存</Button>
										<Button class="white btn-100" style="margin: 0 0 0 5px;" @click="handleReset('baseInfo')">取消</Button>
									</div>
								</Form>
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
	import CooperateHistory from '../../components/CooperateHistory.vue'
	 import {fileFormat } from '../../utils'
	export default {
		name: 'blackmanage',
		components: {
			lgBreadcrumb,
			CooperateHistory
		},
		computed: {
			...mapGetters([
				'Token'
			]),
			...mapState([
				"scajlx",
				"lsxl"
			]),
			FileFormat(){
            	return fileFormat
           	},
		},
		data() {
			const mobileVal = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入手机号'));
				} else {
					let reg = /^1[34578]\d{9}$/;
					if(reg.test(value)) {
						// 对第二个密码框单独验证
						callback();
					} else {
						callback(new Error('请输入正确的手机号'));
					}

				}
			};
			const celphoneNum = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入电话号码'));
				} else {
					let reg = /^0\d{2,3}-?\d{7,8}$/;
					if(reg.test(value)) {
						// 对第二个密码框单独验证
						callback();
					} else {
						callback(new Error('请输入正确的电话号码'));
					}

				}
			};
			const noChinese = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入执行许可证号'));
				} else {
					let reg = /^[\x01-\x7f]*$/;
					let regs = /^[A-Za-z0-9]{17}$/
					if(reg.test(value)&&regs.test(value)) {
						// 对第二个密码框单独验证
						callback();
					} else {
						callback(new Error('执行许可证号为17位数字代码并不能含有中文'));
					}

				}
			};
			const emailVal = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入邮箱地址'));
				} else {
					let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
					if(reg.test(value)) {
						callback();
					} else {
						callback(new Error('请输入正确的邮箱地址'));
					}

				}
			};
			return {
				totalSize: 10,
				currentPage: 1,
				remnant: 1000,
				surplus: 1000,
				modalAdd: false,
				baseInfo: {
					lawyerName: '',
					phone: '',
					occupationCertificateNo: '',
					lawyerMobile: '',
					areasExpertiseId: '',
					areasExpertiseSecondId: '',
					lawyerSex: '男',
					email: '',
					commonlyUseFlag: '1',
					school: '',
					socialPosition: '',
					lawOfficeDTO: {
						id: ''
					},
					educationId: '',
					duty: '',
					specialty: '',
					introduction: '',
					attachmentInfoDTOs: [],
					cooperationRecord: '',
					storageFlag: 0,
					overseasFlag: 0
				},
				//用来存储已经上传的所有文件，以便删除获取
				allFileList: [],
				path: [{
						'name': '律师库管理',
						'path': ''
					},
					{
						'name': '律师录入',
						'path': '/main/lawyerManage/lawyerEntry'
					},
				],
				cooperationRecord: [],
				ruleBaseInfo: {
					lawyerName: [{
						required: true,
						message: "不能为空",
						trigger: "blur"
					}],
					phone: [{
						required: true,
						validator: celphoneNum,
						trigger: 'blur'
					}],
					occupationCertificateNo: [{
						required: true,
						validator: noChinese,
						trigger: "blur"
					}],
					lawyerMobile: [{
						required: true,
						validator: mobileVal,
						trigger: 'blur'
					}],
					areasExpertiseId: [{
						required: true,
						type: "number",
						message: "不能为空",
						trigger: "change"
					}],
					areasExpertiseSecondId: [{
						required: true,
						type: "number",
						message: "不能为空",
						trigger: "change"
					}],
					lawyerSex: [{
						required: true,
						message: "不能为空",
						trigger: "change"
					}],
					email: [{
						required: true,
						validator: emailVal,
						trigger: 'blur'
					}],
					commonlyUseFlag: [{
						required: true,
						message: "不能为空",
						trigger: "change"
					}],
					school: [{
						required: true,
						message: "不能为空",
						trigger: "blur"
					}],
					educationId: [{
						required: true,
						type: "number",
						message: "不能为空",
						trigger: "change"
					}],
					duty: [{
						required: true,
						message: "不能为空",
						trigger: "blur"
					}],
					specialty: [{
						required: true,
						message: "不能为空",
						trigger: "blur"
					}],
					introduction: [{
						required: true,
						message: "不能为空",
						trigger: "blur"
					}],
				},
				historys: [{
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
						key: 'caseNum',
						align: 'center',
					},
					{
						title: '合作单位',
						key: 'cooperator',
						align: 'center',
					},
					{
						title: '合作时间',
						key: 'time',
						align: 'center',
						render: (h, params) => {
							return h('span', [
								h('span', {
									props: {
										size: 'small'
									}
								}, this.transferTime(params.row.time))
							]);
						}
					},
					{
						title: '案件处理结果',
						key: 'caseResult',
						align: 'center',
					},
					{
						title: '律师费用（元）',
						key: 'counselFee',
						align: 'center',
					},
				],
				historydata: [],
				allLawOffice: []
			}
		},
		mounted() {
			this.getAllLawOffice()
		},
		created() {
			this.getScajlx()
			this.getLSXL()
		},
		methods: {
			...mapActions([
				"getScajlx",
				"getLSXL"
			]),
			handleSubmit(name) {
				var that = this
				let educationId = that.baseInfo.educationId
				let areasExpertiseId = that.baseInfo.areasExpertiseId
				let areasExpertiseSecondId = that.baseInfo.areasExpertiseSecondId
				let educationNames;
				let areasExpertiseName;
				let areasExpertiseSecondName;
				switch(educationId) {
					case 86:
						educationNames = '大专'
						break;
					case 87:
						educationNames = '本科'
						break;
					case 88:
						educationNames = '硕士'
						break;
					case 89:
						educationNames = '博士'
						break;
					default:
						break;
				}
				switch(areasExpertiseId) {
					case 98:
						areasExpertiseName = '刑事'
						break;
					case 99:
						areasExpertiseName = '仲裁'
						break;
					case 100:
						areasExpertiseName = '民事'
						break;
					case 101:
						areasExpertiseName = '咨询'
						break;
					default:
						break;
				}
				switch(areasExpertiseSecondId) {
					case 98:
						areasExpertiseSecondName = '刑事'
						break;
					case 99:
						areasExpertiseSecondName = '仲裁'
						break;
					case 100:
						areasExpertiseSecondName = '民事'
						break;
					case 101:
						areasExpertiseSecondName = '咨询'
						break;
					default:
						break;
				}
				that.baseInfo['educationName'] = educationNames
				that.baseInfo['areasExpertiseName'] = areasExpertiseName
				that.baseInfo['areasExpertiseSecondName'] = areasExpertiseSecondName
				that.$refs[name].validate((valid) => {
					if(valid) {
						that.$http.request({
							method: 'post',
							url: '/lawyer/lawyers',
							data: that.baseInfo
						}).then(function(res) {
							if(res.data.code == 1) {
								that.$Message.success("添加成功")
								that.$router.push({
									path: '/main/lawyerManage/lawyerQuery'
								})
							}
						}).catch(function(err) {

						})
					} else {
						that.$Message.error('请正确填写！');
					}
				})
				console.log(that.baseInfo)
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
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			upLoadSuccess(response, file, fileList) {
				let obj = {};
				for(const key in file) {
					obj[key] = file[key];
				}
				this.allFileList.push(obj)
				if(response.code == 1) {
					let obj = {}
					obj['attPath'] = response.content

					let nameArr = file.name.split(".")
					let length = nameArr.length
					let type = nameArr[length - 1]
					let att_type;
					if(type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'bmp' || type == 'gif' || type == 'psd') {
						att_type = 1;
					} else if(type == 'doc' || type == 'docx' || type == 'txt' || type == 'xlsx') {
						att_type = 2;
					} else if(type == 'zip' || type == 'rar') {
						att_type = 3;
					} else {
						att_type = 4;
					}
					console.log(file)
					obj['attType'] = att_type;
					obj['busType'] = 4
					obj['attName'] = file.name
					this.baseInfo.attachmentInfoDTOs.push(obj)
				}
			},
			// 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
			upLoadProgress(event, file, fileList) {
				//this.baseInfo.attachmentInfoDTOs = fileList;
			},
			// 上传之前
			beforeUpload(file) {

			},
			// 删除
			removeUpload(file, fileList) {

				let idArr = []
				for(let i = 0; i < this.allFileList.length; i++) {
					idArr.push(this.allFileList[i].uid)
				}
				console.log(file.uid)
				console.log(idArr)
				console.log(idArr.indexOf(file.uid))
				this.baseInfo.attachmentInfoDTOs.splice(idArr.indexOf(file.uid), 1)
			},
			descInputDescription() {
				var txtVal = this.baseInfo.introduction.length;
				this.remnant = 1000 - txtVal;
			},
			descInputSpeciality() {
				var txtVal = this.baseInfo.specialty.length;
				this.surplus = 1000 - txtVal;
			},
			addHistoryCoop(name) {
				var that = this
				let data = that.$refs.addHistory.formValidate; //表单参数
				let obj = {};
				for(const key in data) {
					obj[key] = data[key];
				}
				console.log(data)
				this.$refs.addHistory.$refs.formValidate.validate((valid) => {
					if(valid) {
						that.cooperationRecord.push(obj)
						this.$refs.addHistory.$refs.formValidate.resetFields();
						that.modalAdd = false
					} else {
						that.$Message.error('Fail!');
					}
				})
			},
			transferTime(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			}
		}
	}
</script>

<style lang="less">
	@baseColor: #000;
	.lawyerentry_container {
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
						.form_item {
							padding: 0px 20px 20px;
							.forminput{
								width: 250px;
							}
						}
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
									background-image: url("../../assets/icons.png");
									margin-right: 10px;
									background-position: -40px -30px;
								}
								p {
									font-size: 18px;
									color: #1a1a1a;
									font-weight: 600;
								}
							}
						}
						.business1 {
							.ivu-form-item-content {
								/*width: 60%;*/
							}
						}
						.business2 {
							.ivu-form-item-content {
								margin-left: 75px !important;
								width: 60%;
							}
						}
						.ivu-date-picker {
							width: 100%;
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
			width: 100px !important;
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
		.ivu-table {
			width: 100% !important;
		}
	}
</style>