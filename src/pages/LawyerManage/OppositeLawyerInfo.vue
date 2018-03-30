<template>
	<div class="lawyerquery_container">
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
			            		<Form ref="searchInfo" :model="baseInfo" label-position="right" :label-width="100" class="searchInfo">
							         <Row>        
								        <Col span="12">
								            <FormItem label="律师姓名:" prop="lawyerName">
									            <Input v-model="baseInfo.lawyerName" placeholder="请输入律师姓名"></Input>
									        </FormItem>
								        </Col>
								        <Col span="12">
								             <FormItem label="所属律所:" prop="lawOfficeName">
									            <Input v-model="baseInfo.lawOfficeDTO.lawOfficeName" placeholder="请输入律师所属律所"></Input>
									        </FormItem>
								        </Col>
								    </Row>
								    <Row>        
								        <Col span="12">
								            <FormItem label="开始时间:" prop="startTime">
									            <DatePicker v-model="baseInfo.startTime" type="date" placeholder="请选择开始时间"></DatePicker>
									        </FormItem>
								        </Col>
								        <Col span="12">
								             <FormItem label="结束时间:" prop="endTime">
									            <DatePicker v-model="baseInfo.endTime" type="date" placeholder="请选择结束时间"></DatePicker>
									        </FormItem>
								        </Col>
								    </Row>
								    <div class="flex btn_group">
								    	<Button type="primary" icon="refresh" class="blue btn-140" style="margin: 0 5px 0 0;" @click="handleReset('searchInfo')">重置</Button>
						                <Button type="primary" icon="ios-search" class="blue btn-140" style="margin: 0 0 0 5px;">开始查询</Button>
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
					            	<Button type="primary" class="blue btn-100 right_content" @click="lawyerEntry()">律师录入</Button>
					            </div>
			            	</div>
			            	<div class="lawyer_item">
			            		<Table border ref="selection" :columns="columns4" :data="data1" @on-selection-change="getSeletOp"></Table>
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
	import router from '../../router'
	import {setStore} from '../../utils'
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
			])
		},
		data(){
			return{
				totalSize: 10,
				currentPage: 1,
				 baseInfo: {
                    lawyerName: '',
                   lawOfficeDTO:{
						lawOfficeName:'',
						county:'',
						area:'',
                    	region:'',
                    	goodAtId: '',
					},
                    startTime:'',
                    endTime:'',
                    storageFlag:''
                },
                 columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '律师姓名',
                        key: 'name',
                        align:'center',
                    },
                    {
                        title: '所属律所',
                        key: 'lawfirm',
                        align:'center',
                    },
                    {
                        title: '地区',
                        key: 'region',
                        align:'center',
                    },
                    {
                        title: '擅长案件类型',
                        key: 'caseType',
                        align:'center',
                    },
                    {
                        title: '毕业学校',
                        key: 'shcoolTag',
                        align:'center',
                    },
                    {
                        title: '合作律师费总数（元）',
                        key: 'charge',
                        align:'center',
                    },
                    {
                        title: '律师评级',
                        key: 'lawyerRate',
                        align:'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(h, params) => {
                        	return h('div', [
								h('p', {
									props: {
										type: 'primary',
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
                    	title: '是否库内律师',
                    	key: 'isRollsLawyer',
                        align:'center',
                        render:(h, params) => {
                        	if(params.row.isRollsLawyer == 1){
                        		return h('div', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px',
											color:'#396dd6',
										},
									}, '是')
								]);
                        	}else{
                        		return h('span', [
									h('span', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px',
											color:'#396dd6',
										},
									}, '否')
								]);
                        	}
                        }
                   }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        lawfirm: '北京某某律师事务所',
                        region: '北京',
                        caseType: '民事',
                        shcoolTag:'北京大学',
                        charge:'12222',
                        lawyerRate:'A',
                        isRollsLawyer:0,
                        id:1,
                    },
                    {
                        name: 'Jim Green',
                        lawfirm: '上海某某律师事务所',
                        region: '上海',
                        caseType: '刑事',
                        shcoolTag:'清华大学',
                        charge:'12222',
                        lawyerRate:'A',
                        isRollsLawyer:1,
                        id:2,
                    },
                    {
                        name: 'Joe Black',
                        lawfirm: '西安某某律师事务所',
                        region: '海南',
                        caseType: '仲裁',
                        shcoolTag:'西安交通大学',
                        charge:'12222',
                        lawyerRate:'A',
                        isRollsLawyer:0,
                        id:3,
                    },
                    {
                        name: 'Jon Snow',
                        lawfirm: '海口某某律师事务所',
                        region: '西安',
                        caseType: '刑事',
                        shcoolTag:'复旦大学',
                        charge:'12222',
                        lawyerRate:'A',
                        isRollsLawyer:1,
                        id:4,
                    }
                ],
                path:[
					{'name':'律师库管理','path':''},
					{'name':'相对方律师查询','path':'/main/lawyerManage/oppositeLawyerInfo'},
				],
				dataSelect:[],
				//省市区县
				cityArr:[],
				regionList: [],
			}
		},
		mounted(){
			this.getAll(this.currentPage - 1)
			this.provienceChange( '北京' )
		},
		created() {
            this.cityArr = cityArr
        },
		methods:{
				...mapActions([
				'setBalckList'
			]),
			getAll(index){
				let that = this;
				console.log(this.baseInfo.lawOfficeName)
				that.baseInfo['page'] = index
				that.baseInfo['size'] = 10
				that.$http.request({
					method: 'post',
					url: 'lawyer/listLawyer',
					data:that.baseInfo,
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
						'Authorization':'Bearer '+ this.custormerToken
					},
				}).then(function(res) {
//					that.dataList = res.data.content.contentList;
//					that.totalSize = res.data.content.totalElements
				}).catch(function(err) {
					
				})	
			},
			changePage(){
				console.log('change')
			},
			handleReset(name){ 
				this.$refs[name].resetFields();
			},
			getSeletOp(selection){
				this.dataSelect = selection
			},
			lawyerEntry(){
				this.$router.push({path:'/main/lawyerManage/lawyerEntry'})
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
            }
		}
	}
</script>

<style lang="less">
	@baseColor:#000;
	.lawyerquery_container{
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
				                    margin-right: 10px;
				                    background: url(../../assets/icons.png);
				                    background-position: -280px -30px;
				                }
				                .icon_result{
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
				            .right_content{
					        	 display: inline-block !important;
					        	 float: right !important;
					        	 margin-right: 10px !important;				               
					        }
						}
						.form_item{
							padding: 0 0 20px;
							.ivu-select{
								width: 90% ;
							}
							.ivu-input-wrapper{
								width: 90% ;
							}
							.ivu-date-picker{
								width: 100%;
							}
							.button_group{
								padding-left: 20%;
							}
						}
						.lawyer_item{
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
		.btn-100{
			width: 100px;
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

