<template>
	<div id="" class="evaluation_container">
		<div  class="lg-wrapper">
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
				                <p style="float: right;">评价查询</p>
				            </div>
		            	</div>
		            	<div class="form_item">
		            		<Form ref="searchInfo" :model="baseInfo" label-position="right" :label-width="100">
						         <Row>        
							        <Col span="8">
							            <FormItem label="姓名:" prop="lawyerName">
								            <Input v-model="baseInfo.lawyerName" placeholder="请输入律师姓名"></Input>
								        </FormItem>
							        </Col>
							        <Col span="8">
							             <FormItem label="所属律所:" prop="lawOfficeName">
								            <Input v-model="baseInfo.lawOfficeName" placeholder="请输入所属律所"></Input>
								        </FormItem>
							        </Col>
							        <Col span="8">
							            <FormItem label="打分分数:" prop="appraisalScore">
								            <Select v-model="baseInfo.appraisalScore" placeholder="请选择打分分数">
										        <Option value="1">1</Option>
										        <Option value="2">2</Option>
										        <Option value="3">3</Option>
										        <Option value="4">4</Option>
										        <Option value="5">5</Option>
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
							            <FormItem label="擅长案件类型:" prop="goodAtId">
								            <Select v-model="baseInfo.goodAtId" placeholder="请选择擅长案件类型">
										        <Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
										    </Select>
								        </FormItem>
							        </Col>
							    </Row>
							    <div class="flex btn_group">
							    	<Button type="primary" icon="refresh" class="blue btn-140" style="margin: 0 5px 0 0;" @click="handleReset('searchInfo')">重置查询条件</Button>
					                <Button type="primary" icon="ios-search" class="blue btn-140" style="margin: 0 0 0 5px;" @click="searchSubmit('searchInfo')">开始查询</Button>
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
				            	<Button type="primary" class="blue btn-100" style="display: inline-block; float: right;" @click="applyBlackList()">加入黑名单</Button>
				            </div>
		            	</div>
		            	<div class="blacklist_item">
		            		<Table border ref="selection" :columns="columns4" :data="datacopy" @on-selection-change="getSeletOp"></Table>
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
	import { mapGetters,mapState,mapActions  } from 'vuex'
	import router from '../../router'
	import lgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import {setStore} from '../../utils'
	import { cityArr, provinceList } from '../../utils/area'
	export default {
		name: 'EvaluationManage',
		components:{
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
		data(){
			return{
				totalSize: 1,
				currentPage: 1,
				 baseInfo: {
                    lawyerName: '',
                    lawOfficeName: '',
                    goodAtId: '',
                    county:'',
                    area:'',
                    region:'',
                    appraisalScore:'',
                },
                evaluation: {
                	content:'',
                	score:'',
                	time:''
                },
                idCopy:'',
                //省市区县
				cityArr:[],
				regionList: [],
                path:[
					{'name':'律师库管理','path':''},
					{'name':'评价管理','path':'/main/lawyerManage/evaluationManage'},
				],
                 columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
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
                        key: 'lawyerName',
                        align:'center',
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align:'center',
                    },
                    {
                        title: '评价单位',
                        key: 'appraisalUnitName',
                        align:'center',
                    },
                    {
                        title: '评价内容',
                        key: 'appraisalContent',
                        align:'center',
                    },
                    {
                        title: '打分情况',
                        key: 'appraisalScore',
                        align:'center',
                    },
                    {
                        title: '律师详情',
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
											this.$router.push({path: '/main/lawyerManage/lawyerDetail', query: {id: params.row.busId}});
										}
									}
								}, '查看')
							]);
                        }
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        lawfirm: '北京某某律师事务所',
                        company: '易建科技',
                        evaluationInfo: '暂无评价',
                        mark:'10',
                        id:1
                    },
                    {
                        name: 'Jim Green',
                        lawfirm: '上海某某律师事务所',
                        company: '文思海辉',
                        evaluationInfo: '暂无评价',
                        mark:'10',
                        id:2
                    },
                    {
                        name: 'Joe Black',
                        lawfirm: '西安某某律师事务所',
                        company: '天海投资',
                        evaluationInfo: '暂无评价',
                        mark:'10',
                        id:3
                    },
                    {
                        name: 'Jon Snow',
                        lawfirm: '海口某某律师事务所',
                        company: '海航实业',
                        evaluationInfo: '暂无评价',
                        mark:'10',
                        id:4
                    }
                ],
                dataSelect:[],
                dataList:[],
                datacopy:[],
                rulesEvaluation:{
                	content: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    score: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                    time: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
			}
		},
		mounted(){
			this.getAll(this.currentPage - 1)
		},
		created() {
            this.cityArr = cityArr
            this.getScajlx()
        },
		methods:{
			...mapActions([
				'setBalckList',
				"getScajlx"
			]),
			getAll(index){
				let that = this;
				console.log(this.baseInfo.lawOfficeName)
				that.$http.request({
					method: 'get',
					url: '/appraisal-findByCondition?page='+index+'&size=5&lawOfficeName='+this.baseInfo.lawOfficeName+'&goodAtId='+this.baseInfo.goodAtId+'&county='+this.baseInfo.county+'&area='+this.baseInfo.area+'&region='+this.baseInfo.region+'&appraisalScore='+this.baseInfo.appraisalScore+'&lawyerName='+this.baseInfo.lawyerName+'',
				}).then(function(res) {
					that.dataList = res.data.content.contentList;
					that.datacopy = res.data.content.contentList;
					that.totalSize = res.data.content.totalElements
				}).catch(function(err) {
					
				})	
			},
			searchSubmit(name){
				this.getAll(this.currentPage - 1)
			},
			getSeletOp(selection){
				this.dataSelect = selection
			},
			applyBlackList(){
				if(this.dataSelect.length <= 0){
					this.$Message.error('请选择律师!');
				}else{
					let that = this
					let idArr = []
					console.log(this.dataSelect)
					for (let i = 0; i < this.dataSelect.length; i++){
						idArr.push(
							{id:this.dataSelect[i].busId}
						)
					}
					console.log(idArr)
					that.$http.request({
						method: 'post',
						url: '/lawyer/blackList',
						data:idArr
					}).then(function(res) {
						if(res.data.code == 1){
							that.dataSelect = []
							that.getAll(that.currentPage - 1)
							that.$Message.success('加入黑名单成功！')
						}
					}).catch(function(err) {
						
					})
				}
			},
			changePage(index){
				this.currentPage = index;
				this.getAll(this.currentPage - 1)
			},
			handleReset(name){
				this.$refs[name].resetFields();
				this.getAll(this.currentPage - 1)
			},
			subEvalustion(){
				var that = this
				console.log(that.idCopy)
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
	.evaluation_container{
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
				                    background-position: -280px -30px;
				                    margin-right: 10px;
				                }
				                .icon_result{
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
						.form_item{
							padding: 0px 0px 20px;
							.ivu-select{
								width: 250px ;
							}
							.ivu-input{
								width: 250px ;
							}
							.ivu-date-picker{
								width: 100%;
							}
							.button_group{
								padding-left: 100px;
							}
						}
						.blacklist_item{
							padding: 0px 30px 20px;
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