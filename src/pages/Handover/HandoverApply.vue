<template>
	<div class="handoverApply lg-wrapper">
		<LgBreadcrumb :path='path'></LgBreadcrumb>
		<div class="applyContent">
			<p class="flex title"><span></span>工作交接申请</p>
			<Form ref="formApply" :model="formApply" :rules="ruleApply" :label-width="120">
		        <FormItem label="申请名称：" prop="name">
		            <Input type="text" v-model="formApply.name"></Input>
		        </FormItem>
		        <Row>
			        <Col span="12">
			        	 <FormItem label="申请时间：">
				            <span>{{formApply.time}}</span>
				        </FormItem>
			        </Col>
			        <Col span="8">
			        	<FormItem label="交接期限：">
				            <RadioGroup v-model="formApply.radio">
				                <Radio label="1">固定期限</Radio>
				                <Radio label="2">永久</Radio>
				            </RadioGroup>
				        </FormItem>
			        </Col>
			        <Col span="4">
			        	<input :disabled="formApply.radio=='2'?true:false" style="width: 50px;margin:5px 10px 0 0" type="number" v-model="formApply.deadline" />天
			        </Col>
			    </Row>
			    <FormItem label="交接内容：" prop="content">
		            <Input type="text" v-model="formApply.content"></Input>
		        </FormItem>
		        <FormItem label="具有的角色：" prop="role">
		            <Input type="text" v-model="formApply.role"></Input>
		        </FormItem>
		        <FormItem label="直接领导：" prop="leader">
		            <Input type="text" v-model="formApply.leader" readonly></Input>
		        </FormItem>
		        <FormItem label="交接说明：" prop="illustrate">
		            <Input type="text" v-model="formApply.illustrate"></Input>
		        </FormItem>
		    </Form>
		</div>
	</div>
</template>

<script>
	import LgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import { dateFormat } from '../../utils/index.js'
	export default {
		name: 'handoverApply',
		components: {
			LgBreadcrumb,
		},
		data(){
			return{
				path: [
		            { 'name': '工作交接', 'path': '/main/handover' },
		            { 'name': '工作交接申请', 'path': '/main/handover/handoverApply' }
		        ],
		        formApply: {
                    name: '',
                    time: '',
                    deadline: '221',
                    radio: '1',
                    content: '我是交接的内容',
                    role: '',
                    leader: '',
                    illustrate: '陈述',
                },
                ruleApply: {
                    name: [
                        { required: true, trigger: 'blur', message: '不能为空'}
                    ],
                }
			}
		},
		created(){
		    this.formApply.time	= dateFormat(Date.now());
		},
		watch(){
			
		}
	}
</script>

<style lang="less">
	.handoverApply{
		.applyContent{
			width: 100%;
			padding:20px 80px 20px 50px;
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

