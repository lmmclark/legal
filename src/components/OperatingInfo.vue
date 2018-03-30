<template>
    <div class="operation-info">
    	<IconTitle title='基本信息' left='-80' top='-30'></IconTitle>
       	<div class="operation-info-item">
       		<span class="title">申请人：</span>
       		<span>{{operatingInfo!=null?operatingInfo.creator:''}}</span>
       	</div>
       	<!--<div  class="operation-info-item">
       		<span class="title">申请人所在部门：</span>
       		<span>{{operatingInfo!=null?operatingInfo.createTime:''}}</span>
       	</div>-->
       	<div  class="operation-info-item">
       		<span class="title">申请时间：</span>
       		<span>{{operatingInfo!=null?operatingInfo.createTime:''}}</span>
       	</div>
       	<div  class="operation-info-item" v-if='operatingInfo&&operatingInfo.externalReason!=null'>
       		<span class="title">申请理由：</span>
       		<span>{{operatingInfo!=null?operatingInfo.externalReason:''}}</span>
       	</div>
       	<div  class="operation-info-item"  v-if='operatingInfo&&operatingInfo.externalReasonFirst!=null'>
       		<span class="title">初审意见：</span>
       		<span>{{operatingInfo!=null?operatingInfo.externalReasonFirst:''}}</span>
       	</div>
       	<div  class="operation-info-item" v-if='operatingInfo&&operatingInfo.externalReasonFinalJudgment!=null'>
       		<span class="title">终审意见：</span>
       		<span>{{operatingInfo!=null?operatingInfo.externalReasonFinalJudgment:''}}</span>
       	</div>
       	<div  class="operation-info-item" v-if='operatingInfo&&operatingInfo.externalReasonEmploy!=null'>
       		<span class="title">聘用意见：</span>
       		<span>{{operatingInfo!=null?operatingInfo.externalReasonEmploy:''}}</span>
       	</div>
    </div>
</template>
<script>
	import IconTitle from './IconTitle'
    export default {
        name: 'OperatingInfo',
        components:{
        	IconTitle
        },
        props: {
        	operatingInfo:{
        		type:Object
        	}
        },
        data() {
            return {}
        },
        mounted() {},
        methods: {

        }
    }
</script>

<style lang="less" scoped>
	@txtColor:#1A1A1A;
	.operation-info{
		margin: 20px 0;
		width: 100%; 
		padding: 20px;
		background: #FFFFFF;
		.operation-info-item{
			span.title{
				display: inline-block;
				width: 115px;
				font-size: 14px;
				color: @txtColor;
				text-align: right;
				line-height: 30px;
			}
		}
		
	}
</style>