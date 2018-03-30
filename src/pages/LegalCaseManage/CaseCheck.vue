<template>
    <div class="caseCheck">
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
                    		<FormItem label="开始时间：" prop="beginTime" :label-width="120">
		                        <DatePicker type="date" v-model="searchForm.beginTime" placeholder="请选择时间" style="width: 210px" :options="startCheckTime" format="yyyy-MM-dd" @on-change="format_begin"></DatePicker>
		                    </FormItem>
                    	</Col>
                    	<Col span="8">
                    		<FormItem label="结束时间：" prop="endTime" :label-width="120">
		                        <DatePicker type="date" v-model="searchForm.endTime" placeholder="请选择时间" style="width: 210px" :options="endCheckTime" format="yyyy-MM-dd" @on-change="format_end"></DatePicker>
		                    </FormItem>
                    	</Col>
                    	<Col span="8">
	                        <FormItem label="案件编号：" prop="casesCode" :label-width="120">
	                            <Input v-model="searchForm.casesCode" style="width:210px" placeholder="请输入案件编号"></Input>
	                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                    	<Col span="8">
	                    	<FormItem label="案件标题：" prop="casesTitle" :label-width="120">
	                            <Input v-model="searchForm.casesTitle" style="width:210px" placeholder="请输入案件标题"></Input>
	                        </FormItem>	
                    	</Col>
                        <Col span="8">
                        	<FormItem label="案件类型：" prop="caseType" :label-width="120">
		                    	<Select v-model="searchForm.caseType" style="width:210px" placeholder="请选择案件类型">
							        <Option v-for="item in ajlx" :value="item.id" :key="item.dictName">{{item.dictName}}</Option>
							    </Select>    
		                    </FormItem>	
                        </Col>
                        <Col span="8">
	                        <FormItem label="办文编号：" prop="dotheNo" :label-width="120">
	                            <Input v-model="searchForm.dotheNo" style="width:210px" placeholder="请输入办文编号"></Input>
	                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                    	<Col span="8">
	                    	<FormItem label="诉讼地位：" prop="litigatStatus" :label-width="120">
	                    		<RadioGroup v-model="searchForm.litigatStatus">
	                    			<Radio :label="item.id" :key="item.id" v-for='item in ssdw'>{{item.dictName}}</Radio>
                                </RadioGroup>	
	                        </FormItem>
                    	</Col>
                    	<Col span="8" style="visibility: hidden;">
                        sss
                    	</Col>
                        
                        <!--<Col span="8">
                        	<FormItem label="案件发生地区：" prop="caseRegion" :label-width="120">
	                        	<GetArea v-model="searchForm.caseRegion"></GetArea>
                        	</FormItem>	
                        </Col>-->
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
import { mapGetters,mapState,mapActions  } from 'vuex'
import { setStore,getStore,removeStore } from '../../utils'
import IconTitle from '../../components/IconTitle'
import LgBreadcrumb from '../../components/LgBreadcrumb'
export default {
    name: "caseCheck",
    components:{
        IconTitle,
        LgBreadcrumb
    },
    computed: {
        ...mapState([
        	'ssdw',
        	'ajlx',
        	'ajjzjd',
        	'ay'
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
	                let time = new Date(this.searchForm.beginTime);
					return date && date.valueOf() < time;
	            }	
        	}
        }
    },
    data() {
        return {
            total:0,
            size: 10,
            ajaxHistoryData:[],
            //面包屑路径
            path: [
                { 'name': '案件管理', 'path': '/main/caseManage' },
                { 'name': '案件查询', 'path': '' },
            ],
            searchForm: {
                casesCode: "",
                beginTime: "",
                endTime:"",
                caseTitle:"",
                caseType:"",
                dotheNo:"",
                litigatStatus:"",
                caseRegion:""
            },
            newsearch: {
                casesCode: "",
                beginTime: "",
                endTime:"",
                caseTitle:"",
            },
            beginTime:"",
            endTime:"",
            rule: {
                //caseTitle: { required: true, message: "不能为空", trigger: "blur" },
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
                    title: "案件编号",
                    key: "casesCode",
                    align: "center"
                },
                {
                    title: "案件标题",
                    key: "casesTitle",
                    align: "center"
                },
                {
                    title: "原告/申请人/控告人",
                    key: "plaintiff",
                    align: "center"
                },
                {
                    title: "被告/被申请人/被控告人",
                    key: "defendant",
                    align: "center"
                },
                {
                    title: "案由",
                    key: "casesReason",
                    align: "center",
                    render: ( h, params ) => {
                        let name;
                    	for (let i=0;i<this.ay.length;i++){
                    		if(params.row.casesReason ==this.ay[i].id){
                    			name = this.ay[i].dictName;		
                    		}
                    	}
                        return name;
                    }
                },
                {
                    title: "进展阶段",
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
                    title: "承办人",
                    key: "admittanceAgenciesManager",
                    align: "center"
                },
//              {
//                  title: "当前状态",
//                  key: "status",
//                  align: "center",
//                  render: ( h, params ) => {
//                      return params.row.status;
//                  }
//              },
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
                                            let routeData = this.$router.resolve({
                                            	name:"caseResult",
                                            	query:{
                                            		id:params.row.id
                                            	}
                                            })
                                            window.open(routeData.href, '_blank');
                                        }
                                    }
                                },
                                "查看"
                            )
                        ]);
                    }
                }
            ],
            tableData: []
            
        };
    },
    mounted() {
    	if(this.ssdw.length==0||this.ssdw==null){
    		this.getSSDW();
    	};
    	if(this.ajlx.length==0||this.ajlx==null){
    		this.getAJLX();
    	};
    	if(this.ajjzjd.length==0||this.ajjzjd==null){
    		this.getAJJZJD();
    	};
    	if(this.ay.length==0||this.ay==null){
    		this.getAy();
    	};
    },
    methods: {
    	...mapActions([
			'getSSDW',
			'getAJLX',
			'getAJJZJD',
			"getAy"
		]),
        resetForm() {
            this.$refs.searchForm.resetFields();
        },
        format_begin(data){
        	this.beginTime = data;
        	
        },
        format_end(data){
        	this.endTime = data;
        },
        searchData() {
            this.$refs.searchForm.validate(valid => {
                if (valid) {
                    // 提交数据
                    let that = this;
                    this.newsearch.beginTime = this.beginTime;
                    this.newsearch.endTime = this.endTime;
                    this.newsearch.casesCode = this.searchForm.casesCode;
                    this.newsearch.casesTitle = this.searchForm.casesTitle;
                    this.$http.request({
						method: 'post',
						url: `/cases/queryCases/`,
						data:this.newsearch,
					}).then(function(res) {
   						that.ajaxHistoryData = res.data.content.content;
   						let length = res.data.content.content.length;
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
                	this.$Message.error('数据不能为空!');
                }
            });
        },
        changepage(index){ 
        	let that = this;
            let _start = ( index - 1 ) * that.size;
            let _end = index * that.size;
            that.tableData = that.ajaxHistoryData.slice(_start,_end);
        }
    }
};
</script>
<style lang="less">
.caseCheck {
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

