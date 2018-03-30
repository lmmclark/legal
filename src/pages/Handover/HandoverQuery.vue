<template>
	<div class="handoverQuery lg-wrapper">
		<LgBreadcrumb :path='path'></LgBreadcrumb>
		<div class="handoverQueryContent">
			<p class="flex title">查询条件</p>
			<Form ref="formQuery" :model="formQuery" :rules="ruleQuery" :label-width="120">
		        <Row>
			        <Col span="12">
			        	<FormItem label="申请名称：" prop="name">
				            <Input type="text" v-model="formQuery.name"></Input>
				        </FormItem>
			        </Col>
			        <Col span="12">
			        	<FormItem label="审批状态：" prop="name">
				            <Select v-model="formQuery.selectionId" clearable style="width:200px">
						        <Option v-for="item in formQuery.states" :value="item.id" :key="item.id">{{ item.dictName }}</Option>
						    </Select>
				        </FormItem>
			        </Col>
			    </Row>
			    <Row>
			        <Col span="12">
			        	<FormItem label="申请起止时间：">
				            <DatePicker :options='optionTime' type="daterange" placement="bottom-start" placeholder="Select date" style="width: 200px" :value='formQuery.defaultTime'></DatePicker>
				        </FormItem>
			        </Col>
			        <Col span="12" class='btn flex'>
			        	<Button type="primary">查询</Button>
			        	<Button type="primary">导出</Button>
			        </Col>
			    </Row>
		    </Form>
		</div>
		
		<div class="handoverQueryResult">
			<p class="flex title">查询结果</p>
			<Table stripe highlight-row :columns="resultCol" :data="resultData"></Table>
			<div class="resultPage flex"><Page :total="100" show-total show-elevator></Page></div>
		</div>
	</div>
</template>

<script>
	import LgBreadcrumb from '../../components/LgBreadcrumb.vue'
	import { dateFormat } from '../../utils/index.js'
	export default {
		name: 'handoverQuery',
		components: {
			LgBreadcrumb
		},
		data(){
			return{
				path: [
		            { 'name': '工作交接', 'path': '/main/handover' },
		            { 'name': '工作交接查询', 'path': '/main/handover/handoverQuery' }
		        ],
		        formQuery: {
                    name: '',
                    selectionId: '',
                    states:[
                    	{id: 1,dictName:'待审批'},
                    	{id: 2,dictName:'通过'},
                    	{id: 3,dictName:'不通过'}
                    ],
                    defaultTime: [dateFormat(Date.now()-24*60*60*1000*90), dateFormat(Date.now())],
                },
                optionTime:{
                	disabledDate(date){
                		return date && date.valueOf() > Date.now();
                	}
                },
                ruleQuery: {
                    name: [
                        { required: true, trigger: 'blur', message: '不能为空'}
                    ],
                },
                resultCol:[
                	{title: '序号', width: 160, align: 'center', key: ''},
                	{title: '申请名称', align: 'center', key: ''},
                	{title: '审批状态', width: 120, align: 'center', key: ''},
                	{title: '审批人', width: 160, align: 'center', key: ''},
                	{title: '申请时间', width: 160, align: 'center', key: ''},
                	{title: '操作', width: 160, align: 'center', key: ''}
                ],
                resultData:[]
			}
		},
		mounted(){
		},
	}
</script>

<style lang="less">
	.handoverQuery{
		.handoverQueryContent{
			width: 100%;
			padding:20px 80px 20px 50px;
			background: #fff;
			margin-bottom: 20px;
			.title{
				justify-content: flex-start;
				font-size: 18px;
				height: 50px;
			}
			.btn{
				button{
					margin: 0 10px;
				}
			}
		}
		.handoverQueryResult{
			width: 100%;
			padding:20px 80px 20px 50px;
			background: #fff;
			margin-bottom: 20px;
			.title{
				justify-content: flex-start;
				font-size: 18px;
				height: 50px;
			}
			.resultPage{
				width: 100%;
				padding-top: 20px;
				justify-content: flex-end;
			}
		}
	}
</style>

