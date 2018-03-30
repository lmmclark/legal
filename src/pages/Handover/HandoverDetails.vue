<template>
	<div class="handoverDetails lg-wrapper">
		<LgBreadcrumb :path='path'></LgBreadcrumb>
		<div class="approvalInfo">
			<p class="flex title"><span></span>审批信息</p>
			<Form ref="formApproval" :model="formApproval" :rules="ruleApproval" :label-width="120">
				<Row>
			        <Col span="12">
			        	<FormItem label="审批人：" prop="name">
			         	    <Input type="text" v-model="formApproval.name"></Input>
			        	</FormItem>
			        </Col>
			        <Col span="12">
			        	<FormItem label="审批时间：" prop="time">
			         	    <Input type="text" v-model="formApproval.time"></Input>
			        	</FormItem>
			        </Col>
			   </Row>
			   <Row>
			        <Col span="12">
			        	<FormItem label="审批结果：" prop="result">
			         	    <Input type="text" v-model="formApproval.result"></Input>
			        	</FormItem>
			        </Col>
			        <Col span="12">
			        	<FormItem label="指定交接人：" prop="handoverPerson">
			         	    <Input type="text" v-model="formApproval.handoverPerson"></Input>
			        	</FormItem>
			        </Col>
			    </Row>
			    <FormItem label="审批意见：" prop="opinion">
	         	    <Input type="text" v-model="formApproval.opinion"></Input>
	        	</FormItem>
			</Form>
		</div>
		<div class="handoverApply">
			<p class="flex title"><span></span>工作交接申请</p>
			<Form :label-width="120" :model="formApply" >
	        	<FormItem label="申请名称：">
	         	    <p>{{formApply.name}}</p>
	        	</FormItem>
	        	<Row>
			        <Col span="12">
			        	<FormItem label="申请时间：">
			         	    <p>{{formApply.time}}</p>
			        	</FormItem>
	  		    	</Col>
			        <Col span="12">
			        	<FormItem label="交接期限：">
			         	    <p>{{formApply.deadline}}</p>
			        	</FormItem>
			        </Col>
			    </Row>
	        	<FormItem label="交接内容：">
	         	    <p>{{formApply.content}}</p>
	        	</FormItem>
			    <FormItem label="具有的角色：">
	         	    <p>{{formApply.role}}</p>
	        	</FormItem>   
	        	<FormItem label="直接领导：">
	         	    <p>{{formApply.leader}}</p>
	        	</FormItem>  
	        	<FormItem label="交接说明：">
	         	    <p>{{formApply.illustrate}}</p>
	        	</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
	import LgBreadcrumb from '../../components/LgBreadcrumb.vue'
	export default {
		name: 'handoverDetails',
		components: {
			LgBreadcrumb
		},
		data(){
			return{
				path: [
		            { 'name': '工作交接', 'path': '/main/handover' },
		            { 'name': '工作交接详情', 'path': '/main/handover/handoverApply' }
		        ],
		        formApproval:{
		        	name: '张三',
		        	time: '2014.03.12',
		        	result: '同意',
		        	handoverPerson: '李四',
		        	opinion: '可以办理离职'
		        },
		        formApply:{
		        	name: '关于XX的辞职申请',
		        	time: '2018.03.16',
		        	deadline: '永久',
		        	content: '后台获取',
		        	role: '也是后台获取',
		        	leader: '张三丰',
		        	illustrate: '想说的都在里面'
		        },
		        ruleApproval:{
	        		name: [
                        { required: true, trigger: 'blur', message: '不能为空'}
                    ],
	        	}
			}
		},
		mounted(){
		},
	}
</script>

<style lang="less">
	.handoverDetails{
		.approvalInfo{
			width: 100%;
			padding:20px 80px 20px 50px;
			background: #fff;
			margin-bottom: 20px;
			.title{
				justify-content: flex-start;
				font-size: 18px;
				height: 50px;
				span{
					width: 16px;
					height: 20px;
					margin-right: 10px;
					display: inline-block;
					background: url(../../assets/icons.png) no-repeat -82px -30px;
				}
			}
		}
		.handoverApply{
			width: 100%;
			padding:20px 80px 20px 50px;
			margin-bottom: 20px;
			background: #fff;
			.title{
				justify-content: flex-start;
				font-size: 18px;
				height: 50px;
				span{
					width: 16px;
					height: 20px;
					margin-right: 10px;
					display: inline-block;
					background: url(../../assets/icons.png) no-repeat -443px -30px;
				}
			}
		}
	}
</style>

