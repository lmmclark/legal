<template>
    <div class="caseResultCheck">
    	<LgBreadcrumb :path='path'>
    	</LgBreadcrumb>
        <div class="search">
            <div class="title">
                <IconTitle title='查询条件' left='-280' top='-30'></IconTitle>
            </div>
            <div class="wrapper">
                <Form :model="searchForm" ref="searchForm" :rules="rule">
                    <Row>
                    	<Col span="8">
	                        <FormItem label="报告编号：" prop="reportNo" :label-width="120">
	                            <Input v-model="searchForm.reportNo" style="width:210px" placeholder="请输入案件编号"></Input>
	                        </FormItem>
                        </Col>
                        <Col span="8">
	                    	<FormItem label="报告生成人：" prop="reportCreater" :label-width="120">
	                            <Input v-model="searchForm.reportCreater" style="width:210px" placeholder="请输入案件承办人"></Input>
	                        </FormItem>	
                    	</Col>
                    	<Col span="8">
                    		<FormItem label="报告生成时间：" prop="reportCreateTime" :label-width="120">
		                        <DatePicker type="date" v-model="searchForm.reportCreateTime" placeholder="请选择时间" style="width:210px" @on-change="getdate"></DatePicker>
		                    </FormItem>
                    	</Col>
                    </Row>
                    <FormItem class="btnWrapper">
                        <Button type="primary" icon="refresh" class="resetBtn" @click="resetForm" style="width:140px;">
                        	重置查询条件
                        </Button>
                        <Button type="primary" icon="search" class="searchBtn" @click="searchData" style="width:140px;">
                        	开始查询
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="searchResult">
            <div class="title">
                <IconTitle title='查询结果' left='-300' top='-30'></IconTitle>
            </div>
            <div class="wrapper">
                <Table highlight-row :columns="tableLabel" :data="tableData" no-data-text="暂无数据"></Table>
                <div class="pageWrapper">
                    <Page :total="total" :page-size="size" @on-change="changepage" show-elevator></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import IconTitle from '../../components/IconTitle'
import {mapActions,mapState} from 'vuex'
import LgBreadcrumb from '../../components/LgBreadcrumb'
export default {
    name: "caseResultCheck",
    components:{
        IconTitle,
        LgBreadcrumb
    },
    data() {
        return {
            total: 0,
            currentPage: 1,
            size: 10,
            ajaxHistoryData:[],
            CreateTime:"",
            //面包屑路径
            path: [
                { 'name': '案件管理', 'path': '/main/caseManage' },
                { 'name': '案件报告查询', 'path': '' },
            ],
            searchForm: {
                reportNo: "",
                reportCreater: "",
                reportCreateTime: ""
            },
            rule: {
            	//reportCreater: { required: true, message: "不能为空", trigger: "blur" }, 
            },
            tableLabel: [
                {
                    type: 'index',
                    title: '序号',
                    align:'center',
                    width:60,
                    key: 'No',
                },
                {
                    title: "报告编号",
                    key: "reportGeneraterId",
                    align: "center"
                },
                {
                    title: "生成时间",
                    key: "reportGenerateTime",
                    align: "center"
                },
                {
                    title: "案件编号",
                    key: "casesCode",
                    align: "center"
                },
                {
                    title: "报告生成人",
                    key: "creator",
                    align: "center"
                },
                {
                    title: "案件类型",
                    key: "casesType",
                    align: "center",
                    render: ( h, params ) => {
                    	let name;
                    	for (let i=0;i<this.ajlx.length;i++){
                    		if(params.row.casesType ==this.ajlx[i].id){
                    			name = this.ajlx[i].dictName;		
                    		}
                    	}
                        return name;
                    }
                },
                {
                    title: "案件阶段",
                    key: "casesStage",
                    align: "center",
                    render: ( h, params ) => {
                    	let name;
                    	for (let i=0;i<this.ajjzjd.length;i++){
                    		if(params.row.casesStage ==this.ajjzjd[i].id){
                    			name = this.ajjzjd[i].dictName;		
                    		}
                    	}
                        return name;
                    }
                },
                {
                    title: "案件问责情况",
                    key: "causesAnalysis",
                    align: "center"
                },
                {
                    title: "案件成因分析",
                    key: "accountabilityResult",
                    align: "center"
                },
                {
                	title: "案件执行情况",
                    key: "latestProgress",
                    align: "center"	
                },
                {
                    title: "案件详情",
                    key: "action",
                    align: "center",
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
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                            	name:"caseFinish",
                                            	query:{
                                            		id:params.row.id
                                            	}
                                            })
                                        }
                                    }
                                },
                                "查看"
                            )
                        ]);
                    }
                }
            ],
            tableData: [],
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ]
        };
    },
    methods: {
        resetForm() {
            this.$refs.searchForm.resetFields();
        },
        searchData() {
            this.$refs.searchForm.validate(valid => {
                if (valid) {
                    // 提交数据
                    let that = this;
                    let reportNo = this.searchForm.reportNo;
                    let reportCreater = this.searchForm.reportCreater;
                    let reportCreateTime = this.CreateTime;
                    this.$http.request({
						method: 'get',
                        url:`/reportRecord/findByReportRecod?reportGeneraterId=${reportNo}&creator=${reportCreater}&reportGenerateTime=${reportCreateTime}`,
					}).then(function(res) {
 						that.ajaxHistoryData = res.data.content.contentList;
 						let length = res.data.content.contentList.length;
 						if(length!=0){
 							that.total = length;
	            			if(length < that.size){
			                    that.tableData = that.ajaxHistoryData;
			                }else{
			                    that.tableData = that.ajaxHistoryData.slice(0,that.size);
			                }
	 									
 						}else{
 							that.$Message.destroy();
 							that.$Message.error('暂无数据!');
 						}
					}).catch(function(err) {
						console.log(err)
					}) 
                    
                    
                } else {
                	this.$Message.destroy();
                    this.$Message.error("数据不能为空!");
                }
            });
        },
        pageChange(page) {
            this.currentPage = page;
            console.log(this.currentPage);
        },
        getdate(data){
        	this.CreateTime = data;
        },
        changepage(index){ 
        	let that = this;
            let _start = ( index - 1 ) * that.size;
            let _end = index * that.size;
            that.tableData = that.ajaxHistoryData.slice(_start,_end);
        },
        ...mapActions([
            'getAJJZJD',
		    'getAJLX',
        ])
    },
    computed:{
        ...mapState([
            'ajlx',
            'ajjzjd'
        ])
    }
};
</script>
<style lang="less">
.caseResultCheck {
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
    }
}
</style>

