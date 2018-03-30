<template>
    <div class="case-base-info">
        <div class="content">
            <IconTitle title='案件基本信息' left='-80' top='-30'></IconTitle>
            <div class="content-item">
                <div class="content-caseInfo flex">
                    <label class="case-label">案件编号:</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.caseNo:''}}</div>
                </div>
                <div class="content-caseInfo flex">
                    <label class="case-label">案件标题:</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesTitle:''}}</div>
                </div>
                <div class="content-caseInfo flex">
                    <label class="case-label">办文编号:</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.fileNo:''}}</div>
                </div>
                <div class="content-caseInfo flex">
                    <label class="case-label">领导批示:</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.leaderInstruction:''}}</div>
                </div>
                <div class="content-caseInfo flex">
                    <label class="case-label">案件类型:</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesTypeName:''}}</div>
                </div>
                <div class="content-caseInfo flex">
                    <label class="case-label">案由:</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.casesReason:''}}</div>
                </div>
                <div class="content-caseInfo flex">
                    <label class="case-label">案件基本情况:</label>
                    <div class="case-detail">{{caseInfo!=null?caseInfo.baseInfo:''}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<!--
	/*
	 * 案件基本信息传参格式：
	 * caseNo:案件编号
	 * title:案件标题
	 * fileNo:办文编号,
	 * leaderInstruction:领导批示,
	 * caseType:案件类型,
	 * caseBrief:案由,
	 * caseBaseInfo:案件基本情况
	 */
	caseInfo:{
		caseNo:'56252523',
		title:'关于***公司的****案件',
		fileNo:'No26244',
		leaderInstruction:'这个案件比较重要，尽量打赢，巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉......',
		caseType:'刑事案件',
		caseBrief:'主要是公司之间的纠纷，涉及到的钱比较多',
		caseBaseInfo:'公司纠纷'
		
	}
-->
<script>
	import IconTitle from './IconTitle'
    export default {
        name: 'casebaseinfo',
        components:{
        	IconTitle
        },
        props: {
			caseInfo:{
				type:Object
			}
        },
        data() {
            return {}
        },
        watch:{
        	caseInfo(oldval,newval){
        		console.log(1)
        		console.log(newval)
        	}
        },
        mounted() {},
        methods: {

        }
    }
</script>

<style lang="less" scoped>
	@txtColor:#1A1A1A;
    .case-base-info {
        .content {
            background: #ffffff;
            padding: 20px;
            .content-item {
                display: flex;
                display: -webkit-flex;
                flex-wrap: wrap;
                .content-caseInfo {
                    width: 50%;
                    justify-content: flex-start;
                    align-items: flex-start;
                    color: @txtColor;
                    padding:10px 0;
                    font-family: "微软雅黑";
                    font-size:14px;
                    label{
                    	margin-left: 10px;
                    	margin-right: 5px;
                    }
                    .case-detail{
                    	width:400px;
                    }
                    
                }
            }

        }
    }
</style>