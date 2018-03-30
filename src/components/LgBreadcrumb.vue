<template>
	<Affix>
		<div class="lg-breadcrumb">
			<Breadcrumb separator=">">
		        <span class="location-icon"></span>
		        <span>当前位置：</span>
		        <BreadcrumbItem v-for='(item,index) in path' :to='item.path'  :key="index">{{item.name}}</BreadcrumbItem>
		    </Breadcrumb>
		    <slot></slot>
		</div>
	 </Affix>
</template>
<!--
	/*
	 * 面包屑传参格式
	 * name:对应的路由名字
	 * path:对应的路由路径
	 */
	path:[
		{'name':'外聘律师','path':'/main/externalLawyer'},
		{'name':'外聘律师','path':'/main/externalLawyer'},
	],
-->
<script>
	export default {
		name: 'LgBreadcrumb',
		props:{
			path:Array,
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
	.lg-breadcrumb{
		min-width: 300px;
		padding:  20px 0;
		display: flex;
		justify-content: space-between;
		background: #f3f4f5;
		.ivu-breadcrumb{
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			align-items: center;
			color: #1a1a1a;
			.ivu-breadcrumb-item-link{
				color: #1a1a1a;
			}
			.ivu-breadcrumb-item-separator{
				color: #1a1a1a;
			}
		}
		.location-icon{
			display: inline-block;
			height: 20px;
			width: 20px;
			background: url(../assets/icons.png) 0 0;
		}
	}
	
</style>