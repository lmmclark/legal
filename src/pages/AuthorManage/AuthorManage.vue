<template>
	<div  class="mycontainer">
		<router-view></router-view>
	</div>
</template>

<script>
	import router from '../../router'
	export default {
		name: 'authormanage',
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

	.mycontainer{
		height:100%;
		min-height: 500px;
		width: 100%;
		.ivu-input-group-append{
		    background: #ff9000 !important;
		    border: none;
		}
	}
	.ivu-table table{
    	font-size:12px !important;
    	color:#1A1A1A;
    	font-family: "微软雅黑";
    }
    
</style>