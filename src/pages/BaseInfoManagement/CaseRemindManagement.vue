
<template>
	<div id="case-remind-management">
		<IconTitle title='添加预警提醒' left='-180' top='-30'></IconTitle>
		<div class="flex content mb20">
			<Form inline>
				<div class="flex rule-box">
					<span class="plus-icon flex">案件：</span>
					<FormItem>
						<Select style="width:100px">
					        <Option ></Option>
					    </Select>	
					</FormItem>
					<span class="plus-icon flex">类型：</span>
					<FormItem>
						<Select style="width:100px">
					        <Option ></Option>
					    </Select>	
					</FormItem>
					<span class="plus-icon flex">阶段：</span>
					<FormItem>
						<Select style="width:100px">
					        <Option ></Option>
					    </Select>	
					</FormItem>
					<span class="plus-icon flex">提前：</span>
					<FormItem>
						<Select style="width:100px">
					        <Option ></Option>
					    </Select>	
					</FormItem>
					<Button type="primary" class="btn">添加提醒</Button>
				</div>
			</Form>
		</div>
		<IconTitle title='已添加提醒事项' left='-300' top='-30'></IconTitle>
		<div class="flex content">
			<Table :columns="columns1" :data="data1"></Table>
		</div>
		<div class="pageWrapper">
			<div style="float:right">
            <Page :total="total" :page-size="size" show-elevator></Page>
           </div>
        </div>
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
	import IconTitle from '../../components/IconTitle'
	export default {
		name: 'caseremindmanagement',
		components: {
			IconTitle	
		},
		computed: {
		},
		data(){
			return{
				columns1: [
                    {
                        type: 'index',
                        title: '序号',
                        align:'center',
                        width:100,
                        key: 'id'
                    },
                    {
                        title: '是否为重大案件',
                        key: 'ismajor',
                        align:'center',
                        width:210
                    },
                    {
                        title: '案件类型',
                        key: 'caseType',
                        align:'center',
                        width:210
                    },
                    {
                        title: '案件阶段',
                        key: 'caseStage',
                        align:'center',
                        width:210
                    },
                    {
                        title: '提前提醒时间',
                        key: 'time',
                        align:'center',
                        width:210
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:140,
                        render: (h, params) => {
	                        return h("div", [
	                            h(
	                                "Button",
	                                {
	                                    props: {
	                                        type: "primary",
	                                        size: "small"
	                                    },
	                                    style: {
	                                        marginRight: "5px",
	                                        display:"inline"
	                                    },
	                                    on: {
	                                        click: () => {
	                                            // this.show(params.index);
	                                            
	                                        }
	                                    }
	                                },
	                                "编辑"
	                            ),
	                            h(
	                                "Button",
	                                {
	                                    props: {
	                                        type: "primary",
	                                        size: "small"
	                                    },
	                                    style: {
	                                        marginRight: "5px",
	                                        display:"inline"
	                                    },
	                                    on: {
	                                        click: () => {
	                                            // this.show(params.index);
	                                            
	                                        }
	                                    }
	                                },
	                                "删除"
	                            ),
	                        ]);
	                    }
                    }
                ],
                data1: [
                    {
                    	ismajor:"是",
                    	caseType:"刑事案件",
                    	caseStage:"呈报",
                    	time:"1天"
                    },
                    {
                    	ismajor:"否",
                    	caseType:"民事案件",
                    	caseStage:"执行",
                    	time:"2天"
                    }
                ],
                total:0,
            	size: 2
                
			}
		},
		mounted(){
		},
		methods:{
			...mapActions([]),
		}
	}
</script>

<style lang="less">
	#case-remind-management{
		padding: 20px;
		background: #FFFFFF;
		height: 410px;
		.content{
			flex-direction: column;
			.rule-box{
				.plus-icon{
					font-size: 14px;	
				}
				.ivu-form-item{
					margin-right: 40px;
					margin-top: 20px;
				}
			}
			
		}
		.pageWrapper{
			margin-top: 20px;
			
		}
		.btn{
			width: 100px;
			margin-right: 20px;
		}
	}
	.mb20{
		margin-bottom: 20px;
	}
</style>

