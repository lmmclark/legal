<template>
	<div class="remind_container">
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
						                <p style="float: right;">添加评价提醒</p>   
						            </div>
				            	</div>
				            	<div class="form_item">
				            		<div class="flex">
				            			<span>在每年的&nbsp;&nbsp;</span>
				            			<select name="" id="">
				            				<option value="" v-for="(item,index) in month">{{index+1}}</option>
				            			</select>
				            			<span>&nbsp;&nbsp;月&nbsp;&nbsp;</span>
				            			<select name="" id="">
				            				<option value="" v-for="(item,index) in days">{{index+1}}</option>
				            			</select>
				            			<span>&nbsp;&nbsp;日，提醒我进行律师律所整体评价</span>
				            		</div>
				            		 <div class="flex btn_group">
						                <Button type="primary" class="blue btn-100">添加</Button>
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
	export default {
		name: 'AddEvaluationRemind',
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
				path:[
					{'name':'律师库管理','path':''},
					{'name':'律师律所评价提醒','path':'/main/lawyerManage/blackListManage'},
				],
				month:12,
				days:31
			}
		},
		mounted(){
		},
		methods:{
		}
	}
</script>

<style lang="less">
	@baseColor:#000;
	.remind_container{
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
				                    background-position: -80px -30px;
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
							font-size: 14px;
							color:#1a1a1a;
							font-weight: bold;
							select{
								width: 45px;
								height: 28px;
								border-radius: 3px;
							}
							.btn_group{
								margin-top: 30px;
								.btn-100{
									width: 100px;
								}
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
	}
	
</style>

