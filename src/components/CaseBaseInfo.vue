<template>
    <div class="case-base-info">
        <div class="content">
            <IconTitle title='案件基本信息' left='-80' top='-30'></IconTitle>
            <div class="content-item">
                <div class="content-caseInfo flex">
                    <label class="case-label">案件标题：</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesTitle:''}}</div>
                </div>
                <div class="content-caseInfo flex">
                    <label class="case-label">案件编号：</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesCode:''}}</div>
                </div>
                <Menu @on-open-change = "isOpened">
                	<Submenu name="1">
                		<template slot="title">
	                        	{{isOpenedVal}}
	                    </template>
                		<MenuItem name="1-1">
                			<div class="content-caseInfo flex">
			                    <label class="case-label">案发单位：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesCostUnitName:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">案发时间：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesStartDate:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">诉讼地位：</label>
			                    <div class="case-detail">
			                    	<div v-for="item in ssdw">
			                    		<div v-if="caseInfo!=null">
			                    			<div v-if="item.id==caseInfo.litigantId">{{item.dictName}}</div>	
			                    		</div>
			                    		<div v-else></div>
			                    	</div>
			                    </div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">原告/申请人/控告人：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.plaintiff:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">被告/被申请人/被控告人：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.defendant:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">第三方：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.thirdParty:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">涉案金额：</label>
			                    <div class="case-detail">{{caseInfo!=null?moneyFormat(caseInfo.amount):''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">是否为重大案件：</label>
			                    <div class="case-detail">
									<div>
			                    		{{caseInfo!=null&&caseInfo.isMajor==1?'是':'否'}}
			                    	</div>
			                    </div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">案件类型：</label>
			                    <div class="case-detail">
			                    	<div v-for="item in ajlx">
			                    		<div v-if="caseInfo!=null">
			                    			<div v-if="item.id==caseInfo.casesType">{{item.dictName}}</div>	
			                    		</div>
			                    		<div v-else></div>
			                    	</div>
			                    </div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">是否涉外：</label>
			                    <div class="case-detail">
			                    	<div>
			                    		{{caseInfo!=null&&caseInfo.isForeign==1?'是':'否'}}
			                    	</div>
<!--			                    	
									<div v-if="caseInfo!=null?caseInfo.isForeign:''==1">是</div>
									<div v-else>否</div>-->
			                    </div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">案由：</label>
			                    <div class="case-detail">
			                    	{{caseInfo!=null?caseInfo.casesReason:''}}	
			                    </div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">案件进展阶段：</label>
			                    <div class="case-detail">
			                    	<div v-for="item in ajjzjd">
			                    		<div v-if="caseInfo!=null">
			                    			<div v-if="item.id==caseInfo.casesStage">{{item.dictName}}</div>	
			                    		</div>
			                    		<div v-else></div>
			                    	</div>
			                    </div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">受理机构承办人员：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.admittanceAgenciesManager:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">受理机构：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.admittanceAgencies:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">案件费用承担单位：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesCostUnitName:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">受理案号：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesAcceptedNO:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">案件受理费用：</label>
			                    <div class="case-detail">{{caseInfo!=null?moneyFormat(caseInfo.casesAcceptedCost):''}}</div>
			                </div>
			                <div class="content-caseInfo content-caseInfo2 flex">
			                    <label class="case-label">案件基本情况：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.baseInfo:''}}</div>
			                </div>
			                <div class="content-caseInfo content-caseInfo2 flex">
			                    <label class="case-label">处理思路：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.guide:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">呈报人：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.reportedName:''}}</div>
			                </div>
			                <div class="content-caseInfo flex">
			                    <label class="case-label">联系电话：</label>
			                    <div class="case-detail">{{caseInfo!=null?caseInfo.reportedMobile:''}}</div>
			                </div>
			                <!--<div class="content-caseInfo flex">
			                    <label class="case-label">是否外聘律师：</label>
			                    <div class="case-detail">
									<div>
			                    		{{caseInfo!=null&&caseInfo.isExternal==1?'是':'否'}}
			                    	</div>
			                    </div>
			                </div>-->
							<div class="content-caseInfo flex" v-if="caseInfo!=null&&caseInfo.isExternal==1&&caseInfo.lawyers.length>0">
			                    <label class="case-label">外聘律师姓名：</label>
			                    <div class="case-detail">
									<div >{{caseInfo.lawyers[0].lawyerName}}</div>
			                    </div>
			                </div>
			                <div class="content-caseInfo flex" v-if="caseInfo!=null&&caseInfo.isExternal==1&&caseInfo.lawyers.length>0">
			                    <label class="case-label">所属律所：</label>
			                    <div class="case-detail">
									<div >{{caseInfo.lawyers[0].lawOfficeDTO.lawOfficeName}}</div>
			                    </div>
			                </div>
							<div class="content-caseInfo flex"  v-if="caseInfo!=null&&caseInfo.isExternal==1&&caseInfo.lawyers.length>0">
			                    <label class="case-label">计费方式：</label>
			                    <div class="case-detail">
									<!--<div>{{caseInfo.externalBillingWayName}}</div>-->
									<div>包干计费</div>
			                    </div>
			                </div>
							<div class="content-caseInfo flex"  v-if="caseInfo!=null&&caseInfo.isExternal==1&&caseInfo.lawyers.length>0">
			                    <label class="case-label">律师费用：</label>
			                    <div class="case-detail">
									<!--<div>{{caseInfo.externalCost}} {{caseInfo.externalCostCurrencyName}}</div>-->
									<div>10000元</div>
			                    </div>
			                </div>
			                <div class="content-caseInfo content-caseInfo2 flex" v-for="(item,index) in legalInstrument" >
			                    <label class="case-label">附件{{index+1}}：</label>
			                    <div class="case-detail">
			                    	<a :href="item.attPath" download="item.attPath">{{item.attName}}</a>
			                    </div>
			                </div>
			                
			                
			                <div class="content-caseInfo content-caseInfo2 flex" v-if='caseInfo!=null&&caseInfo.transactInfoDTO'>
			                    <label class="case-label">承办法务：</label>
			                    <div class="case-detail">
			                    	<div >
			                    		{{caseInfo.transactInfoDTO.length>0?'是':'否'}}
			                    	</div>
			                    </div>
			                </div>
			                <div class="content-caseInfo content-caseInfo4 flex" v-if='caseInfo!=null&&caseInfo.transactInfoDTO' v-for="item in transactInfoDTO">
			                	<div class="content-caseInfo flex" >
			                    	<label class="case-label" v-if="item.transactType==1">总协调人：</label>
			                    	<label class="case-label" v-if="item.transactType==2">协办人：</label>
			                    	<label class="case-label" v-if="item.transactType==3">承办人：</label>
			                    	<div class="case-detail">{{item.transactPersonName}}</div>
			                	</div>
			                	<div class="content-caseInfo flex">
			                    	<label class="case-label">联系电话：</label>
			                    	<div class="case-detail">{{item.transactPersonMobile}}</div>
			               		</div>
			                </div>
                		</MenuItem>
                	</Submenu>	
                </Menu>		
                
            </div>
        </div>
    </div>
</template>

<script>
import IconTitle from './IconTitle'
import { mapState, mapActions } from "vuex";

    export default {
        name: 'casebaseinfo',
        components:{
        	IconTitle
        },
        computed: {
        	...mapState(["ajlx","ajjzjd","ssdw"]),
        	legalInstrument(){
        		return this.caseInfo!=null&&this.caseInfo.attachmentInfos?this.caseInfo.attachmentInfos:[]
        	},
        	
        	transactInfoDTO(){
        		return this.caseInfo!=null?this.caseInfo.transactInfoDTO:[]
        	}
    	},
        props: {
			caseInfo:{
				type:Object
			}
        },
        created() {
	        this.getAJLX();
	        this.getAJJZJD();
	        this.getSSDW();
	    },
        data() {
            return {
            	isOpenedVal: "展开全部"
            }
        },
        mounted() {
        	
        },
        methods: {
			...mapActions([
	            "getAJLX",
	            "getAJJZJD",
	            "getSSDW"
	        ]),
			isOpened(){
				if(this.isOpenedVal == "展开全部"){
					this.isOpenedVal = "收起全部";
				}else{
					this.isOpenedVal = "展开全部";
				}
			},
			moneyFormat(data){
				let money = data;
				let moneyStr = String(money)
				let FirstMoney = moneyStr.split('.')[0]
				let LastMoney = moneyStr.split('.')[1]
				let count = Math.floor((FirstMoney.length-1)/3)
				let cun = FirstMoney.substring(FirstMoney.length-3,FirstMoney.length)
				for(let i = 0; i < count; i++){
					cun = FirstMoney.substring(FirstMoney.length-3*(i+2),FirstMoney.length-3*(i+1)) + ',' +cun
				}
				if(LastMoney != undefined){
					cun = cun + '.' +LastMoney
				}
				return cun;
			}
        }
    }
</script>

<style lang="less">
	@txtColor:#1A1A1A;
    .case-base-info {
    	 width: 100%;
        .content {
            background: #ffffff;
            padding: 20px;
           
        }
        .content-item,.ivu-menu-item{
            display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
        }
        .content-caseInfo {
            width: 50%;
            justify-content: flex-start;
            align-items: flex-start;
            color: @txtColor;
            padding:10px 0;
            font-family: "微软雅黑";
            font-size:14px;
        }
        .content-caseInfo3 {
            width: 50%;
            justify-content: flex-start;
            align-items: flex-start;
            color: @txtColor;
            font-family: "微软雅黑";
            font-size:14px;
        }
        label{
        	margin-right: 5px;
        	margin-left: 37px;
        	
        }
        .case-detail{
        	width:321px;
        	a{
        		color:#396DD6;
        	}
        }
                    
        .content-caseInfo2{
        	width: 100%;
        }
        .content-caseInfo4{
        	width: 100%;
        	padding: 0 !important;
        }
        .ivu-menu{
        	width: 100% !important;
        	z-index: auto !important;
        	.ivu-menu-item{
        		padding: 0;
        		cursor: default;
        	}
        	.ivu-menu-submenu .ivu-menu-submenu-title{
			    padding: 0 !important;
			    display: flex;
			    display: -webkit-flex;
			    justify-content: center;
			    align-items: center;
			    color: #628de5;
			}
        }
        .ivu-menu-submenu{
        	display: flex;
		    display: -webkit-flex;
		    flex-wrap: wrap;
		    flex-direction: column-reverse;
        }
        .ivu-menu-vertical .ivu-menu-submenu-title-icon {
		   float: none; 
		   position: none; 
		   top: 0; 
		   left: 8px;
		}
        .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
		    background: #fff;
		}
		.ivu-menu-vertical.ivu-menu-light:after{
			display: none;
		}
		.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
			border: none;
		}
		.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
			padding-left:0;
		}
    }
</style>