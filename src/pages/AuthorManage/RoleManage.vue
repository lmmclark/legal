<template>
	<div class="container">
		<div class='layout flex'>
			<div class="layout-header flex">
				<span><Icon type="home"></Icon>&nbsp;&nbsp;角色管理</span>
				<router-link class='link' to="/main">
					<Icon type="close-round"></Icon>
				</router-link>
			</div>
			<div class="layout-content">
				<div class='action-top'>
					<Row>
						<Col span="12">
						<div class='action-top-left'>
							<Dropdown trigger="click" placement="bottom-start">
								<Button class="blue" type="primary" icon="person-add">新增</Button>
								<DropdownMenu slot="list">
									<DropdownItem><span @click="showNewFunRole">功能角色</span></DropdownItem>
									<DropdownItem><span @click="showNewRole">数据角色</span></DropdownItem>
								</DropdownMenu>
							</Dropdown>

							<!--新建功能角色-->
							<Modal v-model="modalNewFun" width="600" class-name="new vertical-center-modal">
								<p slot="header">
									<span>&nbsp;新建功能角色</span>
								</p>
								<div>
									<Form ref="formValidateFun" :model="formValidateFun" :rules="ruleValidateFun" :label-width="100">
										<Row>
											<Col span="12">
											<FormItem label="名称：" prop="roleName">
												<Input v-model="formValidateFun.roleName"></Input>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="编码：" prop="roleCode">
												<Input v-model="formValidateFun.roleCode"></Input>
											</FormItem>
											</Col>
										</Row>
										<Row>
											<Col span="12">
											<FormItem label="类型：">
												<p>功能角色</p>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="分类：">
												<p>普通角色</p>
											</FormItem>
											</Col>
										</Row>
										<FormItem label="数据范围：">
											<p>无需选择范围</p>
										</FormItem>
										<Row>
											<Col span="12">
											<FormItem label="开始时间：" prop="roleStartTime">
												<DatePicker :options="disabledFunStartTime" @on-change="startFunTime" v-model="formValidateFun.roleStartTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择开始时间"></DatePicker>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="结束时间：" prop="roleEndTime">
												<DatePicker :options="disabledFunEndTime" @on-change="endFunTime" v-model="formValidateFun.roleEndTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择结束时间"></DatePicker>
											</FormItem>
											</Col>
										</Row>
										<FormItem label="描述：" prop="desc">
											<Input v-model="formValidateFun.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
										</FormItem>
										<div class="parentRole">
											<FormItem prop="parentRole">
												<div class="parentTable">
													<Table v-model="formValidateFun.parentRole" stripe highlight-row ref="parentRole" :columns="parentList" :data="parentRoleData" no-data-text="暂无数据"></Table>
												</div>
											</FormItem>

										</div>
									</Form>
								</div>
								<div slot="footer" class='modalNew'>
									<Row type="flex" align="middle" justify="space-between">
										<Col span="18" style="text-align: left;">
										<Button class="white" type="text" @click="modalAddParentRole" icon="plus">添加父角色</Button>
										<Button class="white" type="text" @click="modalDelParentRole" icon="trash-a">删除父角色</Button>
										</Col>
										<Col span="6">
										<Button type="primary" @click="submitNewRoleFun('formValidateFun')">确定</Button>
										<Button type="ghost" @click="cancel">取消</Button>
										</Col>
									</Row>
								</div>
							</Modal>

							<!--新建数据角色-->
							<Modal v-model="modalNew" width="600" class-name="new vertical-center-modal">
								<p slot="header">
									<span>&nbsp;新建数据角色</span>
								</p>
								<div>
									<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
										<Row>
											<Col span="12">
											<FormItem label="名称：" prop="roleName">
												<Input v-model="formValidate.roleName"></Input>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="编码：" prop="roleCode">
												<Input v-model="formValidate.roleCode"></Input>
											</FormItem>
											</Col>
										</Row>
										<Row>
											<Col span="12">
											<FormItem label="类型：">
												<p>数据角色</p>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="分类：" prop="roleSort">
												<p>特殊角色</p>
											</FormItem>
											</Col>
										</Row>
										<FormItem label="数据范围：" prop="dataRange">
											<Button v-model="formValidate.dataRange" type="ghost" class="dataRange" @click="modalChooseRangeShow">
									          	<span style="">{{dataRangeName}}</span>
									          	<div class="dataRange_pos"></div>
									        </Button>
										</FormItem>
										<Row>
											<Col span="12">
											<FormItem label="开始时间：" prop="roleStartTime">
												<DatePicker :options="disabledRoleStartTime" @on-change="startRoleTime" v-model="formValidate.roleStartTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择开始时间"></DatePicker>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="结束时间：" prop="roleEndTime">
												<DatePicker :options="disabledRoleEndTime" @on-change="endRoleTime" v-model="formValidate.roleEndTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择结束时间"></DatePicker>
											</FormItem>
											</Col>
										</Row>
										<FormItem label="描述：" prop="desc">
											<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
										</FormItem>
										<div class="parentRole">
											<FormItem prop="parentRole">
												<div class="parentTable">
													<Table v-model="formValidate.parentRole" stripe highlight-row ref="parentRole" :columns="parentList" :data="parentRoleData" no-data-text="暂无数据"></Table>
												</div>
											</FormItem>

										</div>
									</Form>
								</div>
								<div slot="footer" class='modalNew'>
									<Row type="flex" align="middle" justify="space-between">
										<Col span="18" style="text-align: left;">
										<Button class="white" type="text" @click="modalAddParentRole" icon="plus">添加父角色</Button>
										<Button class="white" type="text" @click="modalDelParentRole" icon="trash-a">删除父角色</Button>
										</Col>
										<Col span="6">
										<Button type="primary" @click="submitNewRole('formValidate')">确定</Button>
										<Button type="ghost" @click="cancel">取消</Button>
										</Col>
									</Row>
								</div>
							</Modal>

							<!--编辑角色-->
							<Modal v-model="modalEdit" width="600" class-name="new vertical-center-modal">
								<p slot="header">
									<span>&nbsp;编辑角色</span>
								</p>
								<div>
									<Form ref="formEditValidate" :model="formEditValidate" :rules="ruleEditValidate" :label-width="100">
										<Row>
											<Col span="12">
											<FormItem label="名称：" prop="roleName">
												<Input v-model="formEditValidate.roleName"></Input>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="编码：" prop="roleCode">
												<Input v-model="formEditValidate.roleCode"></Input>
											</FormItem>
											</Col>
										</Row>
										<Row>
											<Col span="12">
											<FormItem label="类型：">
												<p v-if='this.editRoleSort == "普通角色"'>功能角色</p>
												<p v-else>数据角色</p>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="分类：" prop="roleSort">
												<RadioGroup v-model="editRoleSort">
													<Radio label="普通角色"></Radio>
													<Radio label="特殊角色"></Radio>
												</RadioGroup>
											</FormItem>
											</Col>
										</Row>
										<FormItem label="数据范围：" prop="dataRange">
											<p v-if='this.editRoleSort == "普通角色"'>无需选择数据范围</p>
											<Button v-model="formEditValidate.dataRange" v-else type="ghost" class="dataRange" @click="modalChooseRangeShow">
									          	<span style="">{{dataRangeName}}</span>
									          	<div class="dataRange_pos"></div>
									        </Button>
										</FormItem>
										<Row>
											<Col span="12">
											<FormItem label="开始时间：" prop="roleStartTime">
												<DatePicker :options="disabledRoleStartTime" @on-change="startRoleTime" v-model="formEditValidate.roleStartTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择开始时间"></DatePicker>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="结束时间：" prop="roleEndTime">
												<DatePicker :options="disabledRoleEndTime" @on-change="endRoleTime" v-model="formEditValidate.roleEndTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择结束时间"></DatePicker>
											</FormItem>
											</Col>
										</Row>
										<FormItem label="描述：" prop="desc">
											<Input v-model="formEditValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
										</FormItem>
										<div class="parentRole">
											<FormItem prop="parentRole">
												<div class="parentTable">
													<Table v-model="formEditValidate.parentRole" stripe highlight-row ref="parentRole" :columns="parentList" :data="parentRoleData" no-data-text="暂无数据"></Table>
												</div>
											</FormItem>

										</div>
									</Form>
								</div>
								<div slot="footer" class='modalNew'>
									<Row type="flex" align="middle" justify="space-between">
										<Col span="18" style="text-align: left;">
										<Button class="white" type="text" @click="modalAddParentRole" icon="plus">添加父角色</Button>
										<Button class="white" type="text" @click="modalDelParentRole" icon="trash-a">删除父角色</Button>
										</Col>
										<Col span="6">
										<Button type="primary" @click="submitEditRole('formEditValidate')">确定</Button>
										<Button type="ghost" @click="cancel">取消</Button>
										</Col>
									</Row>
								</div>
							</Modal>

							<!--  选择范围模态框  -->
							<Modal v-model="modalChooseRange" width="400" class-name='chooseRange vertical-center-modal'>
								<p slot="header">
									<span>&nbsp;选择数据范围</span>
								</p>
								<div>
									<Input v-model="searchOrg" placeholder="搜索" @on-enter='searchOrgIpt'>
									<Button class="search" slot="append" icon="search" @click='searchOrgIpt'></Button>
									</Input>
									<div class="range_list">
										<Tree :data="orgTree" ref="orgtree" :render="renderContent" class="orgtree"></Tree>
									</div>
								</div>
								<div slot="footer">
									<Button class="green" type="primary" @click="confirmTree">确定</Button>
									<Button type="ghost" @click="cancelRange">取消</Button>
								</div>
							</Modal>
							<!--添加父角色模态框-->
							<Modal v-model="modalAddParent" width="580" class-name='addParent vertical-center-modal'>
								<p slot="header">
									<Icon type="plus-round"></Icon>
									<span>&nbsp;添加父角色</span>
								</p>
								<div>
									<Input v-model="searchRoleParent" placeholder="搜索" style="width: 260px" @on-enter='searchRoleParentIpt'>
									<Button class="search" slot="append" icon="search" @click='searchRoleParentIpt'></Button>
									</Input>
									<div class="addParent_list">
										<Table stripe highlight-row @on-row-click='roleParentSel' ref="selectionParent" :columns="roleParentSelect" :data="roleParentData" no-data-text="暂无数据"></Table>
									</div>

								</div>
								<div slot="footer">
									<Row type="flex" align="middle" justify="space-between">
										<Col span="18" style="text-align: left;">
										<!--<Page :current="addParentCurrentPage" :total="addParentTotal" show-elevator :page-size='addParentSize' class="page" @on-change="handleChange"></Page>-->
										</Col>
										<Col span="6">
										<Button class="green" type="primary" @click="addParentRole">确定</Button>
										<Button type="ghost" @click="addParentRoleCancel">取消</Button>
										</Col>
									</Row>
								</div>
							</Modal>

							<Button class="white" type="text" icon="compose" @click="editRole">编辑</Button>
							<Button class="white" @click="startRole" :disabled="disabledStart" size="small" type="text" icon="ios-unlocked-outline">启用</Button>
							<Button class="white" @click="forbiddenRole" :disabled="disabledForbidden" size="small" type="text" icon="ios-locked-outline"><Icon type="text"></Icon>禁用</Button>
							<Button class="white" @click="delRole" size="small" type="text" icon="trash-a">删除</Button>
							<!--<Dropdown trigger="click" placement="bottom-start">
								<Button class="white" type="text" icon="more">更多操作</Button>
								<DropdownMenu slot="list">
									<DropdownItem>
										<Button @click="startRole" :disabled="disabledStart" size="small" type="text" icon="ios-unlocked-outline">启用</Button>
									</DropdownItem>
									<DropdownItem>
										<Button @click="forbiddenRole" :disabled="disabledForbidden" size="small" type="text" icon="ios-locked-outline"><Icon type="text"></Icon>禁用</Button>
									</DropdownItem>
									<DropdownItem>
										<Button @click="delRole" size="small" type="text" icon="trash-a">删除</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>-->
						</div>
						<Input v-model="searchRole" placeholder="搜索" style="width: 260px" @on-enter='searchRoleIpt'>
						<Button class="search" slot="append" icon="search" @click='searchRoleIpt'></Button>
						</Input>
						</Col>
						<Col span="12">
						<div class='action-top-right'>
							<Button class="blue" type="primary" @click="modalshareFunShow">维护权限</Button>
							<Modal v-model="modalshareFun" width="400" class-name='allot vertical-center-modal'>
								<p slot="header">
									<span>&nbsp;修改功能菜单</span>
								</p>
								<div>
									<Input v-model="searchShare" placeholder="搜索" style="width: 380px" @on-enter='searchShareFunIpt'>
									<Button class="search" slot="append" icon="search" @click='searchShareFunIpt'></Button>
									</Input>
									<div class="modalChoose_tree">
										<Tree :data="baseData" ref='shareFunTree' show-checkbox multiple empty-text="暂无数据"></Tree>
									</div>
								</div>
								<div slot="footer">
									<Button class="green" type="primary" @click="confirmShareFun">确定</Button>
									<Button type="ghost" @click="cancel">取消</Button>
								</div>
							</Modal>
							<!--<Button class="blue" type="primary">修改数据权限</Button>-->
						</div>
						<!--<Input v-model="searchRole" placeholder="搜索" style="width: 260px" @on-enter='searchRoleIpt'>
						<Button class="search" slot="append" icon="search" @click='searchRoleIpt'></Button>
						</Input>-->
						</Col>
					</Row>
				</div>
				<div class="detail-container">
					<Row>
						<Col span="12">
						<Table stripe highlight-row @on-row-click='roleSel' ref="selection" :columns="roleSelect" :data="roleData" no-data-text="暂无数据"></Table>
						</Col>
						<Col span="12">
						<Table stripe ref="selection" :columns="functionSelect" :data="functionData" no-data-text="暂无数据"></Table>
						</Col>
					</Row>
					<div class='paging'>
						<div class="flex">
							<Checkbox v-model="checked" @on-change='roleDisabled'>
								<span>显示禁用的角色</span>
							</Checkbox>
							<Page :current="currentPageRole" :total="totalRole" show-elevator :page-size='pageSizeRole' class="page" @on-change="handleChangeRole"></Page>
						</div>
						<div class="flex">
							<Checkbox v-model="checkedPower" @on-change='parentPower'>
								<span>显示从父角色继承的权限</span>
							</Checkbox>
							<Page :current="currentPage" :total="total" show-elevator :page-size='pageSize' class="page" @on-change="handleChange"></Page>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { permissionBaseUrl } from "../../utils";
	import router from '../../router'
	import OrgTypeImg from '../../components/OrgTypeImg'
	import LgTreeIcon from '../../components/LgTreeIcon'
	import { generateTree } from '../../utils/tree.js'
	import { dateFormat } from '../../utils/index.js'
	export default {
		name: 'rolemanage',
		components: {
			LgTreeIcon,
		},
		computed: {
			disabledFunStartTime() { //新建功能角色的开始日期
				return {
					disabledDate: (date) => {
						let time = new Date(this.formValidateFun.roleEndTime);
						return date && date.valueOf() > time;
					}
				}
			},
			disabledFunEndTime() { //新建功能角色的结束日期
				return {
					disabledDate: (date) => {
						let time = new Date(this.formValidateFun.roleStartTime)
						return date && date.valueOf() < time;
					}
				}
			},
			disabledRoleStartTime() { //新建数据角色的开始日期
				return {
					disabledDate: (date) => {
						let time = new Date(this.formValidate.roleEndTime);
						return date && date.valueOf() > time;
					}
				}
			},
			disabledRoleEndTime() { //新建数据角色的结束日期
				return {
					disabledDate: (date) => {
						let time = new Date(this.formValidate.roleStartTime)
						return date && date.valueOf() < time;
					}
				}
			},
		},
		data() {
			const validateRoleName = (rule, value, callback) => {
				
				if(value !== '') {
					let that = this;
					this.$http.request({
						method: 'get',
						url: permissionBaseUrl + '/findall',
					}).then(function(res) {
						let data = res.data.content.content;
						let dasb = false;
						for(let i = 0; i < data.length; i++) {
							if(value == data[i].roleName) {
								dasb = true;
							}
						}
						if(dasb) {
							callback(new Error('名称不能与现有的名称重复'));
						} else {
							callback();
						}
					})
				} else {
					callback(new Error('不能为空'));
				}
			};

			const validateRoleCode = (rule, value, callback) => {
				if(value !== '') {
					this.$http.request({
						method: 'get',
						url: permissionBaseUrl + '/findall',
					}).then(function(res) {
						let data = res.data.content.content;
						let dasb = false;
						for(let i = 0; i < data.length; i++) {
							if(value == data[i].roleCode) {
								callback(new Error('名称不能与现有的编码重复'));
								dasb = true;
							}
						}
						if(dasb) {
							callback(new Error('编码不能与现有的编码重复'));
						} else {
							callback();
						}
					})
				} else {
					callback(new Error('不能为空'));
				}
			};
			const validateEditRoleName = (rule, value, callback) => { //写两个的原因是编辑之后所在行的id还在，新建的话还是会获取当前行的id
				if(value !== '') {
					let that = this;
					this.$http.request({
						method: 'get',
						url: permissionBaseUrl + '/findall',
					}).then(function(res) {
						let data = res.data.content.content;
						let dasb = false;
						for(let i = 0; i < data.length; i++) {
							if(value == data[i].roleName && value != that.editRoleName) {
								dasb = true;
							}
						}
						if(dasb) {
							callback(new Error('名称不能与现有的名称重复'));
						} else {
							callback();
						}
					})
				} else {
					callback(new Error('不能为空'));
				}
			};

			const validateEditRoleCode = (rule, value, callback) => {
				if(value !== '') {
					let that = this;
					this.$http.request({
						method: 'get',
						url: permissionBaseUrl + '/findall',
					}).then(function(res) {
						let data = res.data.content.content;
						let dasb = false;
						for(let i = 0; i < data.length; i++) {
							if(value == data[i].roleCode && value != that.editRoleCode) {
								callback(new Error('名称不能与现有的编码重复'));
								dasb = true;
							}
						}
						if(dasb) {
							callback(new Error('编码不能与现有的编码重复'));
						} else {
							callback();
						}
					})
				} else {
					callback(new Error('不能为空'));
				}
			};
			const validateDataRange = (rule, value, callback) => {
				if(this.dataRangeName == '选择范围') {
					callback(new Error('请选择数据范围'));
				} else {
					callback();
				}
			};
			const validateRoleStartTime = (rule, value, callback) => {
				if(this.formValidate.roleStartTime == '') {
					callback(new Error('选择开始时间'));
				} else {
					callback();
				}
			};
			const validateRoleEndTime = (rule, value, callback) => {
				if(this.formValidate.roleEndTime == '') {
					callback(new Error('选择结束时间'));
				} else {
					callback();
				}
			};
			const validateFunStartTime = (rule, value, callback) => {
				if(this.startFunTimeChoose == '') {
					callback(new Error('选择开始时间'));
				} else {
					callback();
				}
			};
			const validateFunEndTime = (rule, value, callback) => {
				if(this.endFunTimeChoose == '') {
					callback(new Error('选择结束时间'));
				} else {
					callback();
				}
			};
			return {
				checked: false,
				checkedPower: false,
				searchRole: '',
				totalData: [],
				roleTotalData: [], //角色的所有可以显示数据
				total: 0,
				totalRole: 0, //角色列表所有条数
				pageSize: 10, //右侧功能权限每页展示的条数
				pageSizeRole: 10, //角色每页展示的条数
				currentPageRole: 1, //角色列表页码
				currentPage: 1,
				currentPageRole: 1, //角色所在页码
				modalNew: false,
				modalNewFun: false,
				modalEdit: false,
				modalshareFun: false,
				modalAddParent: false,
				modalChooseRange: false,
				roleData: [],
				parentRoleData: [],
				functionData: [],
				roleChooseId: '', //选中项的id，用于后面的更多操作
				baseData: [],
				isSearchRole: false, //是否搜索的标识
				SearchRoleResult: [], //所搜的结果
				disabledStart: true,
				disabledForbidden: false,
				startFunTimeChoose: '', //功能角色开始时间
				endFunTimeChoose: '', //功能角色结束时间
				startRoleTimeChoose: '', //数据角色开始时间
				endRoleTimeChoose: '', //数据角色结束时间
				treelevel: '', //选择数据范围的Tree层级样式
				orgTree: [{}], //选择数据范围的Tree数据初始化
				searchOrg: '', //搜索数据范围
				answer: '', //确认数据范围
				dataRangeName: '选择范围',
				dataRangeFullName: '', //数据范围全称
				roleParentData: [], //选择父角色
				roleParentId: '', //被选择父角色的id
				roleParentName: '', //被选择父角色的名称
				searchRoleParent: '', //搜索父角色
				searchShare: '', //搜索分配功能权限
				ParentName: '', //点击左侧的父角色Name值
				actions: '', //点击左侧之后的动作策略
				refreshData: '', //分配功能权限后刷新词页面的数据
				permisData: [],
				editRoleData: [],
				editRoleSort: '',
				editRoleName: '',
				editRoleCode: '',
				sortFlag: '',
				roleFlag: '',//普通还是页数的标识
				formValidate: { /*Form表单数据*/
					roleName: '',
					roleCode: '',
					dataRange: '',
					roleStartTime: Date.now(),
					roleEndTime: Date.now() + 7776000000,
					desc: '',
				},
				formValidateFun: {
					roleName: '',
					roleCode: '',
					roleStartTime: Date.now(),
					roleEndTime: Date.now() + 7776000000,
					desc: '',
				},
				formEditValidate: { //编辑角色
					roleName: '',
					roleCode: '',
					dataRange: '',
					roleStartTime: Date.now(),
					roleEndTime: Date.now() + 7776000000,
					desc: '',
				},
				ruleValidateFun: { /*新建功能角色Form表单验证法则*/
					roleName: [{
							required: true,
							validator: validateRoleName,
							trigger: 'blur'
						}

					],
					roleCode: [{
						required: true,
						validator: validateRoleCode,
						trigger: 'blur'
					}],
					roleStartTime: [{
						required: true,
						type: 'date',
						validator: validateFunStartTime,
						trigger: 'change'
					}],
					roleEndTime: [{
						required: true,
						type: 'date',
						validator: validateFunEndTime,
						trigger: 'change'
					}],
				},
				ruleValidate: { /*新建数据角色Form表单验证法则*/
					roleName: [{
							required: true,
							validator: validateRoleName,
							trigger: 'blur'
						}

					],
					roleCode: [{
							required: true,
							message: '不能为空',
							trigger: 'blur'
						},
						{
							validator: validateRoleCode,
							trigger: 'blur'
						}
					],
					roleStartTime: [{
						required: true,
						type: 'date',
						validator: validateRoleStartTime,
						trigger: 'change'
					}],
					roleEndTime: [{
						required: true,
						type: 'date',
						validator: validateRoleEndTime,
						trigger: 'change'
					}],
					dataRange: [{
						required: true,
						validator: validateDataRange,
						trigger: 'change'
					}],
				},
				ruleEditValidate: { /*新建数据角色Form表单验证法则*/
					roleName: [{
							required: true,
							validator: validateEditRoleName,
							trigger: 'blur'
						}

					],
					roleCode: [{
							required: true,
							message: '不能为空',
							trigger: 'blur'
						},
						{
							validator: validateEditRoleCode,
							trigger: 'blur'
						}
					],
					roleStartTime: [{
						required: true,
						type: 'date',
						validator: validateRoleStartTime,
						trigger: 'change'
					}],
					roleEndTime: [{
						required: true,
						type: 'date',
						validator: validateRoleEndTime,
						trigger: 'change'
					}],
					dataRange: [{
						required: true,
						validator: validateDataRange,
						trigger: 'change'
					}],
				},
				parentList: [
					/*{
						type: 'selection',
						width: 60,
						align: 'center'
					},*/
					{
						title: '父角色',
						key: 'parentRoleName',
						align: 'center',
					},
				],
				roleParentSelect: [ //父角色数据
					//                  {   
					//                      type: 'selection',
					//                      width: 60,
					//                      align: 'center'
					//                  },   
					{
						title: '序号',
						key: 'dataOrder',
						width: 60,
						align: 'center',
						render: (h, params) => {
							return params.index + 1
						}
					},
					{
						title: '类型',
						key: 'roleType',
						width: 60,
						align: 'center',
						render: (h, params) => {
							let i = require("../../assets/mechanism.png");
							let j = require("../../assets/department.png");
							if(params.row.roleType == 1) {
								return h(OrgTypeImg, {
									props: {
										'src': i
									}
								});
							} else {
								return h(OrgTypeImg, {
									props: {
										'src': j
									}
								});
							}
						}
					},
					{
						title: '角色名称',
						key: 'roleName',
						align: 'center',
					},
					{
						title: '编码',
						key: 'roleCode',
						align: 'center',
					},
					{
						title: '分类',
						key: 'roleSort',
						align: 'center',
						render: (h, params) => {
							if(params.row.roleSort == '1') {
								return '普通角色'
							} else {
								return '特殊角色'
							}
						}
					},
					{
						title: '父角色',
						key: 'roleParentName',
						align: 'center',
					},
					{
						title: '数据范围',
						key: 'roleFullName',
						align: 'center',
					},
				],
				roleSelect: [
					//                  {   此处应后台要求改成单选
					//                      type: 'selection',
					//                      width: 60,
					//                      align: 'center'
					//                  },
					{
						title: '序号',
						key: 'dataOrder',
						width: 60,
						align: 'center',
						render: (h, params) => {
							return params.index + 1
						}
					},
					{
						title: '类型',
						key: 'roleType',
						width: 60,
						align: 'center',
						render: (h, params) => {
							let i = require("../../assets/mechanism.png");
							let j = require("../../assets/department.png");
							if(params.row.roleType == 1) {
								return h(OrgTypeImg, {
									props: {
										'src': i
									}
								});
							} else {
								return h(OrgTypeImg, {
									props: {
										'src': j
									}
								});
							}
						}
					},
					{
						title: '角色名称',
						key: 'roleName',
						width: 90,
						align: 'center',
					},
					{
						title: '编码',
						key: 'roleCode',
						width: 90,
						align: 'center',
					},
					{
						title: '分类',
						key: 'roleSort',
						width: 90,
						align: 'center',
						render: (h, params) => {
							if(params.row.roleSort == '1') {
								return '普通角色'
							} else {
								return '特殊角色'
							}
						}
					},
					{
						title: '父角色',
						key: 'roleParentName',
						width: 90,
						align: 'center',
					},
					{
						title: '数据范围',
						key: 'roleFullName',
						width: 200,
						align: 'center',
					},
					{
						title: ' ',
						key: '',
						align: 'center',
					}
				],
				functionSelect: [
					//				    {
					//						type: 'selection',
					//						width: 60,
					//						align: 'center'
					//					},
					{
						title: '序号',
						key: 'dataOrder',
						width: 60,
						align: 'center',
						render: (h, params) => {
							return params.index + 1;
						}
					},
					{
						title: '类型',
						key: 'permisType',
						width: 60,
						align: 'center',
						render: (h, params) => {
							let i = require("../../assets/mechanism.png");
							let j = require("../../assets/department.png");
							if(params.row.permisType == 2) {
								return h(OrgTypeImg, {
									props: {
										'src': i
									}
								});
							} else {
								return h(OrgTypeImg, {
									props: {
										'src': j
									}
								});
							}
						}
					},
					{
						title: '业务功能',
						key: 'permisName',
						width: 160,
						align: 'center',
					},
					{
						title: '动作策略',
						key: 'permisCode',
						width: 160,
						align: 'center',
					},
					{
						title: '数据策略',
						key: 'data',
						width: 160,
						align: 'center',
						render: (h, params) => {
							return this.actions
						}
					},
					{
						title: '所属角色',
						key: 'roleName',
						width: 100,
						align: 'center',
						render: (h, params) => {
							return this.ParentName
						}
					},
					{
						title: ' ',
						key: '',
						align: 'center',
					}
				],
			}
		},
		mounted() {

		},
		created: function() {
			this.roleSearch();
			this.startFunTimeChoose = dateFormat(this.formValidateFun.roleStartTime);
			this.endFunTimeChoose = dateFormat(this.formValidateFun.roleEndTime);
			this.startRoleTimeChoose = dateFormat(this.formValidate.roleStartTime);
			this.endRoleTimeChoose = dateFormat(this.formValidate.roleEndTime);
		},
		methods: {
			roleSearch() { //进来初始化角色列表
				let that = this;
				this.checked = false;
				this.disabledStart = true;
				this.disabledForbidden = false;
				this.roleChooseId == '';
				this.$http.request({
					method: 'get',
					url: permissionBaseUrl + '/find/ShareRoleList',
				}).then(function(res) {
					that.roleTotalData = res.data.content.content;
					let _length = that.roleTotalData.length;
					that.totalRole = _length;
					that.currentPageRole = 1;
					if(_length < that.pageSizeRole) { //进行分页管理(总条数小于一页所展示的条数)
						that.roleData = that.roleTotalData
					} else { //(总条数大于一页所展示的条数)，进行数据的截取
						that.roleData = that.roleTotalData.slice(0, that.pageSizeRole);
					}
				}).catch(function(err) {
					console.log(err)
				})
			},

			roleSel(data) { //点击角色在右边相应的展示功能权限
				this.refreshData = data;
				this.ParentName = data.roleName;
				this.actions = data.fName
				let id = data.id;
				this.roleChooseId = id;
				let that = this;
				this.$http.request({
					method: 'get',
					url: permissionBaseUrl + '/find/ShareRoleInfo/' + id,
				}).then(function(res) {
					that.totalData = res.data.content[0].sharePermissions;
					let _length = that.totalData.length;
					that.total = _length;
					that.currentPage = 1;
					if(_length < that.pageSize) { //进行分页管理(总条数小于一页所展示的条数)
						that.functionData = that.totalData
					} else { //(总条数大于一页所展示的条数)，进行数据的截取
						that.functionData = that.totalData.slice(0, that.pageSize);
					}
				}).catch(function(err) {
					console.log(err);
				})
			},
			editRole() { //编辑角色
				let that = this;
				if(this.roleChooseId == '') {
					this.$Message.destroy();
					this.$Message.error('您未选择需要编辑的选项!');
				} else {
					let totalRole = this.roleTotalData;
					for(var k = 0; k < totalRole.length; k++) {
						if(totalRole[k].id == this.roleChooseId) {
							this.editRoleData = totalRole[k]
						}
					}
					if(this.editRoleData.roleSort == 1) {
						this.editRoleSort = '普通角色';
						this.roleFlag = 1;
					} else {
						this.editRoleSort = '特殊角色';
						this.roleFlag = 0;
						this.dataRangeName = this.editRoleData.roleFullName; //数据范围
					}
					this.modalEdit = true;
					this.editRoleName = this.editRoleData.roleName;
					this.editRoleCode = this.editRoleData.roleCode;
					this.formEditValidate.roleName = this.editRoleData.roleName; //名称
					this.formEditValidate.roleCode = this.editRoleData.roleCode; //编码
					this.formEditValidate.desc = this.editRoleData.remark; //描述
					this.formEditValidate.roleLevel = this.editRoleData.roleLevel;
					this.formEditValidate.roleStartTime = this.editRoleData.roleStartTime; //开始时间
					this.formEditValidate.roleEndTime = this.editRoleData.roleEndTime; //结束时间
					this.roleParentId = this.editRoleData.roleParentId;
					this.roleParentName = this.editRoleData.roleParentName;
					this.parentRoleData = [{ //父角色
						parentRoleName: this.editRoleData.roleParentName
					}]
				}
			},
			submitEditRole(name) { //修改角色提交
				let that = this;
				let roleLevel;
				if(this.editRoleSort == '普通角色') {
					this.editRoleData.roleSort = 1;
					this.dataRangeName = '无需选择数据范围';
				} else {
					this.editRoleData.roleSort = 0;
					if(this.dataRangeName == '无需选择数据范围') {
						this.dataRangeName = '无需选择数据范围'
					}
				}
				if(this.roleParentId == '') {
					roleLevel = 1
				} else {
					roleLevel = 2
				}
				let roleData;
				roleData = {
					roleName: this.formEditValidate.roleName,
					roleCode: this.formEditValidate.roleCode,
					roleSort: this.editRoleData.roleSort,
					roleType: this.editRoleData.roleSort,
					roleStartTime: this.startFunTimeChoose,
					roleEndTime: this.endFunTimeChoose,
					roleParentId: this.roleParentId,
					roleParentName: this.roleParentName,
					remark: this.formEditValidate.desc,
					roleLevel: roleLevel,
					roleFullName: this.dataRangeName,
					fName: '',
				}
				console.log(roleData)
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$http.request({
							method: 'post',
							url: permissionBaseUrl + '/update/roleinfo/' + this.roleChooseId,
							headers: {
								'Content-Type': 'application/json',
								'Accept': 'application/json',
							},
							data: roleData,
						}).then(function(res) {
							that.$http.request({
								method: 'get',
								/*url: permissionBaseUrl + '/create/role',*/
							    url: permissionBaseUrl + '/save/ParentRolePermissions/'+ that.roleChooseId,
								headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json',
								}
							}).then(function(res) {
							}).catch(function(err) {
								console.log(err)
							})
							
							that.modalEdit = false;
							that.roleSearch();
							that.$Message.destroy();
							that.$Message.success('修改角色成功!');
						}).catch(function(err) {
							console.log(err)
						})
					} else {
						that.$Message.destroy();
						that.$Message.error('修改角色失败!');
					}
				})
			},
			handleChangeRole(index) { //左侧角色管理分页管理
				let _start = (index - 1) * this.pageSizeRole;
				let _end = index * this.pageSizeRole;
				this.currentPageRole = index;
				this.roleData = this.roleTotalData.slice(_start, _end);
			},
			handleChange(index) { //右侧功能权限点击分页管理
				let _start = (index - 1) * this.pageSize;
				let _end = index * this.pageSize;
				this.currentPage = index;
				this.functionData = this.totalData.slice(_start, _end);
			},
			roleDisabled() { //选择查看禁用角色
				let that = this;
				this.roleChooseId = '';
				let disSearchRole_0 = []; //启用角色
				let disSearchRole_1 = []; //禁用角色
				if(this.isSearchRole) {
					this.searchRoleIpt();
					for(let i = 0; i < that.SearchRoleResult.length; i++) {
						if(that.SearchRoleResult[i].disFlag == 0) { //0是启用，1是禁用
							disSearchRole_0.push(that.SearchRoleResult[i])
						} else {
							disSearchRole_1.push(that.SearchRoleResult[i])
						}
					}
				}
				if(this.checked) {
					this.disabledStart = false;
					this.disabledForbidden = true;
					if(this.isSearchRole) {
						this.roleData = disSearchRole_1;
					} else {
						this.$http.request({
							method: 'get',
							url: permissionBaseUrl + '/find/roleDisflag/1',
						}).then(function(res) {
							that.roleData = res.data.content;
						}).catch(function(err) {
							console.log(err);
						})
					}

				} else {
					this.disabledStart = true;
					this.disabledForbidden = false;
					if(this.isSearchRole) {
						this.roleData = disSearchRole_0;
					} else {
						this.roleSearch();
					}
				}
			},
			parentPower() {
				let that = this;
				if(that.checkedPower) {
					that.$http.request({
						method: 'get',
						url: permissionBaseUrl + '',
					}).then(function(res) {

					}).catch(function(err) {
						console.log(err);
					})
				} else {}
			},
			searchRoleIpt() { //搜索角色
				this.isSearchRole = true;
				let that = this;
				let nameRole = this.searchRole;
				let disSearchRole_0 = []; //启用角色
				let disSearchRole_1 = []; //禁用角色
				this.$http.request({
					method: 'get',
					//					permissionBaseUrl: "http://10.71.200.22:8651",
					//					url: `/find/ShareRoleName?roleName=${nameRole}&disflag=${state}`
					url: permissionBaseUrl + '/find/ShareRoleName?roleName=' + nameRole,
				}).then(function(res) {
					that.SearchRoleResult = res.data.content;
					let NoResult_0 = 0;
					let NoResult_1 = 0;
					for(let j = 0; j < that.SearchRoleResult.length; j++) {
						if(that.SearchRoleResult[j].disFlag == 0) {
							NoResult_0++;
							that.SearchRoleResult[j].dataOrder = NoResult_0;
							disSearchRole_0.push(that.SearchRoleResult[j])
						} else {
							NoResult_1++;
							that.SearchRoleResult[j].dataOrder = NoResult_1;
							disSearchRole_1.push(that.SearchRoleResult[j])
						}
					}
					if(that.checked) {
						that.roleData = disSearchRole_1;
					} else {
						that.roleData = disSearchRole_0;
					}

				}).catch(function(err) {
					console.log(err);
				})

			},
			startRole() { //启用角色
				if(this.roleChooseId == '') {
					this.$Message.destroy();
					this.$Message.error('您未选择需要启用的选项!');
				} else {
					let that = this;
					this.$http.request({
						method: 'post',
						url: permissionBaseUrl + '/update/ShareUseRole/' + this.roleChooseId,
					}).then(function(res) {
						if(res.data.code == 1) {
							setTimeout(function() {
								that.functionData = []; //成功之后将右侧的数据清空
								that.$Message.success(res.data.message);
								that.roleDisabled();
							}, 500)
						} else {
							that.$Message.destroy();
							that.$Message.error('启用失败!');

						}

					}).catch(function(err) {
						console.log(err);
					})
				}
			},
			forbiddenRole() { //禁用角色
				if(this.roleChooseId == '') {
					this.$Message.destroy();
					this.$Message.error('您未选择需要禁用的选项!');
				} else {
					let that = this;
					this.$http.request({
						method: 'post',
						url: permissionBaseUrl + '/update/DisabledRole/' + this.roleChooseId,
					}).then(function(res) {
						if(res.data.code == 1) {
							setTimeout(function() {
								that.functionData = []; //成功之后将右侧的数据清空
								that.$Message.destroy();
								that.$Message.success(res.data.message);
								that.roleSearch();
							}, 500)
						} else {
							that.$Message.destroy();
							that.$Message.error('禁用失败!');
						}

					}).catch(function(err) {
						console.log(err);
					})
				}
			},
			delRole() { //删除角色
				if(this.roleChooseId == '') {
					this.$Message.destroy();
					this.$Message.error('您未选择需要删除的选项!');
				} else {
					let that = this;
					this.$http.request({
						method: 'post',
						url: permissionBaseUrl + '/del/role/' + this.roleChooseId,
					}).then(function(res) {
						if(res.data.code == 1) {
							setTimeout(function() {
								that.functionData = []; //成功之后将右侧的数据清空
								that.$Message.destroy();
								that.$Message.error(res.data.message);
								that.roleSearch();
							}, 500)
						} else {
							that.$Message.destroy();
							that.$Message.error('删除失败!');
						}

					}).catch(function(err) {
						console.log(err);
					})
				}
			},
			startFunTime(data) { //功能角色开始时间
				this.startFunTimeChoose = data;
			},
			endFunTime(data) { //功能角色结束时间
				this.endFunTimeChoose = data;
			},
			startRoleTime(data) { //数据角色开始时间
				this.startRoleTimeChoose = data;
			},
			endRoleTime(data) { //数据角色结束时间、
				this.endRoleTimeChoose = data;
			},
			modalDelParentRole(){//删除父角色
				if(this.parentRoleData == ''){
					this.$Message.error('还未选择父角色')
				}else{
					this.parentRoleData = [];
					this.roleParentName = '';
					this.roleParentId = '';
				}
			},
			modalAddParentRole() { //显示添加父角色的模态框
				this.roleParentId = '';
				this.roleParentName = '';
				this.modalAddParent = true;
				this.roleParentData = [];
				let that = this;
				let currentUrl = '';
				/*if(this.modalEdit){
					if(this.editRoleSort == '普通角色') {
						this.roleFlag = 1;
					} else {
						this.roleFlag = 0;
					}
				}*/
				if (this.modalEdit) {
					currentUrl = permissionBaseUrl + '/find/UpdateParentRoleInfo/' + this.roleChooseId;
				}else{
					currentUrl = permissionBaseUrl + '/find/ParentRoleInfo/'+ this.roleFlag;
				}
				this.$http.request({
					method: 'get',
					url: currentUrl,
				}).then(function(res) {
					let roleParentListArr = res.data.content;
					let roleParentList = [];
					let roleParentFun = [];
					let roleParentRole = [];
					for(let j = 0; j < roleParentListArr.length; j++){
						if(roleParentListArr[j].disFlag == '0'){
							roleParentList.push(roleParentListArr[j])
						}
					}
					if(that.modalEdit){
						for(let i = 0; i < roleParentList.length; i++){
							if(roleParentList[i].roleSort == '1'){
								roleParentFun.push(roleParentList[i]);
							}else{
								roleParentRole.push(roleParentList[i])
							}
						}
					}
					if(that.modalEdit){
						if(that.editRoleSort == '普通角色'){
							that.roleParentData = roleParentFun;
						}else{
							that.roleParentData = roleParentRole;
						}
					}else{
						that.roleParentData = roleParentList;
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			roleParentSel(data) { //点击父角色或者某一行父角色数据
				this.roleParentId = data.id;
				this.roleParentName = data.roleName;
			},
			searchRoleParentIpt() { //搜索父角色
				let nameRoleParent = this.searchRoleParent;
				let that = this;
				this.$http.request({
					method: 'get',
					url: permissionBaseUrl + '/find/ShareRoleName?roleName=' + nameRoleParent,
				}).then(function(res) {
					that.roleParentData = res.data.content
				}).catch(function(err) {
					console.log(err);
				})
			},
			modalChooseRangeShow() { //显示选择范围的模态框
				this.modalChooseRange = true;
				let that = this;
				this.$http.request({
					method: 'get',
					url: permissionBaseUrl + '/shareOrgTree/isOrg/1',
				}).then(function(res) {
					that.orgTempData = res.data.content;
					that.treelevel = "treelev" + that.orgTempData[0].orgLevel;
					let info = generateTree(that.orgTempData);
					that.orgTree = info;
				}).catch(function(err) {
					console.log(err)
				})
			},
			addParentRoleCancel() {
				this.modalAddParent = false;
			},
			addParentRole(data) {
				if(this.roleParentName == ''){
					this.$Message.destroy();
					this.$Message.error('先选择父角色')
				}else{
					this.modalAddParent = false;
					this.parentRoleData = [{
						parentRoleName: this.roleParentName
					}]
				}
			},

			searchOrgIpt() { //搜索数据范围
				let that = this;
				let CompyOrgName = this.searchOrg;
				this.$http.request({
					method: 'get',
					url: permissionBaseUrl + '/shareOrg/findCompyInfo/' + CompyOrgName
				}).then(function(res) {
					console.log(res)
					let data;
					data = res.data.content;
					let code = res.data.code;
					if(code != 0) {
						let treeid = data[0].id;
						that.$http.request({
							method: 'get',
							url: permissionBaseUrl + '/shareOrgTree/' + treeid,
						}).then(function(res) {
							let cont;
							cont = res.data.content;
							console.log(cont[0]);
							let treedata = [];

							for(let i = 0; i < cont.length; i++) {
								if(cont[i].disFlag == 0) {
									treedata.push(cont[i]);
								}
							}
							let level = treedata[0].orgLevel;
							for(let k = 0; k < level; k++) {
								for(let m = 0; m < that.orgTempData.length; m++) {
									if(treedata[0].orgParentId == that.orgTempData[m].id) {
										treedata.unshift(that.orgTempData[m])
									}
								}
							}
							let orgpid = treedata[0].orgParentId;
							let isOpen = true;
							let info = generateTree(treedata, orgpid, isOpen);
							that.orgTree = info;
						}).catch(function(err) {
							console.log(err)
						})
					} else {
						that.$Message.destroy();
						that.$Message.error('未查找到数据!');
					}

				}).catch(function(err) {
					console.log(err);
				})

			},
			getSelectedNodes(data) { //确认数据范围
				this.answer = data;
			},
			confirmTree() { //将确认的范围提交到表单
				if(this.answer == ''){
					this.$Message.destroy();
					this.$Message.error('先选择数据范围')
				}else{
					if(this.answer.orgName) { //最高层级没有数据范围的判断
						this.dataRangeName = this.answer.orgFullName;
						this.dataRangeFullName = this.answer.orgFullName;
					} else {
						this.dataRangeName = this.answer.title;
						this.dataRangeFullName = this.answer.title;
					}
					this.modalChooseRange = false;
				}
			},
			submitNewRoleFun(name) { //新建功能角色提交
				if(this.dataRangeName == '选择范围'){
					this.dataRangeName = '无需选择范围'
				}
				let that = this;
				let roleData;
				roleData = {
					roleName: this.formValidateFun.roleName,
					roleCode: this.formValidateFun.roleCode,
					roleSort: 1,
					roleType: 1,
					roleStartTime: this.startFunTimeChoose,
					roleEndTime: this.endFunTimeChoose,
					roleParentId: this.roleParentId,
					roleParentName: this.roleParentName,
					roleFullName: this.dataRangeName,
					fName: '',
				}
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$http.request({
							method: 'post',
							url: permissionBaseUrl + '/create/role',
							headers: {
								'Content-Type': 'application/json',
								'Accept': 'application/json',
							},
							data: roleData,
						}).then(function(res) {
							let resId = res.data.content.id
							that.$http.request({
								method: 'get',
								/*url: permissionBaseUrl + '/create/role',*/
							    url: permissionBaseUrl + '/save/ParentRolePermissions/'+ resId,
								headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json',
								}
							}).then(function(res) {
							}).catch(function(err) {
								console.log(err)
							})
							that.modalNewFun = false;
							that.roleSearch();
						}).catch(function(err) {
							console.log(err)
						})
						that.$Message.destroy();
						that.$Message.success('新建功能角色成功!');
					} else {
						that.$Message.destroy();
						that.$Message.error('新建功能角色失败!');
					}
				})
			},
			submitNewRole(name) { //新建数据角色提交
				let that = this;
				let roleData;
				roleData = {
					roleName: this.formValidate.roleName,
					roleCode: this.formValidate.roleCode,
					roleSort: 0,
					roleType: 2,
					roleStartTime: this.startRoleTimeChoose,
					roleEndTime: this.endRoleTimeChoose,
					roleParentId: this.roleParentId,
					roleParentName: this.roleParentName,
					roleFullName: this.dataRangeName,
					fName: this.dataRangeFullName

				}
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$http.request({
							method: 'post',
							url: permissionBaseUrl + '/create/role',
							headers: {
								'Content-Type': 'application/json',
								'Accept': 'application/json',
							},
							data: roleData,
						}).then(function(res) {
							//							let roleId = res.data.content.id;
							//							let rangeId = {id :[that.answer[0].id]}
							//							that.$http.request({
							//								method: 'post',
							//								url: '/create/role/org?id=' + roleId,
							//								data: rangeId,
							//								headers: {
							//								'Content-Type': 'application/json',
							//								'Accept': 'application/json',
							//							},
							//							}).then(function(res) {
							//								
							//							}).catch(function(err) {
							//								console.log(err)
							//							})	
							let resId = res.data.content.id
							that.$http.request({
								method: 'get',
							    url: permissionBaseUrl + '/save/ParentRolePermissions/'+ resId,
								headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json',
								}
							}).then(function(res) {
							}).catch(function(err) {
								console.log(err)
							})
							that.modalNew = false;
							that.roleSearch();
						}).catch(function(err) {
							console.log(err)
						})
						that.$Message.destroy();
						that.$Message.success('新建数据角色成功!');
					} else {
						that.$Message.destroy();
						that.$Message.error('新建数据角色失败!');
					}
				})
			},
			searchShareFunIpt2() { //精确搜索添加的功能权限
				let sendId;
				let that = this;
				if(this.searchShare == '') {
					this.$Message.destroy();
					this.$Message.error('搜索内容不能为空!');
				} else {
					let searchShartVal = this.searchShare;
					for(let i = 0; i < this.permisData.length; i++) {
						if(searchShartVal == this.permisData[i].permisName) {
							sendId = this.permisData[i].id;
							this.$http.request({
								method: 'get',
								url: permissionBaseUrl + '/queryPermissionsTree/' + sendId,

							}).then(function(res) {
								let data = res.data.content;
								let level = data[0].permisLevel;
								for(let k = 0; k < level; k++) {
									for(let m = 0; m < that.permisData.length; m++) {
										if(data[0].permisParentId == that.permisData[m].id) {
											data.unshift(that.permisData[m])
										}
									}
								}
								that.treeTable(data);
							}).catch(function(err) {
								console.log(err)
							})
						}
					}
					if(sendId == undefined) {
						this.$Message.destroy();
						this.$Message.error('搜索内容不存在!');
					}
				}
			},
			searchShareFunIpt() { //模糊搜索搜索添加的功能权限
				if(this.searchShare == '') {
					this.$Message.destroy();
					this.$Message.error('搜索内容不能为空!');
				} else {
					let that = this;
					let searchShartVal = this.searchShare;
					this.$http.request({
						method: 'get',
						url: permissionBaseUrl + '/find/PermisNameList/' + searchShartVal,

					}).then(function(res) {
						let data = res.data.content;
						let n = 0;
						if(data == null) {
							that.$Message.destroy();
							that.$Message.error('搜索内容不存在!');
						} else {
							for(let i = 0; i < data.length; i++) { //分析循环多少次
								if(n > data[i].permisLevel) {
									n = n;
								} else {
									n = data[i].permisLevel;
								}
							}
							for(let m = 1; m < 5; m++) { //找子节点
								let len = data.length;
								for(let k = 0; k < len; k++) {
									for(let j = 0; j < that.permisData.length; j++) {
										if(that.permisData[j].permisParentId == data[k].id) {
											data.push(that.permisData[j]);
										}
									}
								}
								var hash = {};
								data = data.reduce(function(item, next) {
									hash[next.id] ? '' : hash[next.id] = true && item.push(next);
									return item
								}, []);
							}
							for(let p = 0; p < data.length; p++) { //查找父节点								
								for(let q = 0; q < that.permisData.length; q++) {
									if(data[p].permisParentId == that.permisData[q].id) {
										data.push(that.permisData[q])
									}
								}
							}
							var hash1 = {};
							data = data.reduce(function(item, next) {
								hash1[next.id] ? '' : hash1[next.id] = true && item.push(next);
								return item
							}, []);
							that.treeTable(data);
						}
					}).catch(function(err) {
						console.log(err)
					})
				}
			},
			modalshareFunShow() { //分配功能权限
				if(this.roleChooseId == '') {
					this.$Message.destroy();
					this.$Message.error('您未选择需要分配功能的角色!');
				} else {
					this.modalshareFun = true;
					this.getTree();
				}
			},
			confirmShareFun() { //确定功能菜单
				let data = this.$refs.shareFunTree.getCheckedNodes();
				let sendData = [];

				for(let p = 0; p < data.length; p++) { //查找父节点								
					for(let q = 0; q < this.permisData.length; q++) {
						if(data[p].permisParentId == this.permisData[q].id) {
							data.push(this.permisData[q])
						}
					}
				}
				var hash1 = {};
				data = data.reduce(function(item, next) {
					hash1[next.id] ? '' : hash1[next.id] = true && item.push(next);
					return item
				}, []);

				for(let i = 0; i < data.length; i++) {
					//					if (data[i].children == undefined) {
					sendData.push(data[i]);
					//					}
				}
				let that = this;
				if(sendData.length == 0) {
					this.$Message.destroy();
					this.$Message.error('您未选择任何功能权限!');
				} else {
					let ShareFunDataChild = [];
					for(let i = 0; i < sendData.length; i++) {
						ShareFunDataChild.push(sendData[i].id);
					}

					let ShareFunDataId = {
						id: ShareFunDataChild
					};
					this.$http.request({
						method: 'post',
						url: permissionBaseUrl + '/create/role/Permissions?id=' + this.roleChooseId,
						data: ShareFunDataId,
					}).then(function(res) {
						that.$Message.destroy();
						that.$Message.success(res.data.message);
						that.modalshareFun = false;
						that.$http.request({
							method: 'get',
							url: permissionBaseUrl + '/find/ShareRoleInfo/' + that.roleChooseId,
						}).then(function(res) {
							that.roleTotalData = res.data.content[0].sharePermissions;
							let _length = that.roleTotalData.length;
							that.total = _length;
							that.currentPage = 1;
							if(_length < that.pageSize) { //进行分页管理(总条数小于一页所展示的条数)
								that.functionData = that.roleTotalData
							} else { //(总条数大于一页所展示的条数)，进行数据的截取
								that.functionData = that.roleTotalData.slice(0, that.pageSize);
							}
							that.roleSel(that.refreshData);
						}).catch(function(err) {
							console.log(err);
						})

					}).catch(function(err) {
						console.log(err)
					})
				}
			},
			showNewFunRole() { //新建功能角色
				this.modalNewFun = true;
				this.roleFlag = 1;//功能角色是1
			},
			showNewRole() { //显示新建数据角色
				this.modalNew = true;
				let nowDta = new Date();
				this.roleFlag = 0;//数据角色是0
			},
			ok() {
				//              this.$Message.info('Clicked ok');
			},
			cancel() {
				//              this.$Message.info('Clicked cancel');
				this.modalNew = false;
				this.modalshareFun = false;
				this.modalAddParent = false;
			},
			cancelRange() {
				this.modalChooseRange = false;
			},
			treeTable(data) { //Tree函数
				console.log(data)
				let treedata = [];

				//查找最顶层
				let len = data.length;
				for(let j = 0; j < len; j++) {
					for(let k = 0; k < this.totalData.length; k++) {
						if(data[j].id == this.totalData[k].id) {
							data[j].expand = true;
						}
					}
					data[j].title = data[j].permisName;
					if(data[j].permisParentId == null) {
						treedata.push({
							"expand": true,
							"title": data[j].permisName,
							"id": data[j].id,
							"checked": false,
						})
					}
				}
				for(let r = 0; r < this.totalData.length; r++) {
					if(this.totalData[r].leafFlag == 1) {
						for(let s = 0; s < len; s++) {
							if(this.totalData[r].id == data[s].id) {
								data[s].checked = true;
							}
						}
					}
				}

				//找到跟最高层id相关的子子孙孙，并给子孙添加lev
				let treedataLevs = []
				for(let h = 0, ls = treedata.length; h < ls; h++) {
					treedataLevs.push({
						treedataLev: sonsTree(data, treedata[h].id)
					})
				}
				for(let p = 0, lq = treedataLevs.length; p < lq; p++) {
					let treedataLev = treedataLevs[p].treedataLev
					//找到最高层的lev
					let maxLev = 1;
					for(let i = 0, lt = treedataLev.length; i < lt; i++) {
						if(parseInt(treedataLev[i].lev) > maxLev) {
							maxLev = parseInt(treedataLev[i].lev)
						} else {
							maxLev = maxLev
						}
					}
					//比较当前层和上一层的数据，然后做处理
					let needLev = maxLev
					let maxLevTree = []
					let maxLevTreePrev = []
					for(let m = 0; m < maxLev; m++) {
						maxLevTree = getLevArr(treedataLev, needLev)
						maxLevTreePrev = getLevArr(treedataLev, needLev - 1)
						for(let j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
							maxLevTreePrev[j].children = new Array()
							for(let i = 0, lm = maxLevTree; i < lm.length; i++) {
								if(maxLevTree[i].permisParentId == maxLevTreePrev[j].id) {
									maxLevTreePrev[j].children.push(maxLevTree[i])
								}
							}
						}
						needLev--
					}
					treedata[p].children = maxLevTreePrev
				}

				this.baseData = treedata;
				//找出同一级的数据
				function getLevArr(arr, lev) {
					let newarr = []
					for(let i = 0, la = arr.length; i < la; i++) {
						//这里对arr 的children 做处理
						arr.children = new Array()
						if(parseInt(arr[i].lev) == lev) {
							newarr.push(arr[i])
						}
					}
					return newarr
				}
				//给每个数据添加一个lev
				function sonsTree(arr, id) {
					let temp = [],
						lev = 0;
					let forFn = function(arr, id, lev) {
						for(let i = 0; i < arr.length; i++) {
							let item = arr[i];
							if(item.permisParentId == id) {
								item.lev = lev;
								temp.push(item);
								forFn(arr, item.id, lev + 1);
							}
						}
					};
					forFn(arr, id, lev);
					return temp;
				}
			},
			getTree() { //初始化律师管理树
				alert(333)
				let that = this;
				this.$http.request({
					method: 'get',
					url: permissionBaseUrl + '/queryPermissionsTree/1',
				}).then(function(res) {
					let data = res.data.content;
					that.treeTable(data);
					that.permisData = res.data.content;
				}).catch(function(err) {
					console.log(err)
				})
			},
			renderContent(h, {
				root,
				node,
				data
			}) {
				let str = '';
				if(data.orgType == '.plate') {
					str = 'department'
				} else if(data.orgType == '.psm') {
					str = 'person'
				} else if(data.type == 'root') {
					str = 'root';
				} else {
					str = 'company'
				}

				return h('span', {
					style: {
						display: 'inline-block',
					}
				}, [
					h('span', {
						style: {

							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}
					}, [
						h(LgTreeIcon, {
							props: {
								type: str
							}
						}),
						h('div', {
							style: {
								marginTop: '6px',
								cursor: 'pointer'
							},
							class: ['activeNode'],
							on: {
								click: (e) => {
									this.getSelectedNodes(data);
									let nodeList = document.getElementsByClassName('activeNode');
									nodeList = Array.prototype.slice.apply(nodeList);
									nodeList.forEach((item) => {
										item.classList.remove('highLight');
									})
									e.target.classList.toggle('highLight');
								}
							},
						}, data.title)
					]),
				]);
			}
		}
	}
</script>

<style lang="less">
	@import url("../../less/tree.less");
	.container {
		min-height: 720px;
		.layout {
			height: 100%;
			flex-direction: column;
			.layout-header {
				background-image: linear-gradient(90deg, #0e37bd, #1f0a73, #1f0a73, #0e37bd, #0e37bd);
				width: 100%;
				padding: 0 20px 0 25px;
				font-size: 20px;
				height: 60px;
				color: #fff;
				justify-content: space-between;
				flex-direction: row;
				a {
					color: #FFF;
				}
			}
			.layout-content {
				background: #fff;
				display: -webkit-flex;
				display: flex;
				flex-direction: column;
				flex: 1;
				.ivu-col {
					padding: 0 12px;
					display: -webkit-flex;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.action-top {
					height: 44px;
					line-height: 44px;
					.ivu-select-dropdown {
						margin: 0;
						top: 39px !important;
					}
				}
				.detail-container {
					flex: 1;
					position: relative;
					.ivu-col-span-12 {
						padding: 0;
					}
					.paging {
						width: 100%;
						height: 40px;
						position: absolute;
						bottom: 0;
						right: 0;
						display: -webkit-flex;
						display: flex;
						align-items: center;
						justify-content: space-around;
						border-top: 1px solid #e3e8ee;
						background: #f7f8fa;
						div{
							flex: 1;
							height: 100%;
							justify-content: space-between;
							padding: 0 10px 0 20px;
						}
					}
				}
				.detail-container:after {
					content: '';
					height: 100%;
					width: 1px;
					background: #e3e8ee;
					position: absolute;
					left: 50%;
					top: 0;
				}
			}
		}
		.search {
			margin: -5px -7px !important;
			padding: 5px 10px;
			border: none;
			color: #fff;
		}
	}
	
	.ivu-table-wrapper {
		width: 100%;
	}
	
	.new .ivu-modal-body {
		height: 490px;
		.ivu-select {
			width: 20%;
		}
		.parentTable {
			height: 200px;
			border: 1px solid #e0e0e0;
			background: #fff;
			box-sizing: inherit;
			.ivu-table-wrapper {
				border: none;
			}
		}
		.dataRange {
			width: 100%;
			position: relative;
			span {
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				align-items: center;
			}
			.dataRange_pos {
				position: absolute;
				top: 3px;
				right: 10px;
				height: 24px;
				width: 24px;
				background: url(../../assets/tree.png) no-repeat;
				background-position: -47px -98px;
			}
		}
	}
	
	.allot .ivu-modal-body {
		/*height: 260px;*/
		height: 400px;
	}
	
	.addParent .ivu-modal-body {
		height: 225px;
		.addParent_list {
			padding: 0;
			height: 172px;
			margin-top: 10px;
			border: 1px solid #e0e0e0;
			border-radius: 4px;
			overflow: auto;
		}
	}
	
	.allot .modalChoose_tree {
		padding: 0 14px;
		/*height: 205px;*/
		height: 315px;
		margin-top: 10px;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		overflow: auto;
		span.ivu-tree-title {
			background: url(../../assets/tree.png) 0px -50px no-repeat;
			padding-left: 25px;
		}
		.ivu-checkbox-wrapper {
			margin-right: 0;
		}
	}
	
	.chooseRange .ivu-modal-body {
		height: 360px;
		.range_list {
			padding: 14px;
			height: 300px;
			margin-top: 10px;
			border: 1px solid #e0e0e0;
			border-radius: 4px;
			overflow: auto;
		}
	}
	/********    模态框样式，可以共用    begin    ********/
	
	.ivu-modal-content {
		background: #fafafa;
	}
	
	.ivu-modal-header {
		background-image: linear-gradient(0deg, #f0f0f1, #fff);
		border-radius: 4px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		border-bottom: 1px solid #e0e0e0;
		padding: 10px;
		p {
			font-size: 16px;
			color: #396dd6;
		}
	}
	
	.ivu-modal-footer {
		padding: 5px 10px;
		border: none;
	}
	
	.ivu-modal-body {
		padding: 10px 10px 0;
		overflow: auto;
	}
	
	.vertical-center-modal {
		/*模态框垂直居中*/
		display: flex;
		align-items: center;
		justify-content: center;
		.ivu-modal {
			top: 0;
		}
	}
	
	.ivu-modal-close {
		top: 4px;
	}
	/********    模态框样式，可以共用    end    ********/
	
	.ivu-form-item {
		/*表单样式*/
		flex: 1;
		margin-bottom: 14px;
	}
	/*.ivu-select-dropdown{
		margin: 0;
		top: 39px !important;
	}*/
	.ivu-form .ivu-form-item-label {
	    font-size: 12px;
	}
	.parentRole .ivu-form-item-content {
		margin-left: 0 !important;
	}
	
	.ivu-table-cell {
		padding: 0;
		.ivu-checkbox-wrapper {
			margin: 0;
		}
	}
	/*.search{
		margin: -5px -7px !important;
		padding: 5px 10px;
		border: none;
		color: #fff;
	}*/
	/*标题栏的home图标*/
	
	.ivu-icon-home {
		font-size: 16px;
	}
	
	.ivu-icon-home:after {
		height: 23px;
		width: 23px;
		border: 2px solid #fff;
		content: '';
		display: block;
		position: absolute;
		top: 20px;
		left: 20px;
		border-radius: 50%;
	}
	
	.highLight {
		color: blue;
	}
	
	.blue {
		margin-right: 10px;
	}
</style>