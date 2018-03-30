<template>
	<div id="CommonCaseLedger" class="mycontainer">
		<div class="search">
	        <div class="title">
				<IconTitle title='台账查询' left='-280' top='-30'></IconTitle>
				<div class="wrapper">
					<Form :model="searchForm" ref="searchForm" :rules="rule">
						<Row>
	                    	<Col span="8">
	                    		<FormItem label="开始时间：" prop="startTime" :label-width="120">
		                        	<DatePicker type="date" placeholder="请选择时间" style="width:110%" v-model="searchForm.startTime" :options="startCheckTime"></DatePicker>
		                    	</FormItem>	
	                    	</Col>
	                    	<Col span="8">
	                    		<FormItem label="结束时间：" prop="endTime" :label-width="120">
		                        	<DatePicker type="date" placeholder="请选择时间" style="width:110%" v-model="searchForm.endTime" :options="endCheckTime"></DatePicker>
		                    	</FormItem>	
	                    	</Col>
	                    	<Col span="8">
	                    		<FormItem label="境内/外：" prop="isTerr" :label-width="120">
		                        	<RadioGroup v-model="searchForm.isTerr">
								        <Radio :label="0">境内</Radio>
								        <Radio :label="1">境外</Radio>
								    </RadioGroup>
	                        	</FormItem>
	                    	</Col>
	                	</Row>
	                	<Row>
	                    	<Col span="8">
	                    		<FormItem label="案件发生地区：" prop="caseRegion" :label-width="120">
		                        	<GetArea v-model="searchForm.caseRegion"></GetArea>
	                        	</FormItem>	
	                    	</Col>
	                    	<Col span="8">
	                    		<FormItem label="案件类型：" prop="caseType" :label-width="120">
			                    	<Select style="width:230px" placeholder="请选择案件类型" v-model="searchForm.caseType">
								        <Option v-for="item in ajlx" :value="item.id" :key="item.dictName">{{item.dictName}}</Option>
								    </Select>    
			                    </FormItem>	
	                    	</Col>
	                    	
	                	</Row>
	                	<FormItem class="btnWrapper">
	                        <Button type="primary" icon="refresh" class="resetBtn" style="width:140px;">
	                        	重置查询条件
	                        </Button>
	                        <Button type="primary" icon="search" class="searchBtn" style="width:140px;">
	                        	开始查询
	                        </Button>
	                    </FormItem>
						
					</Form>
				</div>
			</div>
			
		</div>
		<div class="searchResult">
            <div class="title">
                <IconTitle title='查询结果' left='-300' top='-30'></IconTitle>
                <Button type="primary" class="export">
                	导出台账
                </Button>
            </div>
            <div class="wrapper">
                <Table size="small" border :columns="tableLabel" :data="tableData"></Table>
                <div class="pageWrapper">
                    <Page :total="total" :current="currentPage" show-sizer ></Page>
                </div>
            </div>
       </div>
		
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
	import IconTitle from '../../components/IconTitle'
	import GetArea from '../../components/GetArea'
	export default {
		name: 'LedgerCheck',
		components: {
			IconTitle,
			GetArea
		},
		computed: {
			...mapState([
	        	'ajlx'
	        ]),
	        startCheckTime(){
	        	return{
	        		disabledDate: (date) => {
		                let time = new Date(this.searchForm.endTime);
						return date && date.valueOf() >  time;
		            }	
	        	}
	        },
	        endCheckTime(){
	        	return{
	        		disabledDate: (date) => {
		                let time = new Date(this.searchForm.startTime);
						return date && date.valueOf() < time;
		            }	
	        	}
	        }
		},
		data(){
			return{
				searchForm: {
	                startTime: "",
	                endTime:"",
	                isTerr:"",
	                caseRegion:"",
	                caseType:""
	            },
	            tableLabel:[
	            	{
	                    title: "承办单位",
	                    key: "caseNo1",
	                    align: "center"
                	},
                	{
	                    title: "原告/申请人/第三人",
	                    key: "caseNo2",
	                    align: "center"
                	},
                	{
	                    title: "被告/被申请人/第三人",
	                    key: "caseNo3",
	                    align: "center"
                	},
                	{
	                    title: "受理法院/仲裁机构",
	                    key: "caseNo4",
	                    align: "center"
                	},
                	{
	                    title: "受案单位所在地",
	                    key: "caseNo5",
	                    align: "center"
                	},
                	{
	                    title: "涉案金额（万元）",
	                    key: "caseNo6",
	                    align: "center"
                	},
                	{
	                    title: "案件类型",
	                    key: "caseNo7",
	                    align: "center"
                	},
                	{
	                    title: "承办法官/仲裁员",
	                    key: "caseNo8",
	                    align: "center"
                	},
                	{
	                    title: "案由",
	                    key: "caseNo9",
	                    align: "center"
                	},
                	{
	                    title: "基本案情",
	                    key: "caseNo10",
	                    align: "center"
                	}
	            ]
			}
		},
		mounted(){
			if(this.ajlx.length==0||this.ajlx==null){
	    		this.getAJLX();
	    	};
		},
		methods:{
			...mapActions([
				'getAJLX'
			]),
		}
	}
</script>

<style lang="less">
	#CommonCaseLedger{
		.ivu-cascader{
			width:230px !important;
		}
		.baseStyle() {
	        background: #fff;
	        padding: 20px;
	        margin-bottom: 20px;
	        .title {
	            padding: 15px 20px;
	            font-size: 20px;
	        }
	        .wrapper {
	            padding: 0 20px;
	        }
	    }
	    .search {
	        .baseStyle();
	        .btnWrapper {
	            text-align: center;
	            .resetBtn {
	                margin-right: 50px;
	            }
	            
	        }
	        
	    }
	    .searchResult {
	        .baseStyle();
	        .pageWrapper {
	            display: flex;
	            justify-content: flex-end;
	            align-items: center;
	            margin-top: 20px;
	        }
	        .ivu-page{
            	margin-top: 20px;
            	float: right;
            }
            .export{
            	display: inline;
            	float:right;
            	margin-top: -40px;
            }
	    }		
	}
</style>

