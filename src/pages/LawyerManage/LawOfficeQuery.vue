<template>
	<div class="lawOfficeQuery_container">
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
					                <p>查询条件</p>
					            </div>
			            	</div>
			            	<div class="form_item">
			            		<Form ref="searchInfo" :model="baseInfo" label-position="right" :label-width="100">
							         <Row>        
								        <Col span="8">
								            <FormItem label="律所名称:" prop="lawOfficeName">
									            <Input v-model="baseInfo.lawOfficeName" placeholder="请输入律所名称"></Input>
									        </FormItem>
								        </Col>
								        <Col span="8">
								             <FormItem label="营业执照编号:" prop="executionPermissionNo">
									            <Input v-model="baseInfo.executionPermissionNo" placeholder="请输入营业执照编号"></Input>
									        </FormItem>
								        </Col>
								        <Col span="8">
								            <FormItem label="擅长案件类型:" prop="goodAtId">
									            <Select v-model="baseInfo.goodAtId" placeholder="请选择擅长案件类型">
											        <Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
											    </Select>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>        
								        <Col span="8">
								            <FormItem label="境内外:" prop="overseasFlag">
									            <Select v-model="baseInfo.overseasFlag" placeholder="请选择">
											        <Option value="0">境内</Option>
										        	<Option value="1">境外</Option>
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
								        <!--律所录入时没有区县字段，查询时暂时注掉区县-->
								        <!--<Col span="8">
								            <FormItem label="区县:" prop="region">
									            <Select v-model="baseInfo.region" placeholder="请选择区县">
											        <Option v-if="regionList.length>0" v-for='(item,index) in regionList' :value="item.value" :key='item.index'>{{item.label}}</Option>
											    </Select>
									        </FormItem>
								        </Col>-->
								    </Row>
								    <Row>        
								        <Col span="8">
								            <FormItem label="开始时间:" prop="startTime">
									            <DatePicker v-model="baseInfo.startTime" type="date" placeholder="请选择开始时间"></DatePicker>
									        </FormItem>
								        </Col>
								        <Col span="8">
								             <FormItem label="结束时间:" prop="endTime">
									            <DatePicker v-model="baseInfo.endTime" type="date" placeholder="请选择结束时间"></DatePicker>
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
			            	<div class="info_title">
			            		<div class="title flex">
					                <div class="icon_result"></div>
					                <p>查询结果</p>
					            </div>
					            <div>
					            	<p style="display: inline-block; float: right;">合作案件律师费用总和（万元）:<span>22</span></p>
					            </div>
			            	</div>
			            	<div class="blacklist_item">
			            		<Table border ref="selection" :columns="columns4" :data="dataList"></Table>
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
	import { mapGetters,mapState,mapActions  } from 'vuex'
	import {setStore} from '../../utils'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import { cityArr, provinceList } from '../../utils/area'
	import qs from 'qs'
	export default {
		name: 'LawyerQuery',
		components: {
			lgBreadcrumb
		},
		computed: {
			...mapGetters([
				'custormerToken'
			]),
			...mapState([
				"scajlx",
			])
		},
		data(){
			return{
				totalSize: 10,
				currentPage: 1,
				baseInfo: {
                    lawOfficeName:'',
                    executionPermissionNo: '',
                    goodAtId:'',
                    overseasFlag:'',
                    area:'',
                    region:'',
                    startTime:'',
                    endTime:'',
                },
                isDisabled: false,
                regionList:[],
                columns4: [
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
                        title: '国家',
                        key: 'county',
                        align:'center',
                    },
                    {
                        title: '地区',
                        key: 'area',
                        align:'center',
                    },
                    {
                        title: '常年法律顾问',
                        key: 'commonlyUseFlag',
                        align:'center',
                        render:(h, params) => {
                        	if(params.row.commonlyUseFlag == 1){
                        		return h('div', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
									}, '是')
								]);
                        	}else if(params.row.commonlyUseFlag == 0){
                        		return h('span', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
									}, '否')
								]);
                        	}else{
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
                        key: 'reserveFirst',
                        align:'center',
                    },
                    {
                        title: '合作律师费总数（万元）',
                        key: 'everyCost',
                        align:'center',
                    },
					{
						title: '操作',
						align:'center',
						//width: 150,
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
												this.$router.push({path: '/main/lawyerManage/lawOfficeDetail', query: {id: params.row.id}});
											}
										}
									}, '查看')
							]);
						}
					}
                ],
				dataList: [],
                path:[
					{'name':'律师库管理','path':''},
					{'name':'律所查询','path':'/main/lawyerManage/lawOfficeQuery'},
				],
			}
		},
		mounted(){
			this.getAll(this.currentPage - 1)
			this.provienceChange( '北京' )
		},
		created() {
            this.cityArr = cityArr
            this.getScajlx()
        },
		methods:{
			...mapActions([
				"getScajlx"
			]),
			getAll(index){
				let that = this;
				console.log(this.baseInfo.lawOfficeName)
				that.baseInfo['page'] = index
				that.baseInfo['size'] = 10
				if(that.baseInfo.startTime){
					that.baseInfo.startTime = that.formatDate(that.baseInfo.startTime)
				}else{
					
				}
				if(that.baseInfo.endTime){
					that.baseInfo.endTime = that.formatDate(that.baseInfo.endTime)
				}else{
					
				}
				that.$http.request({
					method: 'post',
					url: '/lawOffice/listLawOffices',
					data:that.baseInfo,
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
						'Authorization':'Bearer '+ this.custormerToken
					},
				}).then(function(res) {
					if(res.data.code == 1){
						that.dataList = res.data.content.result.content;
						that.totalSize = res.data.content.result.totalElements
					}
				}).catch(function(err) {
					
				})	
			},
			searchLawyerInfo(){
				if(this.isDisabled == true) {
					this.$Message.error('请正确选择起始时间与结束时间！');
				} else if(this.isDisabled == false) {
					this.getAll(this.currentPage - 1)
				}
			},
			provienceChange( province ) { //根据省市获取区县信息
                let regionArr = [];
                for ( let i = 0; i < cityArr.length; i++ ) {
                    if ( province == provinceList[ i ].name ) {

                        if ( province == '北京' || province == '天津' || province == '上海' || province == '重庆' ) {
                            let data = provinceList[ i ].cityList[ 0 ].areaList;
                            for ( let k = 0; k < data.length; k++ ) {
                                let obj = {
                                    value: data[ k ],
                                    label: data[ k ]
                                }
                                regionArr.push( obj )
                            }
                        } else {
                            console.log( provinceList[ i ] )
                            if ( province != '台湾' && province != '香港' && province != '澳门' ) {
                                let data = provinceList[ i ].cityList;
                                for ( let k = 0; k < data.length; k++ ) {
                                    let obj = {
                                        value: data[ k ].name,
                                        label: data[ k ].name
                                    }
                                    regionArr.push( obj )
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
            },
			changePage(index){
				this.currentPage = index;
				this.getAll(this.currentPage - 1)
			},
			handleReset(name){ 
				this.$refs[name].resetFields();
				this.getAll(this.currentPage - 1);
			},
			formatDate(date){
				var y = date.getFullYear();  
			    var m = date.getMonth() + 1;  
			    m = m < 10 ? '0' + m : m;  
			    var d = date.getDate();  
			    d = d < 10 ? ('0' + d) : d;  
			    return y + '-' + m + '-' + d; 
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
	@baseColor:#1a1a1a;
	.lawOfficeQuery_container{
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
				                    background-position: -300px -30px ;
				                }
				                .icon_result{
				                	height: 20px;
				                    width: 20px;
				                    background: url(../../assets/icons.png);
				                    margin-right: 10px;
				                    background-position: -280px -30px ;
				                }
				                p {
				                    font-size: 18px;
				                    color: #1a1a1a;
				                    font-weight: 600;
				                }
				            }
						}
						.form_item{
							padding: 0 0 20px;
							.ivu-select{
								width: 250px ;
							}
							.ivu-input{
								width: 250px ;
							}
							.ivu-date-picker{
								width: 250px;
							}
							.button_group{
								padding-left: 20%;
							}
						}
						.blacklist_item{
							padding: 0 30px 20px;
							min-height: 150px;
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

