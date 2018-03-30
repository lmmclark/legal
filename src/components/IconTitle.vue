<template>
	<div class="icon-title flex">
		<div class="icon-baseInfo" :style="{backgroundPositionX:left+'px',backgroundPositionY:top+'px'}"></div>
		<p>{{title}}</p>
	</div>
</template>
<!--
	/*
	 * 带icon 标题组件 传参格式
	 * left:背景图postion-x位置
	 * top:背景图postion-y位置
	 * title：标题
	 */
	例如：<IconTitle title='案件基本信息' left='-80' top='-30'></IconTitle>
-->
<script>
	export default {
		name: 'iconTitle',
		props:{
			left:String,
			top:String,
			title:String
		},
		data(){
			return{
			}
		},
		mounted(){

		},
		methods:{
		
		}
	}
</script>

<style lang="less">
	.icon-title{
		width:auto;
		justify-content: flex-start !important;
		min-width: 200px;
		height: 20px;
		line-height: 20px;
		margin-bottom: 20px;
		.icon-baseInfo{
        	height: 20px;
        	width: 20px;
        	background: url(../assets/icons.png) ;
        	margin-right: 12px;
        }
		p{
			color: #1A1A1A;
            font-weight: 600;
            font-size: 18px;
		}
	}
</style>