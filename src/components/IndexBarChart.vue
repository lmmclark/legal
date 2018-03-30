<template>
	<div class="IndexBarChart">
		<div class="bar-label">{{label}}</div>	
		<div class="bar-container">
			<div class="bar" :style="{background:color,width:percent+'%'}"></div>
			<div class="bar-txt" :style="{left:percent+'%'}">{{percent}}%</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'IndexBarChart',
		props:{
			percent:String,
			color:String,
			label:String
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
	.IndexBarChart{
		height: 30px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		.bar-label{
			height: 20px;
			line-height: 20px;
			padding: 0 5px;
			color: #000000;
			font-weight: bold
		}
		.bar-container{
			width: 300px;
			height: 20px;
			border-radius: 5px;
			background: #CCCCCC;
			position: relative;
			.bar{
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
				height:20px;
				border-bottom-left-radius: 5px;
				border-top-left-radius: 5px;
			}
			.bar-txt{
				position: absolute;
				z-index: 2;
				height:20px;
				line-height: 20px;
				color: #000000;
				font-weight: bold;
			}
		}
	}
	
</style>