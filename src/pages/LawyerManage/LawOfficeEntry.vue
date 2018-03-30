<template>
	<div id="" class="lawOfficeEntry_container">
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
						                <div class="icon"></div>
						                <p>律所录入</p>
						            </div>
				            	</div>
				            	<div class="form_item">
						           	<Modal class-name='chooseLawyerForOffice' v-model="modalAdd" title="选择律师" @on-visible-change="queryLawyers">
						                <div class="flex legal-transfer">
						                    <div class="table-container">
						                        <div class="flex" style="margin-bottom:20px;">
						                            <Input :disabled="disabledSearch" placeholder="请输入律师或者律所的名称"></Input>
						                            <Button :disabled="disabledSearch"type="primary" style="width:80px;">搜索</Button>
						                            <Button type="primary" style="width:80px;" @click="addLawyer">新增</Button>
						                        </div>
						                        <Table border ref="selection" :columns="columns_left" :data="lawyerArray" width='350' height='250' no-data-text='暂无数据' @on-selection-change='leftSelect'>
						                        </Table>
						                    </div>
						                    <div class="flex arrow-box">
						                        <Button type="ghost" @click="toRight" :disabled="toRightDisabled"><Icon type="arrow-right-a"></Icon></Button>
						                        <Button type="ghost" @click="toLeft" :disabled="toLeftDisabled" style="margin-top: 10px;"><Icon type="arrow-left-a"></Icon></Button>
						                    </div>
						                    <div class="table-container target-table-container">
						                        <Table border ref="selected-selection" :columns="columns_right" :data="tagertData" width='350' height='250' @on-selection-change='RightSelect' no-data-text='暂无数据'>
						                        </Table>
						                    </div>
						                </div>
						                <div slot="footer">
						                    <div class="flex footerButton">
						                        <Button type="primary" class="green" style="width:100px;" @click="ok">确认</Button>
						                        <Button type="ghost" style="width:100px;" @click="cancel">关闭</Button>
						                    </div>
						                </div>
						            </Modal>
				            		<Form ref="baseInfo" :model="baseInfo" :rules="ruleBaseInfo" label-position="right" :label-width="125">
				            			<Row>        
									        <Col span="10">
									            <FormItem label="律所名称:" prop="lawOfficeName">
										            <Input v-model="baseInfo.lawOfficeName" placeholder="请输入律所名称" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
									        	<FormItem label="国家:" prop="county">
										            <Input v-model="baseInfo.county" placeholder="请输入所在国家" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>        
									        <Col span="10">
									        	<FormItem label="省市:" prop="area">
										            <Select v-model="baseInfo.area" placeholder="请选择省市" class="inputWidth">
												        <Option v-for='(item,index) in cityArr' :value="item.value" :key='item.index'>{{item.label}}</Option>
												    </Select>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
									            <FormItem label="地址:" prop="address">
										            <Input v-model="baseInfo.address" placeholder="请输入详细地址" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>
									    	<Col span="10">
									            <FormItem label="是否常年法律顾问:" prop="commonlyUseFlag">
										            <RadioGroup v-model="baseInfo.commonlyUseFlag" class="inputWidth">
				                                        <Radio label="1">是</Radio>
				                                        <Radio label="2">否</Radio>
				                                    </RadioGroup>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>
									    	<Col span="10">
									            <FormItem label="服务单位:" prop="serviceUnitsName">
										            <Input v-model="baseInfo.serviceUnitsName" class="unite inputWidth" placeholder="请选择服务的单位" @on-focus="showtree" onpaste="return false"></Input>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
									            <FormItem label="执行许可证:" prop="executionPermissionNo">
										            <Input v-model="baseInfo.executionPermissionNo" placeholder="输入律所执行许可证" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>        
									        <Col span="10">
									        	<FormItem label="联系人1:" prop="contact">
										            <Input v-model="baseInfo.contact" placeholder="请输入联系人姓名" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
										        <FormItem label="办公电话:" prop="contactTel">
										            <Input v-model="baseInfo.contactTel" placeholder="请输入办公电话" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>        
									        <Col span="10">
									        	<FormItem label="手机号:" prop="contactMobile">
										            <Input v-model="baseInfo.contactMobile" placeholder="请输入手机号" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
									        	<FormItem label="邮箱:" prop="contactEmail">
										            <Input v-model="baseInfo.contactEmail" placeholder="请输入邮箱" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>        
									        <Col span="10">
									        	<FormItem label="联系人2:" prop="contactSecond">
										            <Input v-model="baseInfo.contactSecond" placeholder="请输入联系人姓名" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
									            <FormItem label="办公电话:" prop="contactSecondTel">
										            <Input v-model="baseInfo.contactSecondTel" placeholder="请输入办公电话" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>        
									        <Col span="10">
									        	<FormItem label="手机号:" prop="contactSecondMobile">
										            <Input v-model="baseInfo.contactSecondMobile" placeholder="请输入手机号" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
									            <FormItem label="邮箱:" prop="contactSecondEmail">
										            <Input v-model="baseInfo.contactSecondEmail" placeholder="请输入邮箱" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>
									    	<Col span="10">
									            <FormItem label="司法资源:" prop="judicialResources">
										            <Input v-model="baseInfo.judicialResources" placeholder="请输入司法资源" class="inputWidth"></Input>
										        </FormItem>
									        </Col>
									        <Col span="10" offset="3">
									            <FormItem label="擅长业务范围:" prop="goodAtId1" class="business1">
										           	<Select v-model="baseInfo.goodAtId1" placeholder="请选择" class="inputWidth">
				                                    	<Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
				                                   	</Select>
										        </FormItem>
										    </Col>
										    <!--<Col span="4">    
										        <FormItem label="" prop="goodAtId2" class="business2">
				                                    <Select v-model="baseInfo.goodAtId2" placeholder="请选择">
				                                        <Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
				                                    </Select>
										        </FormItem>
									        </Col>-->
									    </Row>
									    <Row>        
									        <Col span="10">
									            <FormItem label="有无分所:" prop="hasSuboffice">
										            <RadioGroup v-model="baseInfo.hasSuboffice">
				                                        <Radio label="1">有</Radio>
				                                        <Radio label="2">无</Radio>
				                                    </RadioGroup>
										        </FormItem>
									        </Col>
									    </Row>
									    <template v-if="baseInfo.hasSuboffice==1">
										    <Row v-for="(item, index) in baseInfo.lawOfficeDTOList" :key="index">        
										        <Col span="10">
										            <FormItem :label="'分所名称 ' + (index+1)+':'"
										            	:prop="'lawOfficeDTOList.'+index+'.lawOfficeName'"
										             	:rules="[{ validator: noRepeatWithFirst,trigger: 'blur'}]">
											            <Input v-model="item.lawOfficeName" placeholder="请输入分所名称" class="inputWidth"></Input>
											        </FormItem>
										        </Col>
										        <Col span="10" offset="3">
										            <FormItem :label="'分所地址 ' + (index+1)+':'"
										             	:prop="'lawOfficeDTOList['+index+'].address'"
										             	:rules="{required: true, message: '不能为空', trigger: 'blur'}">
											            <Input v-model="item.address" placeholder="请输入分所地址" class="inputWidth"></Input>
											        </FormItem>
										        </Col>
										        <Col span="1" class="flex">
										        	<Button type="primary" class="blue dynamicDelete" @click="handleRemove(index)">Delete</Button>
										        </Col>
										    </Row>
										    <Row>        
										        <Col span="24">
										            <FormItem>
											           <Button type="primary" class="blue btn-100" @click="handleAdd">添加分所</Button>
											        </FormItem>
										        </Col>
										    </Row>
									    </template>
									    <Row>
									    	<Col span="24">
									            <FormItem label="律所荣誉:" prop="honor">
										            <Input v-model="baseInfo.honor" @input="descInputHonor" type="textarea" :rows="4" :maxlength="500" style="width: 95%;" placeholder="请输入律所荣誉"></Input>
										        	<p>剩余字数: <span style="color: red;">{{remnant}}</span></p>
									            </FormItem>
									        </Col>
									    </Row>
									    <Row>
									    	<Col span="24">
									            <FormItem label="律所简介:" prop="remark">
										            <Input v-model="baseInfo.description" @input="descInputDescription" type="textarea" :rows="4" :maxlength="500" style="width: 95%;" placeholder="请输入律所简介"></Input>
										        	<p>剩余字数: <span style="color: red;">{{remnant}}</span></p>
									            </FormItem>
									        </Col>
									    </Row>
									    <Row>        
									        <Col span="24">
									            <FormItem label="相关附件:" prop="attachmentInfoDTOs">
										            <Upload
										            	:max-size='10240' 
										            	:format="FileFormat()"
						                                name="attachmentFile"
						                                data-file="1"
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
									    <!--暂时隐藏律所内律师功能-->
									    <!--<Row>        
									        <Col span="24">
									            <FormItem label="律所内律师:">
										           <Button type="primary" class="blue btn-100" icon="plus" @click="modalAdd = true">添加</Button>
										        </FormItem>
									        </Col>
									    </Row>
									    <Row>
									    	<FormItem label="">
									    		<Table border ref="lawyers" :columns="lawyersCol" :data="lawyersData" style="width: 95%;"></Table>
									    	</FormItem>
									    </Row>-->
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
		        <OrgTree v-model="openOrg" @ok='insertinput' :only='true' title="服务单位" type='org'></OrgTree>
	    	</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters,mapState,mapActions  } from 'vuex'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import OrgTree from '../../components/OrgTree.vue'
	import {getarea} from '../../utils/area.js'
	import { cityArr } from '../../utils/area.js'
	import {fileFormat } from '../../utils'
	export default {
		name: 'blackmanage',
		components:{
			lgBreadcrumb,
			OrgTree
		},
		computed: {
			...mapGetters([
			]),
			...mapState([
				"scajlx",
				"lsxl"
			])
		},
		data(){
			const mobileVal = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                	let reg = /^1[34578]\d{9}$/;
                    if (reg.test(value)) {
                        // 对第二个密码框单独验证
                        callback();
                    }else{
                    	callback(new Error('请输入正确的手机号'));
                    }
                    
                }
            };
            const celphoneNum = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电话号码'));
                } else {
                	let reg = /^0\d{2,3}-?\d{7,8}$/;
                    if (reg.test(value)) {
                        // 对第二个密码框单独验证
                        callback();
                    }else{
                    	callback(new Error('请输入正确的电话号码'));
                    }
                    
                }
            };
            const emailVal = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱地址'));
                } else {
                    let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                    if (reg.test(value)) {
                    	callback();
                    }else{
                    	callback(new Error('请输入正确的邮箱地址'));
                    }
                    
                }
            };
            const noChinese = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入执行许可证'));
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
			const noRepeat= (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入律所名称'));
				} else {
					this.$http.request({
						method: 'get',
						url: '/lawOffice/checkName?lawOfficeName='+value,
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
							'Accept': 'application/json',
							'Authorization':'Bearer '+ this.custormerToken
						},
					}).then(function(res) {
						if(res.data.code===-1){
							callback(new Error('律所名称重复'));
						}else{
							callback();
						}
					}).catch(function(err) {
						callback();
					})
				}
			};
			return{
				cityArr:[],
				totalSize: 10,
				currentPage: 1,
				remnant: 500,
				surplus:500,
				modalAdd:false,
				openOrg:false,
				baseInfo:{
					lawOfficeName:'',
					county:'',
					area:'',
					address:'',
					commonlyUseFlag:'2',
					//lawyersData:[],//暂时注掉律所内律师功能
					serviceUnitsName:'',
					executionPermissionNo:'',
					contact:'',
					contactTel:'',
					contactMobile:'',
					contactEmail:'',
					contactSecondEmail:'',
					contactSecond:'',
					contactSecondTel:'',
					contactSecondMobile:'',
					judicialResources:'',
					goodAtId1:'',
					goodAtId2:'',
					hasSuboffice:'2',
					creator:'',
					createTime:'',
					honor:'',
					description:'',
					attachmentInfoDTOs:[],
               		lawOfficeDTOList:[
               			{
               				lawOfficeName: '',
               				address: '',
               			}
               		],
				
				},
				path:[
					{'name':'律师库管理','path':''},
					{'name':'律所录入','path':'/main/lawyerManage/lawOfficeEntry'},
				],
				ruleBaseInfo:{
					lawOfficeName:[{ required: true, validator: noRepeat, trigger: "blur" }],
					county:[{ required: true, message: "不能为空", trigger: "blur" }],
					area:[{ required: true, message: "不能为空", trigger: "change" }],
					address:[{ required: true, message: "不能为空", trigger: "blur" }],
					commonlyUseFlag:[{ required: true, message: "不能为空", trigger: "blur" }],
					serviceUnitsName:[{ required: true, message: "不能为空", trigger: "change" }],
					executionPermissionNo:[{ required: true, validator: noChinese, trigger: "blur" }],
					contact:[{ required: true, message: "不能为空", trigger: "blur" }],
					contactSecond:[{ required: false, message: "不能为空", trigger: "blur" }],
					contactTel:[{required: true,validator: celphoneNum,trigger: 'blur'}],
					contactSecondTel:[{ required: false, message: "不能为空", trigger: "blur" }],
					contactMobile:[{required: true,validator: mobileVal,trigger: 'blur'}],
					contactSecondMobile:[{ required: false, message: "不能为空", trigger: "blur" }],
					contactEmail:[{required: true,validator: emailVal,trigger: 'blur'}],
					contactSecondEmail:[{ required: false, message: "不能为空", trigger: "blur" }],
					judicialResources:[{ required: false, message: "不能为空", trigger: "blur" }],
					goodAtId1:[{ required: true,type: "number", message: "不能为空", trigger: "change" }],
					goodAtId2:[{ required: true,type: "number", message: "不能为空", trigger: "change" }],
					//hasSuboffice:[{ required: true, message: "不能为空", trigger: "blur" }],
					honor:[{ required: true, message: "不能为空", trigger: "blur" }],
					description:[{ required: true, message: "不能为空", trigger: "blur" }],
				},
				lawyersCol: [
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
										color:'#1a1a1a',
										cursor:'pointer'
									}
								}, params.index + 1)
							]);
                        }
                    },
                    {
                        title: '律师姓名',
                        key: 'LawyerName',
                        align:'center',
                    },
                    {
                        title: '律师评级',
                        key: 'RatingId',
                        align:'center',
                    },
                    {
                        title: '擅长案件类型',
                        key: 'GoodAtId',
                        align:'center',
                    },
                    {
                        title: '毕业院校',
                        key: 'School',
                        align:'center',
                    },
                    {
                        title: '律师费用（元）',
                        key: 'CasesCost',
                        align:'center',
                    },
                    {
                        title: '是否常年法律顾问',
                        key: 'CommonlyUseFlag',
                        align:'center',
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
                ],
                columns_left: [ {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 185,
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'lawoffice',
                        width: 103,
                        align: 'center',
                    },
                ],
                columns_right: [ {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 185,
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'lawoffice',
                        width: 103,
                        align: 'center',
                    },
                ],
                lawyerArray: [],
                tagertData: [],
                toRightArray: [],
                toLeftArray: [],
                lawyersData:[
                	
                ],
                disabledSearch:true,
                //向右按钮禁用
                toRightDisabled: false,
                //向左按钮禁用
                toLeftDisabled: false,
                //用来存储已经上传的所有文件，以便删除文件时使用
				allFileList:[],
                
			}
		},
		created(){
			this.cityArr=cityArr;
	    	this.getScajlx()
	    },
		mounted(){
			
		},
		methods:{
			...mapActions([
	            "getScajlx",
	        ]),
			FileFormat(){
            	return fileFormat
           	},
			handleSubmit(name){
				var that = this
				let goodAtId1 = that.baseInfo.goodAtId1
				let goodAtName1;
				switch (goodAtId1){
					case 98:
						goodAtName1 = '刑事'
						break;
					case 99:
						goodAtName1 = '仲裁'
						break;
					case 100:
						goodAtName1 = '民事'
						break;
					case 101:
						goodAtName1 = '咨询'
						break;
					default:
						break;
				}
				
				that.baseInfo.goodAtName1=goodAtName1;
				let lawOfficeArr = []	
				lawOfficeArr.push(that.baseInfo);
				if(that.baseInfo.hasSuboffice == 1){
					//有分所
					let subLawOfficeArr = that.baseInfo.lawOfficeDTOList
					for(let i = 0; i<subLawOfficeArr.length;i++){
						lawOfficeArr.push(subLawOfficeArr[i])
					}
				}
				that.$refs[name].validate((valid) => {
                    if (valid) {
                       that.$http.request({
							method: 'post',
							url: '/lawOffice/lawOffice',
							data:lawOfficeArr,
//							headers: {
//								'Content-Type': 'application/json;charset=UTF-8',
//								'Accept': 'application/json',
//								'Authorization':'Bearer '+ this.custormerToken
//							},
						}).then(function(res) {
							if(res.data.code == 1){
								that.$Message.success("添加成功")
								that.$router.push({path:'/main/lawyerManage/lawOfficeQuery'})
							}else if(res.data.code == -2){
								that.$Message.error("分所名称不能重复")
							}
						}).catch(function(err) {
							
						})
                    } else {
                        that.$Message.error('请正确填写！');
                    }
                })
			},
			handleReset(name){ 
				this.$refs[name].resetFields();
			},
			changePage(){
				console.log('change')
			},
			upLoadSuccess(response, file, fileList) {
		      	let obj = {};
				for(const key in file) {
					obj[key] = file[key];
				}
				this.allFileList.push(obj)
			    if(response.code == 1){
			      	obj['attPath'] = response.content
			      	let nameArr=file.name.split(".")
			      	let length=nameArr.length
			      	let type=nameArr[length-1]
			      	let attType;
			      	if(type=='png'||type=='jpg'||type=='jpeg'||type=='bmp'||type=='gif'||type=='psd'){
			      		attType=1;
			      	}else if(type=='doc'||type=='docx'||type=='txt'||type=='xlsx'){
			      		attType=2;
			      	}else if(type=='zip'||type=='rar'){
			      		attType=3;
			      	}else{
			      		attType=4;
			      	}
			      	obj['attType'] = attType;
			      	obj['busType'] = 3
			      	obj['attName'] = file.name
			      	this.baseInfo.attachmentInfoDTOs.push(obj)
			    }
		    },
		    // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
		    upLoadProgress(event, file, fileList) {
		     
		    },
		    // 上传之前
		    beforeUpload(file) {
		      console.log(file);
		      //return false;阻止提交
		    },
		    // 删除
		    removeUpload(file, fileList) {
		      	let idArr = []
				for (let i = 0; i < this.allFileList.length;i++) {
					idArr.push(this.allFileList[i].uid)
				}
				console.log(file.uid)
				console.log(idArr)
				console.log(idArr.indexOf(file.uid))
				this.baseInfo.attachmentInfoDTOs.splice(idArr.indexOf(file.uid),1)
		    },
		    descInputDescription(){
				var txtVal = this.baseInfo.description.length;
				this.remnant = 500 - txtVal;
			},
			descInputHonor(){
				var txtVal = this.baseInfo.honor.length;
				this.surplus = 500 - txtVal;
			},
			addHistoryCoop (name) {
				var that = this
				//that.$refs.addHistory指向的是CooperateHistory组件
				//表单参数，相当于CooperateHistory组件中的this.formValidate;
				let data = that.$refs.addHistory.formValidate;
				let obj = {};
	            for (const key in data) {
	                obj[key] = data[key];
	            }
                this.$refs.addHistory.$refs.formValidate.validate((valid) => {
                    if (valid) {
                    	that.lawyersData.push(obj)
                    	//$refs: 一个对象，持有该组件上已注册过 ref 的所有子组件,属性名称是ref的值，对应的属性值是组件
                    	//因为this.$refs.addHistory指向的是CooperateHistory组件
                    	//所以this.$refs.addHistory.$refs.formValidate就相当于CooperateHistory.$refs.formValidate，也就是
                    	//指CooperateHistory组件中ref属性为formValidate的组件，即Form表单
                    	//CooperateHistory组件中的表单域是双向绑定的，重置之后that.$refs.addHistory.formValidate对象的所有属性值为空
                        this.$refs.addHistory.$refs.formValidate.resetFields();
                        that.modalAdd = false
                    } else {
                        that.$Message.error('Fail!');
                    }
                })
            },
            handleAdd(){
            	this.index++;
                this.baseInfo.lawOfficeDTOList.push({
                    lawOfficeName: '',
                    address: '',
                });
            },
            handleRemove(index){
            	if (this.baseInfo.lawOfficeDTOList.length != 1) {
                    this.baseInfo.lawOfficeDTOList.splice(index, 1);
                } else {
                    this.$Message.warning("至少存在一个分所");
                }
            	
            },
            transferTime(date){
				var y = date.getFullYear();  
			    var m = date.getMonth() + 1;  
			    m = m < 10 ? '0' + m : m;  
			    var d = date.getDate();  
			    d = d < 10 ? ('0' + d) : d;  
			    return y + '-' + m + '-' + d; 
			},
			queryLawyers(){
//				this.$http.request({
//					method: 'post',
//					url: '',						
//					headers: {
//						'Content-Type': 'application/json;charset=UTF-8',
//						'Accept': 'application/json'
//					},
//					data:params
//				}).then(function(res) {
//					if(res.data.code =='1'){
//						that.$Message.success({
//		                    title: '信息提示',
//		                    desc: res.data.message
//		               	});
//						this.lawyerArray=res.data.content;
//					}else{
//						that.$Message.error({
//							title: '信息提示',
//							desc: res.data.message
//						});
//					}
//				}).catch(function(err) {
//					that.$Message.error({
//	                    title: '错误',
//	                    desc:  '添加错误'
//	                });
//				})
				this.lawyerArray=[ 
                	{
                        id: '1',
                        name: '张三',
                        lawoffice: '北京XXX律师事务所',
                        district: '北京',
                        GoodAtType: '刑事',
                        graduateInstitutions: '清华大学',
                        level: 'A',
                        totalFee: '2',
                    },
                    {
                        id: '2',
                        name: '李四',
                        lawoffice: '北京XXX律师事务所',
                        district: '北京',
                        GoodAtType: '仲裁',
                        graduateInstitutions: '北京大学',
                        level: 'B',
                        totalFee: '2.5',
                    }
                ];
			},
			leftSelect( selection ) {
                if ( selection.length > 5 ) {
                    this.$Message.error( {
                        title: '选择律师数量错误',
                        desc: '选择律师个数过多'
                    });
                } else {
                    this.toRightArray = selection;
                }
            },
            ok() {
                if ( this.tagertData.length != 1 ) {
                    this.$Message.error( '必须选择且只能选择一个律师' );
                    return false;
                } else {
                    this.modalAdd = false;
                    this.lawyersData = this.tagertData;
                    this.tagertData = []
                }
            },
            cancel() {
                this.modalAdd = false
                this.tagertData = []
            },
            RightSelect( selection ) {
                this.toLeftArray = selection;
            },
            toRight() {
                console.log( this.toRightArray )
                this.tagertData = this.toRightArray
            },
            toLeft() {
                let tagertData = this.tagertData;
                let toLeftArray = this.toLeftArray;
                if ( toLeftArray.length > 0 ) {
                    for ( let i = 0; i < toLeftArray.length; i++ ) {
                        for ( let j = 0; j < tagertData.length; j++ ) {
                            if ( toLeftArray[ i ].id == tagertData[ j ].id ) {
                                tagertData.splice( i, 1 )
                            }
                        }
                    }
                    this.tagertData = tagertData
                }

            },
            addLawyer(){
            	this.$router.push({path: '/main/lawyerManage/lawyerEntry'});
            	//routes.push({path: '/main/lawyerManage/lawyerEntry'});
            },
            showtree(){
            	this.openOrg = true;	
            },
            insertinput(data){
            	console.log(data);
            	this.baseInfo.serviceUnitsName = data[0].orgName;
            },
            noRepeatWithFirst(rule, value, callback) {
				if(value === '') {
					callback(new Error('请输入分所名称'));
				} else {
					let firstLawOfficeName = this.baseInfo.lawOfficeName
					if(this.baseInfo.lawOfficeName){
						if(value ===this.baseInfo.lawOfficeName){
							callback(new Error('分所名称不能和主所名称相同'));
						}else{
							callback();
						}
					}else{
						callback();
					}
				}
			},
		}
	}
</script>

<style lang="less">
	@baseColor:#000;
	.lawOfficeEntry_container{
		height:100%;
		min-height: 500px;
		.layout{
		    background: #F3F4F5;
		    position: relative;
		    border-radius: 4px;
		    overflow: hidden;
		    .ivu-layout{
		    	background: #F3F4F5;
		    	.ivu-layout-content{
			    	.wrap_item{
		    		    background: #fff;
						border-radius: 4px;
						box-sizing: border-box;
						margin-bottom: 20px;
						.unite {
				            .ivu-input {
				                background: url('../../assets/company.png') no-repeat 98% center;
				            }
				        }
				        .person {
				            .ivu-input {
				                background: url('../../assets/person.png') no-repeat 98% center;
				            }
				        }
						.form_item{
							padding: 0px 30px 20px;
							.inputWidth{
								width: 250px;
							}
						}
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
				                    background: url(../../assets/icons.png);
				                    margin-right: 10px;
				                    background-position:  -40px -30px;
				                }
				                p {
				                    font-size: 18px;
				                    color: #1a1a1a;
				                    font-weight: 600;
				                }
				            }
						}
						.business1{
							.ivu-form-item-content{
								width: 60%;
							}
						}
						.business2{
							.ivu-form-item-content{
								margin-left: 75px !important;
								width: 60%;
							}
						}
						.flex{
							
							.dynamicDelete {
								margin-left: 5px;
								padding:2px;
								width:45px;
								height:30px;
								text-align: center;
							}
						}
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
		.btn-100{
			width: 100px !important;
		}
		.ivu-form-item-label{
			color: #000000;
			font-weight: bold;
		}
		.ivu-table-cell span{
		    color: #1a1a1a !important;
		    font-weight: bold;
		}
		.ivu-table-cell p{
		    font-weight: bold;
		}
		.ivu-table{
			width: 100% !important;
		}
	}
	.chooseLawyerForOffice .ivu-modal {
        width: 800px !important;
        height:auto;
        .choose-lawyer-tips {
            text-align: center;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            margin-bottom: 10px;
        }
        .ivu-modal-header-inner{
        	font-size: 16px;
        	color:#396dd6;
        }
        .ivu-modal-body{
        	margin:20px;
        	padding:0;
        }
    }
	.legal-transfer {
        .arrow-box {
            flex-direction: column;
            margin: 42px 10px 10px 10px;
        }
        .table-container {
            width: 350px;
            .flex{
            	justify-content:flex-start;
            	.ivu-input-wrapper{
	            	width:170px;
	            }
	            .ivu-btn{
	            	margin-left: 10px;
	            }
            }
            .ivu-table-header{
            	font-size: 14px;
        		color:#lalala;
            }
            
        }
        .footerButton{
        	font-size: 14px;
        	color:#999999;
        	border-color: #cccccc;
        }
        .target-table-container {
            margin-top: 54px;
        }
        
    }
	
</style>